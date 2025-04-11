import { Request, Response, NextFunction } from 'express';
import { Router } from 'express';
import { handleInputErrors } from '../middleware/validation';
import { createInputError, createNotFoundError } from '../utils/errors';
import prisma from '../db';
import { protect } from '../middleware/auth';

const router = Router();

// Get all update points for an update
router.get('/', protect, async (req: Request, res: Response) => {
  const { updateId } = req.params;
  const updatePoints = await prisma.updatePoint.findMany({
    where: { updateId },
    include: { update: true },
  });
  res.json(updatePoints);
});

// Get a single update point
router.get('/:id', protect, async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatePoint = await prisma.updatePoint.findUnique({
    where: { id },
    include: { update: true },
  });

  if (!updatePoint) {
    throw createNotFoundError('Update point');
  }

  res.json(updatePoint);
});

// Create a new update point
router.post('/', protect, handleInputErrors, async (req: Request, res: Response) => {
  const { updateId } = req.params;
  const { name, description } = req.body;

  if (!name) {
    throw createInputError('Name is required');
  }

  const updatePoint = await prisma.updatePoint.create({
    data: {
      name,
      description,
      updateId,
      updatedAt: new Date(),
    },
    include: { update: true },
  });

  res.status(201).json(updatePoint);
});

// Update an update point
router.put('/:id', protect, handleInputErrors, async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, description } = req.body;

  const updatePoint = await prisma.updatePoint.update({
    where: { id },
    data: {
      name,
      description,
      updatedAt: new Date(),
    },
    include: { update: true },
  });

  res.json(updatePoint);
});

// Delete an update point
router.delete('/:id', protect, async (req: Request, res: Response) => {
  const { id } = req.params;

  await prisma.updatePoint.delete({
    where: { id },
  });

  res.status(204).end();
});

export default router;
