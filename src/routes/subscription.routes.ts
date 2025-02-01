import { Router } from 'express';
import { verifyToken } from '../middleware/verifyToken';

import { getAllSubscriptionController } from '../controllers/subscription/getAllSubscriptionController';
import { getSubscriptionByIdController } from '../controllers/subscription/getSubscriptionByIdController';
import { subscribeToServiceController } from '../controllers/subscription/subscribeToServiceController';
import { checkSubscriptionExpiration } from '../middleware/checkSubscriptionExpiration';
import { adminMiddleware } from '../middleware/adminMiddleware';
import { updateServiceController } from '../controllers/subscription/updateServiceController';

export const router = Router();

router.get('/services', getAllSubscriptionController);
router.get('/services/:id', verifyToken, getSubscriptionByIdController);
router.post(
  '/services',
  verifyToken,
  adminMiddleware,
  subscribeToServiceController
);
router.put(
  '/services/update/:id',
  verifyToken,
  adminMiddleware,
  updateServiceController
);
router.get(
  '/user-services',
  verifyToken,
  checkSubscriptionExpiration,
  subscribeToServiceController
);
