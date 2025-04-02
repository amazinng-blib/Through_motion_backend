import { Request, Response } from 'express';
import { handleError } from '../../utils/handleError';
import { getAllQuotesService } from '../../services/plan/get-all-quotes';

export async function getAllQuotesController(req: Request, res: Response) {
  try {
    const result = await getAllQuotesService();
    return res.status(200).json(result);
  } catch (error) {
    handleError(error, res);
  }
}
