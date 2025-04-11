import { Router } from 'express';
import { authRouter } from './handlers/auth.js';
import { productsRouter } from './handlers/products.js';
import { updatesRouter } from './handlers/updates.js';
import updatePointsRouter from './handlers/updatePoints.js';
import { authenticateToken } from './middleware/auth.js';
import { handleInputErrors } from './middleware/validation';

export const router = Router();

// Public routes
router.use('/auth', authRouter);

// Protected routes
router.use('/products', authenticateToken, productsRouter);
router.use('/updates', authenticateToken, updatesRouter);
router.use('/updates/:updateId/points', authenticateToken, updatePointsRouter);

// Add request logging middleware
router.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// Add 404 handler for API routes
router.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: `API endpoint ${req.method} ${req.path} not found`,
    timestamp: new Date().toISOString()
  });
});

export default router;
