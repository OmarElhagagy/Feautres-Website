import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import prisma from '../db.js';
import { createInputError, createNotFoundError } from '../utils/errors.js';

export const getUpdatedPoints = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user?.id) {
    throw new Error('User not authenticated');
  }

  const updatePoints = await prisma.updatePoint.findMany({
    where: {
      update: {
        userId: req.user.id,
      },
    },
    include: {
      update: true,
    },
  });

  if (updatePoints.length === 0) {
    throw createNotFoundError('No update points found');
  }

  res.json({ data: updatePoints });
});

export const getOneUpdatedPoints = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user?.id) {
    throw new Error('User not authenticated');
  }

  const updatePoint = await prisma.updatePoint.findFirst({
    where: {
      id: req.params.id,
      update: {
        userId: req.user.id,
      },
    },
    include: {
      update: true,
    },
  });

  if (!updatePoint) {
    throw createNotFoundError('Update point not found');
  }

  res.json({ data: updatePoint });
});

export const createUpdatedPoints = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user?.id) {
    throw new Error('User not authenticated');
  }

  if (!req.body.name) {
    throw createInputError('Name is required for update point');
  }

  const existingUpdate = await prisma.update.findFirst({
    where: {
      id: req.body.updateId,
      userId: req.user.id,
    },
  });

  if (!existingUpdate) {
    throw createNotFoundError('Update not found');
  }

  const updatePoint = await prisma.updatePoint.create({
    data: {
      name: req.body.name,
      description: req.body.description,
      updateId: req.body.updateId,
      updatedAt: new Date(),
    },
  });
  res.status(201).json({ data: updatePoint });
});

export const updateUpdatedPoints = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user?.id) {
    throw new Error('User not authenticated');
  }

  if (!req.body.name) {
    throw createInputError('Name is required for update point');
  }

  const existingUpdatedPoint = await prisma.updatePoint.findFirst({
    where: {
      id: req.params.id,
      update: {
        userId: req.user.id,
      },
    },
  });

  if (!existingUpdatedPoint) {
    throw createNotFoundError('Update point not found');
  }

  const updatePoint = await prisma.updatePoint.update({
    where: {
      id: req.params.id,
    },
    data: {
      name: req.body.name,
      description: req.body.description,
      updatedAt: new Date(),
    },
  });
  res.json({ data: updatePoint });
});

export const deleteUpdatedPoints = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user?.id) {
    throw new Error('User not authenticated');
  }

  const existingUpdatePoint = await prisma.updatePoint.findFirst({
    where: {
      id: req.params.id,
      update: {
        userId: req.user.id,
      },
    },
  });

  if (!existingUpdatePoint) {
    throw createNotFoundError('Update point not found');
  }

  await prisma.updatePoint.delete({
    where: {
      id: req.params.id,
    },
  });
  res.status(204).end();
});
