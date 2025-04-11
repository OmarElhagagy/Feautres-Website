import { Router } from 'express';
import {
  createUpdate,
  getUpdates,
  getUpdate,
  updateUpdate,
  deleteUpdate,
} from '../modules/updates';
import { handleInputErrors } from '../middleware/validation';

export const updatesRouter = Router();

updatesRouter.get('/', getUpdates);
updatesRouter.get('/:id', getUpdate);
updatesRouter.post('/', handleInputErrors, createUpdate);
updatesRouter.put('/:id', handleInputErrors, updateUpdate);
updatesRouter.delete('/:id', deleteUpdate); 