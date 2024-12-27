import { User } from '../../models';
import { generateStrongPassword } from '../../utils/strongPasswordGenerator';
import { type UserType } from '../../validation/user';
import bcrypt from 'bcryptjs';
import validator from 'validator';

export async function registerUserService(input: UserType) {
  const strongPassword = generateStrongPassword();

  const userPassword = input?.password ?? strongPassword;
  // Encrypt password
  const salt = await bcrypt.genSalt();
  const passwordHash = await bcrypt.hash(userPassword, salt);
  const userData = { ...input, password: passwordHash };

  // Validate email
  if (!validator.isEmail(userData.email)) {
    throw new Error('Email must be a valid email');
  }

  // Check if user already exists
  const userExist = await User.findOne({
    where: { email: userData.email },
  });

  if (userExist) {
    throw new Error('User already exists');
  }

  // Validate password strength
  if (!validator.isStrongPassword(userData.password)) {
    throw new Error('Please enter a strong password to continue');
  }

  // Create new user
  const newUser = await User.create(userData);
  const { password, ...userDetails } = newUser.dataValues;

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
