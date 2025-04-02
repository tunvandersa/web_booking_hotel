import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

interface DecodedToken {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    try {
        const token = req.cookies.accessToken;

        if (!token) {
            res.status(401).json({ message: 'Truy cập không hợp lệ' });
            return;
        }

        const decoded = jwt.verify(token, JWT_SECRET) as DecodedToken;

        if (decoded.role !== 'admin') {
            res.status(401).json({ message: 'Bạn không có quyền truy cập' });
            return;
        }

        next();
    } catch (error) {
        res.status(401).json({ message: 'Bạn không có quyền truy cập' });
    }
};