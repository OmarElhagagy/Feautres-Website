import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/errors';

export const errorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error('Error:', err);

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      error: err.message,
      statusCode: err.statusCode,
      timestamp: new Date().toISOString(),
    });
  }

  // Handle JWT errors
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      error: 'Invalid token',
      statusCode: 401,
      timestamp: new Date().toISOString(),
    });
  }

  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({
      error: 'Token expired',
      statusCode: 401,
      timestamp: new Date().toISOString(),
    });
  }

  // Handle validation errors
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      error: err.message,
      statusCode: 400,
      timestamp: new Date().toISOString(),
    });
  }

  // Default error
  return res.status(500).json({
    error: 'Internal Server Error',
    statusCode: 500,
    timestamp: new Date().toISOString(),
  });
}; 