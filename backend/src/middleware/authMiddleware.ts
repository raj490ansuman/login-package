import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface AuthenticatedRequest extends Request {
  user?: any;  // Extend the Request type
}

export const authMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    req.user = decoded;  // Now req.user exists
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};
