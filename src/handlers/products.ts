import { Router } from 'express';
import {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} from '../modules/products';
import { handleInputErrors } from '../middleware/validation';

export const productsRouter = Router();

productsRouter.get('/', getProducts);
productsRouter.get('/:id', getProduct);
productsRouter.post('/', handleInputErrors, createProduct);
productsRouter.put('/:id', handleInputErrors, updateProduct);
productsRouter.delete('/:id', deleteProduct); 