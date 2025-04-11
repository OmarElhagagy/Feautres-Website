import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator/check';

export const handleInputErrors = (req: Request, res: Response, next: NextFunction): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }
  next();
}; 