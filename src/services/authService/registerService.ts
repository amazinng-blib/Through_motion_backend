import { AppError } from '../../middleware/errorHandler';
import { Subscriptions } from '../../models';
import User from '../../models/user';
import { paymentChecker } from '../../utils/paymentChecker';
import { generateStrongPassword } from '../../utils/strongPasswordGenerator';
import { type UserType } from '../../validation/user';
import bcrypt from 'bcryptjs';
import validator from 'validator';

export async function registerUserService(input: UserType) {
  try {
    await paymentChecker(
      input.subscription_id,
      input.first_name,
      input.last_name,
      input.email
    );
  } catch (error) {
    throw error;
  }

  const strongPassword = generateStrongPassword();

  const userPassword = input?.password ?? strongPassword;
  // Encrypt password
  const salt = await bcrypt.genSalt();
  const passwordHash = await bcrypt.hash(userPassword, salt);
  const userData = { ...input, password: passwordHash };

  // Validate email
  if (!validator.isEmail(userData.email)) {
    throw new AppError('Email must be a valid email', 400);
  }

  // Check if user already exists
  const userExist = await User.findOne({
    where: { email: userData.email },
  });

  if (userExist) {
    throw new AppError('User already exists', 400);
  }

  // Validate password strength
  if (!validator.isStrongPassword(userData.password)) {
    throw new AppError('Please enter a strong password to continue', 400);
  }

  // Create new user
  const newUser = await User.create(userData);
  const { password, ...userDetails } = newUser.dataValues;
  await Subscriptions.update(
    { user_key: userDetails.id },
    {
      where: {
        user: {
          email: userData.email,
          first_name: userData.first_name,
          last_name: userData.last_name,
        },
      },
    }
  );

  const response = {
    message: 'User registered successfully',
    user: userDetails,
    generatedPassword: '',
  };

  // If the password was auto-generated, send it in the response
  if (userPassword === strongPassword) {
    response['generatedPassword'] = userPassword;
  }

  return response;
}
