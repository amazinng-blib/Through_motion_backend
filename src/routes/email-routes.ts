import { Router } from 'express';
import { getInTouchController } from '../controllers/emails/get-in-touch-controller';
import { subscribeToNewsletterController } from '../controllers/emails/subscribe-to-newsletter';

export const router = Router();
router.post('/get-in-touch', getInTouchController);
router.post('/subscribe-to-newsletter', subscribeToNewsletterController);
