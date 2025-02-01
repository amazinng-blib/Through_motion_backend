import { Request, Response } from 'express';
import { getServiceById } from '../../services/subscription/getServiceById';
import { AppError } from '../../middleware/errorHandler';

export async function getSubscriptionByIdController(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const id = Number(req.params.id);
    const service = await getServiceById(id);
    if(!service){
      throw new AppError('Service not found', 404)
    }
   
    res.status(200).json(service)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch service price' });
  }
}
