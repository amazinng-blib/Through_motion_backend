import { Request, Response } from 'express';
import { PricingSchema } from '../../validation/pricingSchema';
import { handleError } from '../../utils/handleError';
import { replyQuoteService } from '../../services/plan/reply-quote';

export async function replyQuoteController(req: Request, res: Response) {
  const requestData = PricingSchema.parse(req.body);
  try {
    const result = await replyQuoteService(requestData);
    return res.status(201).json(result);
  } catch (error) {
    handleError(error, res);
  }
}
