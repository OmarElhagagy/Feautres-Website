import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import prisma from '../db';
import { hashPassword, createJWT, comparePasswords } from '../modules/auth';
import { createAuthError, createInputError } from '../utils/errors';
import { User } from '../types';

console.log("User handler module loaded");

export const createNewUser = asyncHandler(async (req: Request, res: Response) => {
  console.log("Creating new user with data:", req.body);
  
  if (!req.body.username || !req.body.password) {
    console.log("Missing username or password");
    return res.status(400).json({ message: 'Username and password are required' });
  }
  
  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        username: req.body.username,
      },
    });
    
    if (existingUser) {
      console.log("Username already exists:", req.body.username);
      return res.status(400).json({ message: 'Username already exists' });
    }
    
    const user = await prisma.user.create({
      data: {
        username: req.body.username,
        password: await hashPassword(req.body.password),
      },
    });
    
    const token = createJWT(user);
    console.log("User created successfully, token generated");
    return res.status(201).json({ token });
  } catch (error) {
    console.error("Error creating user:", error);
    return next(error);
  }
});

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
