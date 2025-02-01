import { Request, Response, NextFunction } from 'express';
import { AppError } from './errorHandler';
import { checkSubscriptionStatus } from '../utils/checkSubscriptionStatus';

export async function checkSubscriptionExpiration(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const planCode = req.headers['subscription-id'] as string; // Correct header access

    if (!planCode) {
      throw new AppError('Subscription ID is missing', 400);
    }

    const isValid = await checkSubscriptionStatus(planCode);
    if (!isValid) {
      throw new AppError('Subscription has expired or is inactive', 403);
    }

    next();
  } catch (error) {
    next(error); // Forward error to Express's error handler
  }
}
