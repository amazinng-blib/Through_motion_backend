import { z } from 'zod';

export const BusinessAndContactFormSchema = z.object({
  user_id: z.number().int().positive(),
  company_name: z.string().min(1, 'Company name is required'),
  email: z.string().email('Invalid email address'),
  company_representative: z
    .string()
    .min(1, 'Company representative is required'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  company_address: z.string().min(1, 'Company address is required'),
  industry: z.string().min(1, 'Industry is required'),
  business_type: z.string().min(1, 'Business type is required'),
  company_size: z
    .number()
    .int()
    .positive()
    .min(1, 'Company size must be at least 1'),
  established_year: z.preprocess(
    (val) => (typeof val === 'string' ? new Date(val) : val),
    z
      .date()
      .refine(
        (date) => date <= new Date(),
        'Established year cannot be in the future'
      )
  ),
});

export type BusinessAndContactFormType = z.infer<
  typeof BusinessAndContactFormSchema
>;
