import { Request, Response } from 'express';
import { ZodError } from 'zod';
import { LoginSchema } from '../../validation/user';

import { loginService } from '../../services/authService/loginService';

export async function login(req: Request, res: Response) {
  try {
    const requestData = LoginSchema.parse(req.body);
    const response = await loginService(requestData);

    return res.status(200).json(response);
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({ error: error.errors });
    } else {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}
