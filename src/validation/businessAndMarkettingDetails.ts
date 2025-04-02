import { z } from 'zod';

export const BusinessAndMarketingDetailsSchema = z.object({
  user_id: z.number().int().positive(),
  description: z.string().min(1, 'Description is required'),
  mission: z.string().min(1, 'Mission statement is required'),
  target_audience: z.string().min(1, 'Target audience is required'),
  scope: z.enum(['local', 'national', 'global']),
  competitors: z
    .array(
      z.object({
        name: z.string().min(1, 'Competitor name is required'),
        website: z.string().url('Website must be a valid URL'),
      })
    )
    .default([]), // Default empty array if not provided
  ads: z.object({
    isRunning: z.boolean().default(false),
    adsDetails: z
      .array(
        z.object({
          adService: z.string().min(1, 'Ad service name is required'),
          url: z.string().url('Ad URL must be valid'),
        })
      )
      .default([]), // Default empty array
  }),
  digital_marketing: z.object({
    hasRunDigitalMarketingBefore: z.boolean().default(false),
    digitalMarketingDetails: z
      .array(
        z.object({
          details: z.string().min(1, 'Marketing details are required'),
          date: z.preprocess(
            (val) => (typeof val === 'string' ? new Date(val) : val),
            z
              .date()
              .refine(
                (date) => date <= new Date(),
                'Date cannot be in the future'
              )
          ),
        })
      )
      .default([]), // Default empty array
  }),
  previousCampaign: z.object({
    achievePreviousObjectives: z.boolean().default(false),
    file: z.array(
      z.object({
        fileName: z.string(),
        url: z.string(),
      })
    ),
  }),
});

export type BusinessAndMarketingDetailsType = z.infer<
  typeof BusinessAndMarketingDetailsSchema
>;
