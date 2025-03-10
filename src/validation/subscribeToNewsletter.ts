import { z } from 'zod';

export const SubscribeToNewsletterSchema = z.object({
  email: z.string().email('Invalid email address'),
});

export type SubscribeToNewsletterType = z.infer<
  typeof SubscribeToNewsletterSchema
>;
