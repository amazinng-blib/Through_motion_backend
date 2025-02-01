import { Request, Response } from 'express';
import { ServiceSchema } from '../../validation/subscription';
import { subscribeToService } from '../../services/subscription/subscribeToService';
import { ServiceStatus } from '../../enum/subscription.enums';
import { generateUniqueId } from '../../utils/planCodeGenerator';

export async function subscribeToServiceController(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const validatedData = ServiceSchema.parse({
      ...req.body,
      planCode: generateUniqueId(),
      serviceStatus: ServiceStatus.ACTIVE,
    });
    const service = await subscribeToService(validatedData);
    res.status(201).json(service);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create service' });
  }
}
