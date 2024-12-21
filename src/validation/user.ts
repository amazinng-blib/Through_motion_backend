import { z } from 'zod';

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
  password: z.string(),
  displayName: z.string(),
});

export type UserType = z.infer<typeof UserSchema>;