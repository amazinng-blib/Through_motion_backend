import { Router } from 'express';
import { handlePaystackWebhook } from '../controllers/webhook/webhookController';

export const router = Router();

router.post('/webhook', handlePaystackWebhook);
