// customUploadMiddleware.ts
import { upload } from '../index';
import { Request, Response, NextFunction } from 'express';

export const conditionalUpload = (req: Request, res: Response, next: NextFunction) => {
    const contentType = req.headers['content-type'] || '';
    if (contentType.includes('multipart/form-data')) {
        upload.single('image')(req, res, next);
    } else {
        next();
    }
};
