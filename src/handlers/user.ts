import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import prisma from '../db.js';
import { hashPassword, createJWT, comparePasswords } from '../modules/auth.js';
import { createAuthError, createInputError } from '../utils/errors.js';

console.log("User handler module loaded");

export const createNewUser = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      throw createInputError('Username and password are required');
    }

    const existingUser = await prisma.user.findUnique({
      where: { username },
    });

    if (existingUser) {
      throw createAuthError('Username already exists');
    }

    const hashedPassword = await hashPassword(password);
    const user = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
      },
    });

    const token = createJWT(user);
    res.status(201).json({ token });
  } catch (error) {
    // ... existing code ...
  }
};

export const signin = asyncHandler(async (req: Request, res: Response) => {
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
});
