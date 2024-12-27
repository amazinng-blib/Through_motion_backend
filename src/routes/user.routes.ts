import { Router } from 'express';
import { registerUser } from '../controllers/auth/register';
import { login } from '../controllers/auth/login';
import { verifyToken } from '../middleware/verifyToken';
import { changePassword } from '../controllers/auth/changePassword';

export const router = Router();
router.post('/register', registerUser);
router.post('/login', login);
router.put('/change-password', verifyToken, changePassword);
