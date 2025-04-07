import { Request, Response } from 'express';
import { UserSchema } from '../../validation/user';
import { registerUserService } from '../../services/authService/registerService';
import { handleError } from '../../utils/handleError';

export async function registerUser(req: Request, res: Response) {
  try {
    const requestData = UserSchema.parse(req.body);

    const response = await registerUserService(requestData);
    return res.status(201).json(response);
  } catch (error) {
    handleError(error, res);
  }
}
