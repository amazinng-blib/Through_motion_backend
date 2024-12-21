import { Router } from 'express';
import { registerUser } from '../controllers/users/register';

export const router = Router();
router.post('/register', registerUser);
