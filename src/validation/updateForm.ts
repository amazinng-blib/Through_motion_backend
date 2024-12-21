import { z } from 'zod';

export const UpdateBusinessFormSchema = z.object({
  businessName: z.string(),
  description: z.string(),
  address: z.string(),
  phone: z.string(),
  website: z.string().url('Website must be a valid URL'),
  otherInfo: z.string(),
});

export type UpdateBusinessFormType = z.infer<typeof UpdateBusinessFormSchema>;
