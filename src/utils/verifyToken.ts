import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload, Secret } from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    let token = req.header('Authorization');

    if (!token) {
      res.status(403).send('Access Denied');
      return;
    }

    if (token.startsWith('Bearer ')) {
      token = token.slice(7, token.length);
    }

    const verified = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_PRIVATE_KEY as Secret
    ) as JwtPayload;

    req.body.userId = verified.id;

    next();
  } catch (error: any) {
    console.error('Token verification error:', error.message);
    res.status(500).json({ error: error?.message });
  }
};
