import { AppError } from '../../middleware/errorHandler';
import User from '../../models/user';
import { type UpdateProfileType } from '../../validation/user';
import bcrypt from 'bcryptjs';

export async function UpdateProfileService(input: Partial<UpdateProfileType>) {
  const user = await User.findOne({ where: { id: input.id } });

  if (!user) {
    throw new AppError('User not found', 404);
  }

  // Update user details
  if (input.firstName) {
    user.firstName = input.firstName;
  }
  if (input.lastName) {
    user.lastName = input.lastName;
  }

  if (input.email) {
    user.email = input.email;
  }

  if (input.displayName) {
    user.displayName = input.displayName;
  }

  /*
   * If the user wants to update the password, verify the old one first
   */
  if (input.oldPassword && input.newPassword) {
    const passwordMatch = await bcrypt.compare(
      input.oldPassword,
      user.password
    );

    if (!passwordMatch) {
      throw new AppError('Wrong Credentials', 400);
    }

    // Encrypt the new password and save it
    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(input.newPassword, salt);
  }

  await user.save();

  const { password, ...safeUser } = user.dataValues;
  return { message: 'Profile updated successfully', user: safeUser };
}
