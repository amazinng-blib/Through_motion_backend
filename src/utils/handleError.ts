import { ZodError } from 'zod';
import { Response } from 'express';
import { AppError } from '../middleware/errorHandler';

export function handleError(error: any, res: Response) {
  // Check if the error is an instance of AppError
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({ error: error.message });
  }

  // Check if it's a Zod validation error
  if (error instanceof ZodError) {
    return res
      .status(400)
      .json({ error: 'Please make sure you provide the correct input' });
  }

  // For other unhandled errors, send a 500 Internal Server Error
  // log the error to developers for debugging
  console.error(error);
  return res.status(500).json({ error: 'Internal server error' });
}
