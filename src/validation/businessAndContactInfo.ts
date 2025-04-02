import { z } from 'zod';

export const BusinessAndContactInfoSchema = z.object({
  company_name: z.string().min(2, 'Company name must be more than a letter'),
  email: z.string().email('Invalid email address'),
  representative: z
    .string()
    .regex(/^[A-Za-z]+$/, 'Representative name must contain only letters')
    .min(1, 'Representative name is required')
    .max(100, 'Representative name must be 100 characters or fewer'),
  phone: z.string(),
  address: z.string(),
  industry: z.string(),
  business_type: z.string(),
  company_size: z.number(),
  yearEstablished: z.string(),
});

export type BusinessAndContactInfoType = z.infer<
  typeof BusinessAndContactInfoSchema
>;
