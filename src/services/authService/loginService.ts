import User from '../../models/user';
import {
  generateAccessToken,
  generateRefreshToken,
} from '../../utils/generateToken';
import { type LoginType } from '../../validation/user';
import bcrypt from 'bcryptjs';

export async function loginService(input: LoginType) {
  const user = await User.findOne({ where: { email: input?.email } });
  if (!user) {
    throw new Error('User Not found');
  }
  const passwordMatch = await bcrypt.compare(input.password, user?.password);

  if (!passwordMatch) {
    throw new Error('Wrong Credentials');
  }

  const accessToken = await generateAccessToken(user);
  const refreshToken = await generateRefreshToken(user);

  const { password, ...userDetails } = user.dataValues;

  return {
    message: 'Logged in successfully',
    userDetails,
    token: { accessToken, refreshToken },
  };
}
