import { Request, Response } from 'express';
import { handleError } from '../../utils/handleError';
import { SubscribeToNewsletterSchema } from '../../validation/subscribeToNewsletter';
import { subscribeToNewsletterService } from '../../services/email/subscribeToNewsletter';

export async function subscribeToNewsletterController(
  req: Request,
  res: Response
) {
  try {
    const requestData = SubscribeToNewsletterSchema.parse(req.body);
    const response = await subscribeToNewsletterService(requestData);
    return res.status(201).json(response);
  } catch (error) {
    handleError(error, res);
  }
}
