import { z } from 'zod';

export const GetInTouchSchema = z.object({
  name: z.string().min(3, 'Name must be at least more than two characters'),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(4, 'Subject must contain more than 3 characters'),
  message: z.string().min(6, 'Message must more than 5 characters'),

  attachment: z
    .object({
      filename: z.string(),
      content: z.instanceof(Buffer).or(z.string()),
      contentType: z.string().optional(),
      size: z.number().optional(),
    })
    .optional(),
});

export type GetInTouchType = z.infer<typeof GetInTouchSchema>;
