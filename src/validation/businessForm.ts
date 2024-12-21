import { z } from 'zod';

export const BusinessFormSchema = z.object({
  businessName: z.string(),
  description: z.string(),
  address: z.string(),
  phone: z.string(),
  website: z.string().url('Website must be a valid URL'),
  otherInfo: z.string(),
});

export type BusinessFormType = z.infer<typeof BusinessFormSchema>;
