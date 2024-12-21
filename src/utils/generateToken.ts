import jwt, { Secret } from 'jsonwebtoken';
import { UserModelType } from '../models/user';

export const generateAccessToken = async (user: UserModelType) => {
  const payload = { id: user.id };
  try {
    const accessToken = jwt.sign(
      payload,
      process.env.ACCESS_TOKEN_PRIVATE_KEY as Secret,
      { expiresIn: '1d' }
    );

    return accessToken;
  } catch (error: any) {
    console.log('Error from Generate token', error);
    return Promise.reject(error);
  }
};

export const generateRefreshToken = async (user: UserModelType) => {
  const payload = { id: user.id };
  try {
    const refreshToken = jwt.sign(
      payload,
      process.env.REFRESH_TOKEN_PRIVATE_KEY as Secret,
      { expiresIn: '30d' }
    );

    return refreshToken;
  } catch (error: any) {
    console.log('Error from Generate token', error);
    return Promise.reject(error);
  }
};
