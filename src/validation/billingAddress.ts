import { z } from 'zod';

export const BillingAddressSchema = z.object({
  id: z.number().optional(),
  userId: z.number(),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email format'),
  companyName: z.string().optional(),
  region: z.string().min(1, 'Region is required'),
  state: z.string().min(1, 'State is required'),
  city: z.string().min(1, 'City is required'),
  streetAddress: z.string().min(1, 'Street address is required'),
  apartment: z.string().min(1, 'Apartment is required'),
  phone: z.string().min(1, 'Phone number is required'),
  orderNote: z.string().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export const UpdateBillingAddressSchema = BillingAddressSchema.partial();

export type UpdateBillingAddressType = z.infer<
  typeof UpdateBillingAddressSchema
>;
export type BillingAddressType = z.infer<typeof BillingAddressSchema>;
