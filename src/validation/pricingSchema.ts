import { z } from 'zod';

// Define the Options schema
const OptionsSchema = z.object({
  title: z.string(),
  price: z.number(),
});

// Define the Pricing schema
export const PricingSchema = z.object({
  id: z.number().optional(),
  user_id: z.number(),
  plan_id: z.number(),
  duration: z.string().optional().default('30 days'),
  title: z.string(),
  options: z.array(OptionsSchema),
  //   is_paid: z.boolean(),
  //   is_active: z.boolean(),
  //   is_verified: z.boolean(),
  created_at: z.date().optional(),
  updated_at: z.date().optional(),
});

// TypeScript types inferred from Zod schema
export type OptionsType = z.infer<typeof OptionsSchema>;
export type PricingType = z.infer<typeof PricingSchema>;
