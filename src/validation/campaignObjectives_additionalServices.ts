import { z } from 'zod';

export const CampaignObjectives_AdditionalServicesSchema = z.object({
  website: z.string().url('Website must be a valid URL'),
  email: z.string().email('Must be a valid email'),
  specificGoals: z.string(),
  campaignGoals: z.string(),
  needLandingPage: z.boolean().default(false),
  ads: z.object({
    needIncreaseAdsSpend: z.boolean().default(false),
    budget: z.number(),
    paymentMethod: z.string(),
  }),
  customerData: z.object({
    currentCustomerDataAvailable: z.boolean().default(false),
    file: z.string(),
  }),
});

export type CampaignObjectives_AdditionalServicesType = z.infer<
  typeof CampaignObjectives_AdditionalServicesSchema
>;
