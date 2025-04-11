console.log('Starting server.ts - Debug Version 3');
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { router } from './router';
import { errorHandler } from './middleware/errorHandler';
import { notFoundHandler } from './middleware/notFoundHandler';
import config from './config';
import { protect } from './modules/auth.js';
import { createNewUser, signin } from './handlers/user.js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import { API_CONFIG } from './config/api.js';

dotenv.config();
console.log('NODE_ENV:', process.env.NODE_ENV);

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enhanced logging middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Public routes (no authentication required)
app.post(API_CONFIG.ROUTES.AUTH.SIGNIN, async (req: Request, res: Response, next: NextFunction) => {
  console.log('POST /signin route hit');
  try {
    await signin(req, res, next);
    if (!res.headersSent) {
      console.log('Warning: POST /signin handler did not send a response');
      return next();
    }
  } catch (error) {
    console.error('Error in /signin route:', error);
    next(error);
  }
});

app.post(API_CONFIG.ROUTES.AUTH.REGISTER, async (req: Request, res: Response, next: NextFunction) => {
  console.log('POST /user route hit with body:', JSON.stringify(req.body));
  try {
    await createNewUser(req, res, next);
    if (!res.headersSent) {
      console.log('Warning: POST /user handler did not send a response');
      return next();
    }
  } catch (error) {
    console.error('Error in /user route:', error);
    next(error);
  }
});

// Mount the router with /api prefix and protect all routes
app.use(API_CONFIG.BASE_URL, protect, router);

// Find the frontend dist directory
const possibleFrontendPaths = [
  path.join(__dirname, 'frontend'),
  path.join(__dirname, '../dist/frontend'),
  path.join(__dirname, '../frontend'),
  path.join(__dirname, '../dist'),
  path.join(__dirname, '..'),
  path.join(__dirname, '../frontend/dist'),
  path.join(__dirname, '../frontend/build'),
  path.join(__dirname),
];

let frontendPath: string | null = null;
for (const dir of possibleFrontendPaths) {
  console.log(`Checking path: ${dir}`);
  if (fs.existsSync(dir)) {
    if (fs.existsSync(path.join(dir, 'index.html'))) {
      frontendPath = dir;
      console.log('Found frontend files with index.html at:', frontendPath);
      break;
    }
  }
}

if (frontendPath) {
  // Serve static files first
  app.use(express.static(frontendPath));
  
  // Then set up a catch-all route for the SPA
  app.get('*', (req: Request, res: Response, next: NextFunction) => {
    // Skip the catch-all if it's an API route
    if (req.path.startsWith(API_CONFIG.BASE_URL) || 
        req.path === API_CONFIG.ROUTES.AUTH.SIGNIN || 
        req.path === API_CONFIG.ROUTES.AUTH.REGISTER) {
      return next();
    }
    
    console.log('Serving index.html for path:', req.path);
    if (frontendPath) {
      res.sendFile(path.join(frontendPath, 'index.html'));
    } else {
      next();
    }
  });
} else {
  console.error('WARNING: Could not find frontend files! You may need to build the frontend first.');
  console.log('If you built the frontend separately, make sure to copy it to the correct location.');
  console.log('For Vite apps, typically run: npm run build');
  
  app.get('/', (req: Request, res: Response) => {
    res.json({ 
      message: 'API server running, but frontend files not found',
      checkedPaths: possibleFrontendPaths,
      environment: process.env.NODE_ENV,
      solution: 'You need to build your frontend and make sure the files are in the correct location'
    });
  });
}

// Error handling
app.use(notFoundHandler);
app.use(errorHandler);

const PORT = config.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

export default app;
