import { Request, Response } from 'express';
import { handleError } from '../../utils/handleError';
import { getUserSubscribedServices } from '../../services/subscription/getUserSubscribedServices';

export async function getUserSubscribedSrvicesController(
  req: Request,
  res: Response
): Promise<any> {
  try {
    const { subscriberEmail } = req.body;
    const userServices = await getUserSubscribedServices(subscriberEmail);
    return res.status(200).json(userServices);
  } catch (error) {
    handleError(error, res);
  }
}
