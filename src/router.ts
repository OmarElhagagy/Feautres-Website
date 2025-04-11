import { Router } from 'express';
import { productsRouter } from './handlers/products.js';
import { updatesRouter } from './handlers/updates.js';
import updatePointsRouter from './handlers/updatePoints.js';
import { protect } from './middleware/auth';

const router = Router();

// Protected routes
router.use('/products', protect, productsRouter);
router.use('/updates', protect, updatesRouter);
router.use('/updates/:updateId/points', protect, updatePointsRouter);

// Add request logging middleware
router.use((req, _res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

export default router;
