import { Router } from 'express';
import { login, register } from '../modules/auth';
import { handleInputErrors } from '../middleware/validation';

export const authRouter = Router();

authRouter.post('/login', handleInputErrors, login);
authRouter.post('/register', handleInputErrors, register); 