import { Request, Response } from 'express';
import { ZodError } from 'zod';
import {
  ChangePasswordSchema,
  type ChangePasswordType,
} from '../../validation/user';
import User from '../../models/user';
import bcrypt from 'bcryptjs';

export async function changePassword(req: Request, res: Response) {
  try {
    const { userID } = req.body;
    const requestData: ChangePasswordType = ChangePasswordSchema.parse(
      req?.body
    );

    const user = await User.findOne({ where: { id: userID } });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    /*
     * Compare the password
     */

    const passwordMatch = await bcrypt.compare(
      requestData.oldPassword,
      user?.password
    );

    if (!passwordMatch) {
      return res.status(400).json({ message: 'Wrong Credentials' });
    }

    /**
     * Encrypt password new password and save
     */

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(requestData.newPassword, salt);

    user.password = passwordHash;
    await user.save();

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
