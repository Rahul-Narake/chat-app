import { Request, Response } from 'express';
import prisma from '../db/prisma.js';
import bceryptjs from 'bcryptjs';
import generateToken from '../utils/generateToken.js';

export const signup = async (req: Request, res: Response) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;
    if (!fullName || !username || !password || !confirmPassword || !gender) {
      return res
        .status(400)
        .json({ success: false, message: 'All feilds required' });
    }
    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ success: false, message: 'Password dose not match' });
    }
    const existingUser = await prisma.user.findUnique({
      where: {
        username,
      },
    });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'username already exists, please try with another username',
      });
    }
    const salt = await bceryptjs.genSalt(10);
    const hashedPassword = await bceryptjs.hash(password, salt);
    const maleProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const femaleProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;
    const newUser = await prisma.user.create({
      data: {
        username,
        fullName,
        gender,
        profile: gender === 'male' ? maleProfilePic : femaleProfilePic,
        password: hashedPassword,
      },
    });
    if (newUser) {
      generateToken(newUser?.id, res);
      res.status(201).json({
        message: 'user created successfully',
        success: true,
        user: {
          id: newUser?.id,
          fullName: newUser?.fullName,
          profile: newUser?.profile,
          username: newUser?.username,
        },
      });
    } else {
      res.status(400).json({ message: 'Invalid user data', success: false });
    }
  } catch (error: any) {
    console.log('Error in signup', error?.message);
    return res.status(500).json({ success: false, message: error?.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const user = await prisma.user.findUnique({ where: { username } });
    if (!user) {
      return res
        .status(400)
        .json({ message: 'Invalid credentials', success: false });
    }
    const isPasswordCorrect = await bceryptjs.compare(password, user?.password);
    if (!isPasswordCorrect) {
      return res
        .status(400)
        .json({ message: 'Invalid credentials', success: false });
    }
    generateToken(user?.id, res);
    return res.status(200).json({
      message: 'Logged in successfully',
      success: true,
      user: {
        id: user?.id,
        fullName: user?.fullName,
        username: user?.username,
        profile: user?.profile,
      },
    });
  } catch (error: any) {
    console.log('Error in login', error?.message);
    return res.status(500).json({ success: false, message: error?.message });
  }
};
export const logout = async (req: Request, res: Response) => {
  try {
    res.cookie('jwt', '', { maxAge: 0 });
    return res
      .status(200)
      .json({ message: 'Logged out successfully', success: true });
  } catch (error: any) {
    console.log('Error in logout', error?.message);
    return res.status(500).json({ success: false, message: error?.message });
  }
};
export const getCurrentUser = async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req?.user?.id },
      select: { id: true, username: true, fullName: true, profile: true },
    });
    if (!user) {
      return res
        .status(400)
        .json({ message: 'user not found', success: false });
    }

    return res
      .status(200)
      .json({ message: 'user found successfully', success: true, user });
  } catch (error: any) {
    console.log('Error in get current user', error?.message);
    return res.status(500).json({ success: false, message: error?.message });
  }
};
