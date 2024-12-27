import { Request, Response } from 'express';
import { ZodError } from 'zod';
import {
  ChangePasswordSchema,
  type ChangePasswordType,
} from '../../validation/user';

import { ChangePasswordService } from '../../services/authService/changePasswordService';

export async function changePassword(req: Request, res: Response) {
  try {
    const { userID } = req.body;
    const requestData: ChangePasswordType = ChangePasswordSchema.parse(
      req?.body
    );

    const user = await ChangePasswordService({ ...requestData, id: userID });

    return res.status(200).json({ message: 'Password updated', user });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({ error: error.errors });
    } else {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}
