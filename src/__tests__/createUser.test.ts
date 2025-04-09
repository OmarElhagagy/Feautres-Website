import * as user from '../handlers/user';
import { Request, Response, NextFunction } from 'express';

// Mock dependencies
jest.mock('../db', () => ({
  user: {
    findUnique: jest.fn().mockResolvedValue(null),
    create: jest.fn().mockResolvedValue({ id: '1', username: 'hello', password: 'hashed' }),
  },
}));
jest.mock('../modules/auth', () => ({
  hashPassword: jest.fn().mockResolvedValue('hashed'),
  createJWT: jest.fn().mockReturnValue('mock-token'),
}));

describe('user handler', () => {
  it('should create new user', async () => {
    const req = { body: { username: 'hello', password: 'hi' } } as Request;
    const res = {
      json: jest.fn((data: { token: string }) => {
        expect(data.token).toBeTruthy();
      }),
    } as unknown as Response;
    const next = jest.fn() as NextFunction;

    await user.createNewUser(req, res, next);
    expect(res.json).toHaveBeenCalledWith({ token: 'mock-token' });
  });
});
