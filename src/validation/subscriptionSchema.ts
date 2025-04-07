import { z } from 'zod';
import { SubscriptionStatus } from '../models/subscriptions';

// Define Options schema
const OptionsSchema = z.object({
  title: z.string(),
  price: z.number(),
  is_expired: z.boolean().optional().default(false),
  started_on: z.date(),
  ends_at: z.date(),
});

const UserFieldTypeSchema = z.object({
  first_name: z.string().min(1),
  last_name: z.string().min(1),
  email: z.string().email(),
});

// Define Subscribed Services schema
export const SubscribedServicesSchema = z.array(
  z.object({
    service_title: z.string(),
    options: z.array(OptionsSchema),
  })
);

// Define Subscriptions schema
export const SubscriptionsSchema = z.object({
  id: z.number().optional(),
  user_key: z.number().optional(),
  user: UserFieldTypeSchema,
  plan_id: z.number(),
  reference_number: z.string(),
  status: z.enum(Object.values(SubscriptionStatus) as [string, ...string[]]),
  subscribed_services: SubscribedServicesSchema,
  duration: z.string().optional().default('30 days'),
  is_paid: z.boolean().optional(),
  is_verified: z.boolean().optional(),
});

// TypeScript types inferred from Zod schema
export type OptionsType = z.infer<typeof OptionsSchema>;
export type SubscribedServicesType = z.infer<typeof SubscribedServicesSchema>;
export type SubscriptionsType = z.infer<typeof SubscriptionsSchema>;
export type UserType = z.infer<typeof UserFieldTypeSchema>;
