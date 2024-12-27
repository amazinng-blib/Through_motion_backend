import { Request, Response } from 'express';
import { UserSchema } from '../../validation/user';
import { ZodError } from 'zod';
import { registerUserService } from '../../services/authService/registerService';

export async function registerUser(req: Request, res: Response) {
  try {
    const requestData = UserSchema.parse(req.body);
    const response = await registerUserService(requestData);
    return res.status(201).json(response);
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({ error: error.errors });
    } else {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}
