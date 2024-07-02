import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import prisma from '../db/prisma.js';

interface DecodeToken extends JwtPayload {
  userId: string;
}

declare global {
  namespace Express {
    export interface Request {
      user: {
        id: string;
      };
    }
  }
}

export default async function protectRoute(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({ message: 'Unauthorised', success: false });
    }
    const decoded = (await jwt.verify(
      token,
      process.env.JWT_SECRET!
    )) as DecodeToken;
    if (!decoded) {
      return res.status(401).json({ message: 'Unauthorised', success: false });
    }

    const user = await prisma.user.findUnique({
      where: { id: decoded?.userId },
      select: { id: true, username: true, profile: true, fullName: true },
    });

    if (!user) {
      return res.status(401).json({ message: 'Unauthorised', success: false });
    }

    req.user = user;

    next();
  } catch (error: any) {
    console.log('errorn in middleware,', error.message);
  }
}
