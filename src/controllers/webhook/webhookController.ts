import { Request, Response } from 'express';
import { handleError } from '../../utils/handleError';
import { verifyPaystackWebhook } from '../../utils/paystack';
import { processPaystackWebhook } from '../../services/webhook/webhook';

export async function handlePaystackWebhook(req: Request, res: Response) {
  try {
    // Verify webhook authenticity
    if (!verifyPaystackWebhook(req)) {
      return res.status(401).json({ message: 'Unauthorized webhook request' });
    }

    const response = await processPaystackWebhook(req.body);
    return res.status(200).json(response);
  } catch (error) {
    handleError(error, res);
  }
}
