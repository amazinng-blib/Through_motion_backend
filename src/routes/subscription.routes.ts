import { Router } from 'express';
import { verifyToken } from '../middleware/verifyToken';

import { getAllSubscriptionController } from '../controllers/subscription/getAllSubscriptionController';
import { getSubscriptionByIdController } from '../controllers/subscription/getSubscriptionByIdController';
import { subscribeToServiceController } from '../controllers/subscription/subscribeToServiceController';
import { checkSubscriptionExpiration } from '../middleware/checkSubscriptionExpiration';
import { updateServiceController } from '../controllers/subscription/updateServiceController';

export const router = Router();

router.get('/', getAllSubscriptionController);
router.get('/:id', verifyToken, getSubscriptionByIdController);
router.post('/', subscribeToServiceController);
router.put('/update/:id', verifyToken, updateServiceController);
router.get(
  '/user-services',
  verifyToken,
  checkSubscriptionExpiration,
  subscribeToServiceController
);
