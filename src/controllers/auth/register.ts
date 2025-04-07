import { Request, Response } from 'express';
import { UserSchema } from '../../validation/user';
import { registerUserService } from '../../services/authService/registerService';
import { handleError } from '../../utils/handleError';
import { paymentChecker } from '../../utils/paymentChecker';

export async function registerUser(req: Request, res: Response) {
  try {
    const requestData = UserSchema.parse(req.body);
    await paymentChecker(
      requestData.subscription_id,
      requestData.first_name,
      requestData.last_name,
      requestData.email
    );
    const response = await registerUserService(requestData);
    return res.status(201).json(response);
  } catch (error) {
    handleError(error, res);
  }
}
