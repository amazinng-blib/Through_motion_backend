import { Request, Response } from 'express';
import { handleError } from '../../utils/handleError';
import { getSingleQuoteService } from '../../services/plan/get-single-quote';

export async function getSingleQuoteController(req: Request, res: Response) {
  const { quoteId } = req.params;

  try {
    const result = await getSingleQuoteService(Number(quoteId));
    return res.status(200).json(result);
  } catch (error) {
    handleError(error, res);
  }
}
