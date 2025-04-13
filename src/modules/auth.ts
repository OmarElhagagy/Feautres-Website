import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { User } from '../types.js';
import { createAuthError } from '../utils/errors';

// Get JWT_SECRET from environment variables
const JWT_SECRET = process.env.JWT_SECRET;

// Ensure JWT_SECRET is defined
if (!JWT_SECRET) {
  console.error('WARNING: JWT_SECRET environment variable is not set. Authentication will not work properly.');
}

export const comparePasswords = (password: string, hashedPassword: string): Promise<boolean> => {
  return bcrypt.compare(password, hashedPassword);
};

export const hashPassword = (password: string): Promise<string> => {
  return bcrypt.hash(password, 5);
};

export const createJWT = (user: User): string => {
  if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined');
  }
  
  const token = jwt.sign(
    { id: user.id, username: user.username },
    JWT_SECRET,
    { expiresIn: '1d' }
  );
  return token;
};

export const protect = (req: Request, res: Response, next: NextFunction): void => {
  if (!JWT_SECRET) {
    res.status(500).json({ message: 'Server configuration error' });
    return;
  }

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
    if (!JWT_SECRET) {
      return next(createAuthError('Server configuration error'));
    }
    
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
    if (!JWT_SECRET) {
      return next(createAuthError('Server configuration error'));
    }
    
    const { username } = req.body;
    // TODO: Implement actual registration logic
    const token = jwt.sign({ id: '1', username }, JWT_SECRET);
    res.json({ token });
  } catch (error) {
    next(createAuthError('Registration failed'));
  }
};
