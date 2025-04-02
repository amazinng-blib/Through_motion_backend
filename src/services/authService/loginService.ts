import { AppError } from '../../middleware/errorHandler';
import Plans from '../../models/planModel';
import Subscriptions from '../../models/subscriptions';
import User from '../../models/user';
import {
  generateAccessToken,
  generateRefreshToken,
} from '../../utils/generateToken';
import { type LoginType } from '../../validation/user';
import bcrypt from 'bcryptjs';

export async function loginService(input: LoginType) {
  const user = await User.findOne({
    where: { email: input?.email },
    include: [
      {
        model: Subscriptions,
        as: 'subscriptions',
        include: [
          {
            model: Plans,
            as: 'plan',
          },
        ],
      },
    ],
  });
  if (!user) {
    throw new AppError('User Not found', 404);
  }
  const passwordMatch = await bcrypt.compare(input.password, user?.password);

  if (!passwordMatch) {
    throw new AppError('Wrong Credentials', 400);
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
