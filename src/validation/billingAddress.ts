import { z } from 'zod';

export const BillingAddressSchema = z.object({
  id: z.number().optional(),
  user_id: z.number(),
  first_name: z.string().min(1, 'First name is required'),
  last_name: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email format'),
  company_name: z.string().optional(),
  region: z.string().min(1, 'Region is required'),
  state: z.string().min(1, 'State is required'),
  city: z.string().min(1, 'City is required'),
  street_address: z.string().min(1, 'Street address is required'),
  apartment: z.string().min(1, 'Apartment is required'),
  phone: z.string().min(1, 'Phone number is required'),
  order_ote: z.string().optional(),
});

export const UpdateBillingAddressSchema = BillingAddressSchema.partial();

export type UpdateBillingAddressType = z.infer<
  typeof UpdateBillingAddressSchema
>;
export type BillingAddressType = z.infer<typeof BillingAddressSchema>;
