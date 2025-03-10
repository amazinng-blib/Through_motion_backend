import { z } from 'zod';

export const BusinessAndContactFormSchema = z.object({
  userId: z.number().int().positive(),
  companyName: z.string().min(1, 'Company name is required'),
  email: z.string().email('Invalid email address'),
  companyRepresentative: z
    .string()
    .min(1, 'Company representative is required'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  companyAddress: z.string().min(1, 'Company address is required'),
  industry: z.string().min(1, 'Industry is required'),
  businessType: z.string().min(1, 'Business type is required'),
  companySize: z
    .number()
    .int()
    .positive()
    .min(1, 'Company size must be at least 1'),
  establishedYear: z.preprocess(
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
