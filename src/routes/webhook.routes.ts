import { Router } from 'express';
import { paystackWebhookHandler } from '../controllers/webhook/paystack.controllers';
export const router = Router();

router.post('/paystack', paystackWebhookHandler);
