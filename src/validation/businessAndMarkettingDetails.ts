import { z } from 'zod';

export const BusinessAndMarketingDetailsSchema = z.object({
  description: z.string(),
  mission: z.string(),
  targetAudience: z.string(),
  scope: z.enum(['local', 'national', 'global']),
  competitors: z.array(
    z.object({
      name: z.string(),
      website: z.string().url('Website must be a valid URL'),
    })
  ),
  ads: z.object({
    isRunning: z.boolean().default(false),
    adsDetails: z.array(
      z.object({
        adService: z.string(),
        url: z.string(),
      })
    ),
  }),
  digitalMarketing: z.object({
    hasRunDigitalMarketingBefore: z.boolean().default(false),
    digitalMarketingDetails: z.array(
      z.object({
        details: z.string(),
        date: z.date(),
      })
    ),
  }),
  previousCampaign: z.object({
    achievePreviousObjectives: z.boolean().default(false),
    file: z.string(),
  }),
});

export type BusinessAndMarketingDetailsType = z.infer<
  typeof BusinessAndMarketingDetailsSchema
>;
