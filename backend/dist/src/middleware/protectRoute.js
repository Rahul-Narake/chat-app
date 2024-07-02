import jwt from 'jsonwebtoken';
import prisma from '../db/prisma.js';
export default async function protectRoute(req, res, next) {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(401).json({ message: 'Unauthorised', success: false });
        }
        const decoded = (await jwt.verify(token, process.env.JWT_SECRET));
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
    }
    catch (error) {
        console.log('errorn in middleware,', error.message);
    }
}
