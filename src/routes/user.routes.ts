import { Router } from 'express';
import { registerUser } from '../controllers/auth/register';
import { login } from '../controllers/auth/login';
import { verifyToken } from '../middleware/verifyToken';
import { UpdateProfile } from '../controllers/auth/updateProfile';

export const router = Router();
router.post('/register', registerUser);
router.post('/login', login);
router.put('/update-profile', verifyToken, UpdateProfile);
