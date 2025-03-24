import { Request, Response } from 'express';
import { LoginSchema } from '../../validation/user';

import { loginService } from '../../services/authService/loginService';
import { handleError } from '../../utils/handleError';

export async function login(req: Request, res: Response) {
  try {
    const requestData = LoginSchema.parse(req.body);
    const response = await loginService(requestData);

    return res.status(200).json(response);
  } catch (error) {
    handleError(error, res);
  }
}
