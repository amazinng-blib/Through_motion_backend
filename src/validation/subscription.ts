import { z } from 'zod';
import { PlanTier, ServiceType } from '../models/ServiceCategory';

// Base schemas
const uuidSchema = z.number();
const priceSchema = z.number().positive().multipleOf(0.01);

// ServiceCategory Plan Schema
export const serviceCategorySchema = z.object({
  type: z.nativeEnum(ServiceType),
  description: z.string().optional(),
  tier: z.nativeEnum(PlanTier),
  name: z.string().min(1),
  servicePrice: priceSchema,
  currency: z.string().length(3).default('GBP'),
  planCode: z.string(),
  // startDate: z.date(),
  // endDate: z.date(),
  duration: z.number().positive(),
});

// Subscription Schemas
export const createSubscriptionSchema = z.object({
  subscriptionData: z.array(serviceCategorySchema),
  userId: uuidSchema,
  reference_number: z.string(),
});

export const updateSubscriptionSchema = z.object({
  serviceCategoryId: uuidSchema,
  userId: uuidSchema,
  extensionDays: z.number().positive(),
  reference_number: z.string(),
});

export const subscriptionParamsSchema = z.object({
  subscriptionId: uuidSchema,
});

// Response Schemas
export const subscriptionResponseSchema = z.object({
  id: uuidSchema,
  userId: uuidSchema,
  planId: uuidSchema,
  planCode: z.string(),
  // startDate: z.date(),
  // endDate: z.date(),
  isActive: z.boolean(),
  totalPrice: priceSchema,
  discountApplied: z.boolean(),
});

// Type exports
export type CreateSubscriptionInput = z.infer<typeof createSubscriptionSchema>;
export type UpdateSubscriptionInput = z.infer<typeof updateSubscriptionSchema>;
export type SubscriptionParams = z.infer<typeof subscriptionParamsSchema>;
export type SubscriptionResponse = z.infer<typeof subscriptionResponseSchema>;
