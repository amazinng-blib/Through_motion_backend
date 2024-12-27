import { User } from '../../models';
import { type ChangePasswordType } from '../../validation/user';
import bcrypt from 'bcryptjs';

export async function ChangePasswordService(input: ChangePasswordType) {
  const user = await User.findOne({ where: { id: input.id } });

  if (!user) {
    throw new Error('User not found');
  }

  /*
   * Compare the password
   */

  const passwordMatch = await bcrypt.compare(input.oldPassword, user?.password);

  if (!passwordMatch) {
    throw new Error('Wrong Credentials');
  }

  /**
   * Encrypt password new password and save
   */

  const salt = await bcrypt.genSalt();
  const passwordHash = await bcrypt.hash(input.newPassword, salt);

  user.password = passwordHash;
  await user.save();

  return user;
}
