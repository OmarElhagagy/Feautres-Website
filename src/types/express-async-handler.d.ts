declare module 'express-async-handler' {
  import { Request, Response, NextFunction } from 'express';

  type AsyncHandler = (
    fn: (req: Request, res: Response, next: NextFunction) => Promise<void>
  ) => (req: Request, res: Response, next: NextFunction) => void;

  const asyncHandler: AsyncHandler;
  export default asyncHandler;
}
