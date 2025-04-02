import { Request, Response } from 'express';
import { handleError } from '../../utils/handleError';
import { SubscriptionsSchema } from '../../validation/subscriptionSchema';
import { subscriptionService } from '../../services/subscriptions/subscribe-to-service';

export async function subscribeToServiceController(
  req: Request,
  res: Response
) {
  const requestData = SubscriptionsSchema.parse(req.body);
  try {
    const result = await subscriptionService(requestData);
    return res.status(200).json(result);
  } catch (error) {
    handleError(error, res);
  }
}
