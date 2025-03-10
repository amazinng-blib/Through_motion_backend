import { Router } from 'express';
import { verifyToken } from '../middleware/verifyToken';
import { addBillingAddressController } from '../controllers/billing-address/addBillingAddressController';
import { updateBillingAddressController } from '../controllers/billing-address/updateBillingAddressController';
import { getUserBillingAddressController } from '../controllers/billing-address/getUserBillingAddressController';

export const router = Router();
router.post('/add', verifyToken, addBillingAddressController);
router.put('/edit', verifyToken, updateBillingAddressController);
router.get('/', verifyToken, getUserBillingAddressController);
