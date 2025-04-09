import express from 'express';
import router from './router.js';
import morgan from 'morgan';
import cors from 'cors';
import { protect } from './modules/auth.js';
import { createNewUser, signin } from './handlers/user.js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { Request, Response } from 'express';

dotenv.config();

const app = express();

// ESM equivalents of __dirname and __filename
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve frontend in production BEFORE other routes
if (process.env.NODE_ENV === 'production') {
  const frontendPath = path.join(__dirname, '../dist/frontend');
  app.use(express.static(frontendPath));
  app.get('*', (req: Request, res: Response) => {
    res.sendFile(path.join(frontendPath, 'index.html'));
  });
}

// API routes
app.use('/api', protect, router);
app.post('/user', createNewUser);
app.post('/signin', signin);

// Default root route (only hit if not production or no static file)
app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'hello' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
