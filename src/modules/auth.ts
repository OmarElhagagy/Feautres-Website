import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { User } from '../types.js';
import { createAuthError } from '../utils/errors';

// Use a consistent JWT_SECRET
const JWT_SECRET = process.env.JWT_SECRET || 'default-secret-key';

export const comparePasswords = (password: string, hashedPassword: string): Promise<boolean> => {
  return bcrypt.compare(password, hashedPassword);
};

export const hashPassword = (password: string): Promise<string> => {
  return bcrypt.hash(password, 5);
};

export const createJWT = (user: User): string => {
  const token = jwt.sign(
    { id: user.id, username: user.username },
    JWT_SECRET,
    { expiresIn: '1d' }
  );
  return token;
};

export const protect = (req: Request, res: Response, next: NextFunction): void => {
  const bearer = req.headers.authorization;

  if (!bearer) {
    res.status(401).json({ message: 'Not authorized' });
    return;
  }

  const [, token] = bearer.split(' ');
  if (!token) {
    res.status(401).json({ message: 'Invalid token' });
    return;
  }

  try {
    const user = jwt.verify(token, JWT_SECRET) as User;
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: 'Invalid token' });
    return;
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username } = req.body;
    // TODO: Implement actual login logic
    const token = jwt.sign({ id: '1', username }, JWT_SECRET);
    res.json({ token });
  } catch (error) {
    next(createAuthError('Login failed'));
  }
};

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username } = req.body;
    // TODO: Implement actual registration logic
    const token = jwt.sign({ id: '1', username }, JWT_SECRET);
    res.json({ token });
  } catch (error) {
    next(createAuthError('Registration failed'));
  }
};
