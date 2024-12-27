import { Router } from 'express';
import * as subscriptionController from '../controllers/subscription/subscription.controllers';
import { validateSubscription } from '../middleware/validateSubscription';

export const router = Router();

router.post('/', subscriptionController.createSubscription);
router.put(
  '/:id',
  validateSubscription,
  subscriptionController.subscriptionUpgrade
);

router.get(
  '/:subscriptionId/status',
  validateSubscription,
  subscriptionController.checkSubscriptionStatus
);
