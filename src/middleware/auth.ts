import { verifyToken } from '../utils/token';
import { Request, Response, NextFunction } from 'express';

// 增加userId屬性
declare module 'express-serve-static-core' {
    interface Request {
        userId?: string;
    }
}

export const verifyUserToken = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.redirect('/api/login');
    }
    try {
        const decodedToken = await verifyToken(token, process.env.JWT_SECRET as string);

        req.userId = decodedToken.userId;
        next();
    } catch (err) {
        return res.redirect('/api/login');
    }
};