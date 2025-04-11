import { Request, Response, NextFunction } from 'express';

export const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    error: 'Not Found',
    message: `Route not found: ${req.method} ${req.path}`,
    statusCode: 404,
    timestamp: new Date().toISOString(),
  });
}; 