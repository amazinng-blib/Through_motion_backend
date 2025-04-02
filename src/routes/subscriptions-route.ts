import { Router } from 'express';
import { verifyToken } from '../middleware/verifyToken';
import { subscribeToServiceController } from '../controllers/subscriptions/subscribeToService';
import { getAllSubscriptionsController } from '../controllers/subscriptions/getAllSubscriptions';
import { getUserSubscriptionsController } from '../controllers/subscriptions/getUserSubscriptions';
import { checkSubscriptionController } from '../controllers/subscriptions/updateSubscription';

export const router = Router();

router.post('/subscribe', verifyToken, subscribeToServiceController);
router.post('/update-sub', verifyToken, checkSubscriptionController);
router.get('/', verifyToken, getAllSubscriptionsController);
router.get('/user', verifyToken, getUserSubscriptionsController);
