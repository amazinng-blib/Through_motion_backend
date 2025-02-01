import { NextFunction, Request, Response } from 'express';
import { AppError } from './errorHandler';

export const notFoundHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  next(new AppError('Resource not found', 404));
};
