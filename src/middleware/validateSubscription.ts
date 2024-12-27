import { Request, Response, NextFunction } from 'express';
import * as subscriptionService from '../services/subscription/subscription.services';

export async function validateSubscription(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const planCode = req.headers['x-subscription-planCode'] as string;
  const { userID } = req.body;

  if (!planCode) {
    return res.status(401).json({ error: 'Subscription ID is required' });
  }

  try {
    const isValid = await subscriptionService.checkSubscriptionStatus(
      planCode,
      userID
    );

    if (!isValid) {
      return res.status(403).json({
        error: 'Subscription has expired or is inactive',
        code: 'SUBSCRIPTION_INVALID',
      });
    }

    next();
  } catch (error) {
    res.status(500).json({ error: 'Failed to validate subscription' });
  }
}
