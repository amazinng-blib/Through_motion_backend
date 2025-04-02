import { z } from 'zod';

const OptionsSchema = z.object({
  title: z.string(),
  price: z.number(),
});

export const PlanSchema = z.object({
  id: z.number().optional(),
  userId: z.number(),
  plan_title: z.string(),
  name: z.string(),
  business_email: z.string().email(),
  company_reps: z.string(),
  web_address: z.string().optional(),
  marketing_goals: z.string(),
  is_replied: z.boolean(),
  quote_url: z.string().url(),
  options: z.array(OptionsSchema),
});

// Zod TypeScript types
export type OptionsType = z.infer<typeof OptionsSchema>;
export type PlanType = z.infer<typeof PlanSchema>;
