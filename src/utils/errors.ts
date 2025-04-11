export class AppError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public isOperational = true
  ) {
    super(message);
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

export const createInputError = (message: string): AppError => {
  return new AppError(400, message);
};

export const createNotFoundError = (resource: string): AppError => {
  return new AppError(404, `${resource} not found`);
};

export const createUnauthorizedError = (message = 'Unauthorized'): AppError => {
  return new AppError(401, message);
};

export const createForbiddenError = (message = 'Forbidden'): AppError => {
  return new AppError(403, message);
}; 