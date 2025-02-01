import { z } from 'zod';
import {
  ServiceName,
  ServiceStatus,
  ServiceTier,
  ServiceType,
} from '../enum/subscription.enums';

export const ServiceTierSchema = z.nativeEnum(ServiceTier);
export const ServiceStatusSchema = z.nativeEnum(ServiceStatus);
export const ServiceNameSchema = z.nativeEnum(ServiceName);
export const ServiceTypeSchema = z.nativeEnum(ServiceType);

export const ServiceSchema = z.object({
  id: z.number().optional(),
  serviceName: ServiceNameSchema,
  serviceType: ServiceTypeSchema,
  price: z.number().positive('Price must be positive'),
  tier: ServiceTierSchema,
  currency: z.string().length(3).default('GBP'),
  duration: z.number().positive(),
  subscriberEmail: z.string(),
  serviceStatus: ServiceStatusSchema.default(ServiceStatus.PENDING),
  planCode: z.string(),
});

export const CalculateDiscountSchema = z.object({
  services: z.array(z.string()).min(1, 'At least one service is required'),
});

export type Service = z.infer<typeof ServiceSchema>;
export const UpdateServiceSchema = ServiceSchema.partial();
export type UpdateServiceType = z.infer<typeof UpdateServiceSchema>;
export type CalculateDiscountInput = z.infer<typeof CalculateDiscountSchema>;
