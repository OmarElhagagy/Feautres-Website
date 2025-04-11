console.log('Starting server.ts - Debug Version 3');
import express from 'express';
import router from './router.js';
import morgan from 'morgan';
import cors from 'cors';
import { protect } from './modules/auth.js';
import { createNewUser, signin } from './handlers/user.js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { Request, Response, NextFunction } from 'express';
import { errorHandler } from './middleware/errorHandler.js';
import fs from 'fs';
import { API_CONFIG } from './config/api.js';

dotenv.config();
console.log('NODE_ENV:', process.env.NODE_ENV);

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Enhanced logging middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// Basic security middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API routes
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

// Mount the router with /api prefix
app.use(API_CONFIG.BASE_URL, router);

// Find the frontend dist directory - more comprehensive search
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
    try {
      const files = fs.readdirSync(dir);
      console.log(`Directory ${dir} exists with files:`, files);
      if (files.includes('main.js') || files.includes('App.js')) {
        console.log('This might be a frontend directory but missing index.html');
      }
    } catch (error) {
      console.error(`Error reading directory ${dir}:`, error);
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

// 404 handler for all other routes
app.use((req: Request, res: Response) => {
  if (!res.headersSent) {
    res.status(404).json({
      error: 'Not Found',
      message: `Route not found: ${req.method} ${req.path}`,
      timestamp: new Date().toISOString()
    });
  }
});

// Error handler must be last
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API base URL: ${API_CONFIG.BASE_URL}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

export default app;
