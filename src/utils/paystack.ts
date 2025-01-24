import { Request } from 'express';
import crypto from 'crypto';

export function verifyPaystackSignature(req: Request): boolean {
  const hash = crypto
    .createHmac('sha512', process.env.PAYSTACK_SECRET_KEY!)
    .update(JSON.stringify(req.body))
    .digest('hex');

  return hash === req.headers['x-paystack-signature'];
}
