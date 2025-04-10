import prisma from '../db';
import { asyncHandler } from '../middleware/errorHandler';
import { createInputError, createNotFoundError } from '../utils/errors';

// GET UPDATES
export const getUpdates = asyncHandler(async (req, res) => {
  const updates = await prisma.update.findMany({
    where: {
      userId: req.user.id,
    },
    include: {
      updatePoints: true,
      product: {
        select: {
          name: true,
        },
      },
    },
  });

  if (updates.length === 0) {
    throw createNotFoundError('No updates found');
  }

  res.json({ data: updates });
});

// GET ONE UPDATE
export const getOneUpdate = asyncHandler(async (req, res) => {
  const update = await prisma.update.findFirst({
    where: {
      id: req.params.id,
      userId: req.user.id,
    },
    include: {
      updatePoints: true,
      product: {
        select: {
          name: true,
        },
      },
    },
  });

  if (!update) {
    throw createNotFoundError('Update not found');
  }

  res.json({ data: update });
});

// CREATE UPDATE
export const createUpdate = asyncHandler(async (req, res) => {
  const { title, body, productId, version, asset } = req.body;

  if (!title || !body || !productId) {
    throw createInputError('Title, body, and productId are required for an update');
  }

  const existingProduct = await prisma.product.findUnique({
    where: {
      id_belongsToId: {
        id: productId,
        belongsToId: req.user.id,
      },
    },
  });

  if (!existingProduct) {
    throw createNotFoundError('Product not found or doesn’t belong to you');
  }

  const update = await prisma.update.create({
    data: {
      title,
      body,
      productId,
      version,
      asset,
      userId: req.user.id,
      updatedAt: new Date(),
    },
    include: {
      product: {
        select: {
          name: true,
        },
      },
    },
  });
  res.json({ data: update });
});

// UPDATE UPDATE
export const updateUpdate = asyncHandler(async (req, res) => {
  const { title, body, productId, version, asset } = req.body;

  if (!title && !body && !productId && !version && !asset) {
    throw createInputError('At least one field needed for update');
  }

  const existingUpdate = await prisma.update.findFirst({
    where: {
      id: req.params.id,
      userId: req.user.id,
    },
  });

  if (!existingUpdate) {
    throw createNotFoundError('Update not found');
  }

  const updateData = {};
  if (title) updateData.title = title;
  if (body) updateData.body = body;
  if (productId) updateData.productId = productId;
  if (version) updateData.version = version;
  if (asset) updateData.asset = asset;

  updateData.updatedAt = new Date();

  const update = await prisma.update.update({
    where: {
      id: req.params.id,
    },
    data: updateData,
    include: {
      updatePoints: true,
    },
  });
  res.json({ data: update });
});

// DELETE UPDATE
export const deleteUpdate = asyncHandler(async (req, res) => {
  const existingUpdate = await prisma.update.findFirst({
    where: {
      id: req.params.id,
      userId: req.user.id,
    },
    include: {
      updatePoints: true,
    },
  });

  if (!existingUpdate) {
    throw createNotFoundError('Update not found');
  }

  await prisma.update.delete({
    where: {
      id: req.params.id,
      userId: req.user.id,
    },
  });
  res.status(204).end();
});
