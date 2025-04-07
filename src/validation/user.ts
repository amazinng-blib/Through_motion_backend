import { z } from 'zod';
import { Role } from '../enum/user.enums';

export const userRoleEnums = z.nativeEnum(Role);

export const UserSchema = z.object({
  first_name: z
    .string()
    .min(3, 'First name should be at least 3 characters')
    .max(60, 'First name should not exceed 60 characters'),
  last_name: z
    .string()
    .min(3, 'Last name should be at least 3 characters')
    .max(60, 'Last name should not exceed 60 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().optional(),
  display_name: z.string(),
  role: userRoleEnums.default(Role.USER),
  subscription_key: z.number().positive(),
});

export type UserType = z.infer<typeof UserSchema>;

export const LoginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string(),
});

export type LoginType = z.infer<typeof LoginSchema>;

export const UpdateProfileSchema = UserSchema.partial().extend({
  old_password: z.string().optional(),
  new_password: z.string().optional(),
  id: z.number(),
});

export type UpdateProfileType = z.infer<typeof UpdateProfileSchema>;
