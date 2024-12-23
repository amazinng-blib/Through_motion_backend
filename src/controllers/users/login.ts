import { Request, Response } from 'express';
import { ZodError } from 'zod';
import { LoginSchema, type LoginType } from '../../validation/user';
import User from '../../models/user';
import bcrypt from 'bcryptjs';
import {
  generateAccessToken,
  generateRefreshToken,
} from '../../utils/generateToken';

export async function login(req: Request, res: Response) {
  try {
    const requestData: LoginType = LoginSchema.parse(req.body);

    const user = await User.findOne({ where: { email: requestData?.email } });
    if (!user) {
      return res.status(404).json({ message: 'User Not found' });
    }
    const passwordMatch = await bcrypt.compare(
      requestData.password,
      user?.password
    );

    if (!passwordMatch) {
      return res.status(400).json({ message: 'Wrong Credentials' });
    }

    const accessToken = await generateAccessToken(user);
    const refreshToken = await generateRefreshToken(user);

    const { password, ...userDetails } = user.dataValues;
    return res
      .status(200)
      .json({ userDetails, token: { accessToken, refreshToken } });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({ error: error.errors });
    } else {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}
