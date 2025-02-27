import { z } from 'zod';
import { Role } from '../enum/user.enums';

export const userRoleEnums = z.nativeEnum(Role);

export const UserSchema = z.object({
  firstName: z
    .string()
    .min(3, 'First name should be at least 3 characters')
    .max(60, 'First name should not exceed 60 characters'),
  lastName: z
    .string()
    .min(3, 'Last name should be at least 3 characters')
    .max(60, 'Last name should not exceed 60 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().optional(),
  displayName: z.string(),
  role: userRoleEnums.default(Role.USER),
});

export type UserType = z.infer<typeof UserSchema>;

export const LoginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string(),
});

export type LoginType = z.infer<typeof LoginSchema>;

export const ChangePasswordSchema = z.object({
  oldPassword: z.string(),
  newPassword: z.string(),
  id: z.number(),
});

export type ChangePasswordType = z.infer<typeof ChangePasswordSchema>;
