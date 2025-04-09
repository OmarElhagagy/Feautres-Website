import { User } from '../types'; // Import User from existing types

declare module 'express' {
  interface Request {
    user?: User; 
  }
}
