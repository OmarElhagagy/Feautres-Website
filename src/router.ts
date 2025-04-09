import { Router } from 'express';
import { protect } from './modules/auth.js';
import { handleInputErrors } from './modules/middleware.js';
import { createProduct, updateProduct, deleteProduct, getProducts, getOneProduct } from './handlers/product.js';
import { createNewUser, signin } from './handlers/user.js';
import { createUpdatedPoints, updateUpdatedPoints, deleteUpdatedPoints, getUpdatedPoints, getOneUpdatedPoints } from './handlers/updatePoints.js';

const router = Router();

router.post('/user', createNewUser);
router.post('/signin', signin);

router.get('/product', protect, getProducts);
router.get('/product/:id', protect, getOneProduct);
router.post('/product', protect, handleInputErrors, createProduct);
router.put('/product/:id', protect, handleInputErrors, updateProduct);
router.delete('/product/:id', protect, deleteProduct);

router.get('/updatePoints', protect, getUpdatedPoints);
router.get('/updatePoints/:id', protect, getOneUpdatedPoints);
router.post('/updatePoints', protect, handleInputErrors, createUpdatedPoints);
router.put('/updatePoints/:id', protect, handleInputErrors, updateUpdatedPoints);
router.delete('/updatePoints/:id', protect, deleteUpdatedPoints);

export default router;
