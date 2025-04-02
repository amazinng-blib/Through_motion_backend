import { Request, Response } from 'express';
import { PlanSchema } from '../../validation/planSchema';
import { requestQuoteService } from '../../services/plan/request-quote';
import { handleError } from '../../utils/handleError';

export async function requestQuoteController(req: Request, res: Response) {
  const requestData = PlanSchema.parse(req.body);

  try {
    const result = await requestQuoteService(requestData);
    return res.status(201).json(result);
  } catch (error) {
    handleError(error, res);
  }
}
