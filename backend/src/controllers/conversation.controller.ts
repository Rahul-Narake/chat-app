import { Request, Response } from 'express';
import prisma from '../db/prisma.js';

export const sendMessage = async (req: Request, res: Response) => {
  try {
    const { id: receiverId } = req.params;
    const { message } = req.body;
    const senderId = req?.user.id;
    let conversation = await prisma.conversation.findFirst({
      where: {
        participantsId: {
          hasEvery: [senderId, receiverId],
        },
      },
    });

    if (!conversation) {
      conversation = await prisma.conversation.create({
        data: {
          participantsId: {
            set: [senderId, receiverId],
          },
        },
      });
    }
    const newMessage = await prisma.message.create({
      data: {
        senderId,
        body: message,
        conversationId: conversation?.id,
      },
    });
    if (newMessage) {
      await prisma.conversation.update({
        where: {
          id: conversation?.id,
        },
        data: {
          messages: {
            connect: {
              id: newMessage?.id,
            },
          },
        },
      });
    }

    res.status(201).json({
      newMessage,
      success: true,
      message: 'message send successfully',
    });
  } catch (error: any) {
    console.log(`error in send Message ${error?.message}`);
    return res.status(500).json({ message: error?.message, success: false });
  }
};
export const getMessages = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const senderId = req.user?.id;
    const conversation = await prisma.conversation.findFirst({
      where: {
        participantsId: {
          hasEvery: [senderId, id],
        },
      },
      include: {
        messages: {
          orderBy: { createdAt: 'asc' },
        },
      },
    });
    if (!conversation) {
      return res.status(200).json({
        messages: [],
        success: true,
        message: 'messages fetched successfully',
      });
    }
    return res.status(200).json({
      messages: conversation.messages,
      success: true,
      message: 'Messages fetched successfully',
    });
  } catch (error: any) {
    console.log(`error in get Messages ${error?.message}`);
    return res.status(500).json({ message: error?.message, success: false });
  }
};

export const getAllconversations = async (req: Request, res: Response) => {
  try {
    const senderId = req.user.id;
    const conversations = await prisma.user.findMany({
      where: {
        id: {
          not: senderId,
        },
      },
      select: {
        profile: true,
        id: true,
        fullName: true,
        username: true,
      },
    });
    return res.status(200).json({
      message: 'Convesations fetched successfully',
      success: true,
      conversations,
    });
  } catch (error: any) {
    console.log(`error in get conversations ${error?.message}`);
    return res.status(500).json({ message: error?.message, success: false });
  }
};
