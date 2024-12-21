import { Router } from 'express';
import { registerUser } from '../controllers/users/register';
import { login } from '../controllers/users/login';
import { verifyToken } from '../utils/verifyToken';
import { changePassword } from '../controllers/users/changePassword';

export const router = Router();
router.post('/register', registerUser);
router.post('/login', login);
router.put('/change-password', verifyToken, changePassword);
