import { Request, Response } from 'express';
import { getAllServices } from '../../services/subscription/getAllServices';

export async function getAllSubscriptionController(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const services = await getAllServices();
    res.json(services);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch pricing information' });
  }
}
