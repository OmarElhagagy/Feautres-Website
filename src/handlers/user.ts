import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import prisma from '../db.js';
import { hashPassword, createJWT, comparePasswords } from '../modules/auth.js';
import { createAuthError, createInputError } from '../utils/errors.js';
import { User } from '../types';

export const createNewUser = asyncHandler(async (req: Request, res: Response) => {
  if (!req.body.username || !req.body.password) {
    throw createInputError('Username and password are required');
  }

  const existingUser = await prisma.user.findUnique({
    where: {
      username: req.body.username,
    },
  });

  if (existingUser) {
    throw createInputError('Username already exists');
  }

  const user = await prisma.user.create({
    data: {
      username: req.body.username,
      password: await hashPassword(req.body.password),
    },
  });

  const token = createJWT(user);
  res.json({ token });
});

export const signin = async (req: Request, res: Response) => {
  if (!req.body.username || !req.body.password) {
    throw createInputError('Username and password are required');
  }

  const user = await prisma.user.findUnique({
    where: {
      username: req.body.username,
    },
  });

  if (!user) {
    throw createAuthError('Invalid username or password');
  }

  const isValid = await comparePasswords(req.body.password, user.password);
  if (!isValid) {
    throw createAuthError('Invalid username or password');
  }

  const token = createJWT(user);
  res.json({ token });
};
