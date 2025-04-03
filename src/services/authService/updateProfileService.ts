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
  if (input.first_name) {
    user.first_name = input.first_name;
  }
  if (input.last_name) {
    user.last_name = input.last_name;
  }

  if (input.email) {
    user.email = input.email;
  }

  if (input.display_name) {
    user.display_name = input.display_name;
  }

  /*
   * If the user wants to update the password, verify the old one first
   */
  if (input.old_password && input.new_password) {
    const passwordMatch = await bcrypt.compare(
      input.old_password,
      user.password
    );

    if (!passwordMatch) {
      throw new AppError('Wrong Credentials', 400);
    }

    // Encrypt the new password and save it
    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(input.new_password, salt);
  }

  await user.save();

  const { password, ...safeUser } = user.dataValues;
  return { message: 'Profile updated successfully', user: safeUser };
}
