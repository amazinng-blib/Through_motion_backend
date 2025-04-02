import { Request, Response } from 'express';
import { handleError } from '../../utils/handleError';
import { getAllSubscriptionsService } from '../../services/subscriptions/get-all-subscriptions';

export async function getAllSubscriptionsController(
  req: Request,
  res: Response
) {
  try {
    const result = await getAllSubscriptionsService(req.query);
    return res.status(200).json(result);
  } catch (error) {
    handleError(error, res);
  }
}
