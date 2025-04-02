import { Request } from 'express';
import crypto from 'crypto';
import { AppError } from '../middleware/errorHandler';

export function verifyPaystackWebhook(req: Request): boolean {
  const signature = req.headers['x-paystack-signature'] as string;
  if (!signature) {
    throw new AppError('Missing Paystack signature', 400);
  }
  const hash = crypto
    .createHmac('sha512', process.env.PAYSTACK_SECRET_KEY!)
    .update(JSON.stringify(req.body))
    .digest('hex');

  return hash === req.headers['x-paystack-signature'];
}

// const PAYSTACK_SECRET = process.env.PAYSTACK_SECRET || '';

// export function verifyPaystackWebhook(req: Request): boolean {
//   const signature = req.headers['x-paystack-signature'] as string;
//   if (!signature) {
//     throw new AppError('Missing Paystack signature', 400);
//   }

//   // Compute HMAC SHA512 hash of request body using Paystack secret key
//   const hash = crypto
//     .createHmac('sha512', PAYSTACK_SECRET)
//     .update(JSON.stringify(req.body))
//     .digest('hex');

//   // Compare computed hash with received signature
//   return hash === signature;
// }
