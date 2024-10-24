import { Router } from 'express';
import { login, register } from '../controllers/authController';

const router = Router();

// POST request to add a new user
router.post('/register', register);

// Existing login route
router.post('/login', login);

export default router;
