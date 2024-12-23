import { Request, Response } from 'express';
import { UserSchema, type UserType } from '../../validation/user';
import User from '../../models/user';
import { ZodError } from 'zod';
import validator from 'validator';
import { generateStrongPassword } from '../../utils/strongPasswordGenerator';
import bcrypt from 'bcryptjs';

export async function registerUser(req: Request, res: Response) {
  try {
    const requestData: UserType = UserSchema.parse(req.body);
    const strongPassword = generateStrongPassword();

    const userPassword = requestData?.password || strongPassword;
    // Encrypt password
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(userPassword, salt);
    const userData = { ...requestData, password: passwordHash };

    // Validate email
    if (!validator.isEmail(userData.email)) {
      return res.status(400).json({ message: 'Email must be a valid email' });
    }

    // Check if user already exists
    const userExist = await User.findOne({
      where: { email: userData.email },
    });

    if (userExist) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Validate password strength
    if (!validator.isStrongPassword(userData.password)) {
      return res
        .status(400)
        .json({ message: 'Please enter a strong password to continue' });
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

    // Send the response back to the client
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
