import { Router } from 'express';
import { protect } from './modules/auth.js';
import { handleInputErrors } from './modules/middleware.js';
import { createProduct, updateProduct, deleteProduct, getProducts, getOneProduct } from './handlers/product.js';
import { createUpdate, updateUpdate, deleteUpdate, getUpdates, getOneUpdate } from './handlers/update.js';
import { createUpdatedPoints, updateUpdatedPoints, deleteUpdatedPoints, getUpdatedPoints, getOneUpdatedPoints } from './handlers/updatePoints.js';
import { API_CONFIG } from './config/api.js';

const router = Router();

// Add request logging middleware
router.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// Products Routes
router.get(API_CONFIG.ROUTES.PRODUCTS.BASE, protect, getProducts);
router.get(API_CONFIG.ROUTES.PRODUCTS.BY_ID, protect, getOneProduct);
router.post(API_CONFIG.ROUTES.PRODUCTS.BASE, protect, handleInputErrors, createProduct);
router.put(API_CONFIG.ROUTES.PRODUCTS.BY_ID, protect, handleInputErrors, updateProduct);
router.delete(API_CONFIG.ROUTES.PRODUCTS.BY_ID, protect, deleteProduct);

// Updates Routes
router.get(API_CONFIG.ROUTES.UPDATES.BASE, protect, getUpdates);
router.get(API_CONFIG.ROUTES.UPDATES.BY_ID, protect, getOneUpdate);
router.post(API_CONFIG.ROUTES.UPDATES.BASE, protect, handleInputErrors, createUpdate);
router.put(API_CONFIG.ROUTES.UPDATES.BY_ID, protect, handleInputErrors, updateUpdate);
router.delete(API_CONFIG.ROUTES.UPDATES.BY_ID, protect, deleteUpdate);

// Update Points Routes
router.get(API_CONFIG.ROUTES.UPDATE_POINTS.BASE, protect, getUpdatedPoints);
router.get(API_CONFIG.ROUTES.UPDATE_POINTS.BY_ID, protect, getOneUpdatedPoints);
router.post(API_CONFIG.ROUTES.UPDATE_POINTS.BASE, protect, handleInputErrors, createUpdatedPoints);
router.put(API_CONFIG.ROUTES.UPDATE_POINTS.BY_ID, protect, handleInputErrors, updateUpdatedPoints);
router.delete(API_CONFIG.ROUTES.UPDATE_POINTS.BY_ID, protect, deleteUpdatedPoints);

// Add 404 handler for API routes
router.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: `API endpoint ${req.method} ${req.path} not found`,
    timestamp: new Date().toISOString()
  });
});

export default router;
