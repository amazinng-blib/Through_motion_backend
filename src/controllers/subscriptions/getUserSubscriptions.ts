import { Request, Response } from 'express';
import { handleError } from '../../utils/handleError';
import { getUserSubscriptionsService } from '../../services/subscriptions/get-user-subscriptions';

export async function getUserSubscriptionsController(
  req: Request,
  res: Response
) {
  try {
    const result = await getUserSubscriptionsService(req.body.userId);
    return res.status(200).json(result);
  } catch (error) {
    handleError(error, res);
  }
}
