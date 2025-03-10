import { Request, Response } from 'express';
import { getInTouchService } from '../../services/email/get-in-touch';
import { handleError } from '../../utils/handleError';
import { GetInTouchSchema } from '../../validation/get-in-touch';

export async function getInTouchController(req: Request, res: Response) {
  try {
    const requestData = GetInTouchSchema.parse(req.body);
    const response = await getInTouchService(requestData);
    return res.status(201).json(response);
  } catch (error) {
    handleError(error, res);
  }
}
