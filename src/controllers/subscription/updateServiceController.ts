import { Request, Response } from 'express';
import { UpdateServiceSchema } from '../../validation/subscription';
import { updateService } from '../../services/subscription/updateService';

export async function updateServiceController(
  req: Request,
  res: Response
): Promise<{}> {
  const { userId, ...rest } = req.body;
  const requestData = UpdateServiceSchema.parse({
    ...rest,
    id: req.params.id,
  });
  const service = await updateService(requestData);
  return res.status(200).json(service);
}
