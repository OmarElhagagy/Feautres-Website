import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import prisma from '../db';
import { createNotFoundError, createInputError } from '../utils/errors';

export const getProducts = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user?.id) {
    throw new Error('User not authenticated');
  }

  const products = await prisma.product.findMany({
    where: {
      belongsToId: req.user.id,
    },
    include: {
      updates: {
        select: {
          id: true,
          title: true,
          status: true,
          updatedAt: true,
        },
      },
    },
  });

  if (products.length === 0) {
    throw createNotFoundError('No products found');
  }

  res.json({ data: products });
});

export const getOneProduct = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user?.id) {
    throw new Error('User not authenticated');
  }

  const product = await prisma.product.findUnique({
    where: {
      id_belongsToId: {
        id: req.params.id,
        belongsToId: req.user.id,
      },
    },
    include: {
      updates: true,
    },
  });

  if (!product) {
    throw createNotFoundError('Product not found');
  }

  res.json({ data: product });
});

export const createProduct = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user?.id) {
    throw new Error('User not authenticated');
  }

  if (!req.body.name) {
    throw createInputError('Product name is required');
  }

  const product = await prisma.product.create({
    data: {
      name: req.body.name,
      belongsToId: req.user.id,
    },
  });

  res.status(201).json({ data: product });
});

export const updateProduct = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user?.id) {
    throw new Error('User not authenticated');
  }

  if (!req.body.name) {
    throw createInputError('Product name is required');
  }

  const existingProduct = await prisma.product.findUnique({
    where: {
      id_belongsToId: {
        id: req.params.id,
        belongsToId: req.user.id,
      },
    },
  });

  if (!existingProduct) {
    throw createNotFoundError('Product not found');
  }

  const product = await prisma.product.update({
    where: {
      id_belongsToId: {
        id: req.params.id,
        belongsToId: req.user.id,
      },
    },
    data: {
      name: req.body.name,
    },
  });

  res.json({ data: product });
});

export const deleteProduct = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user?.id) {
    throw new Error('User not authenticated');
  }

  const existingProduct = await prisma.product.findUnique({
    where: {
      id_belongsToId: {
        id: req.params.id,
        belongsToId: req.user.id,
      },
    },
    include: {
      updates: true,
    },
  });

  if (!existingProduct) {
    throw createNotFoundError('Product not found');
  }

  await prisma.product.delete({
    where: {
      id_belongsToId: {
        id: req.params.id,
        belongsToId: req.user.id,
      },
    },
  });
  res.status(204).end();
});
