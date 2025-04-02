import { Request, Response } from 'express';
import { handleError } from '../../utils/handleError';
import { SubscribedServicesSchema } from '../../validation/subscriptionSchema';
import { checkDueSubscriptionsAndUpdate } from '../../services/subscriptions/subscription-checker';

export async function checkSubscriptionController(req: Request, res: Response) {
  SubscribedServicesSchema.parse(req.body);
  const { userId, subscribed_services } = req.body;
  try {
    const result = await checkDueSubscriptionsAndUpdate(
      userId,
      subscribed_services
    );
    return res.status(200).json(result);
  } catch (error) {
    handleError(error, res);
  }
}
