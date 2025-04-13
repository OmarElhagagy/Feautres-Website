# Features Website

A full-stack web application with user authentication, product management, and update tracking built with Node.js, Express, React, and PostgreSQL.

## Overview

The Features Website is a modern web platform that allows users to:
- Register and authenticate
- Create and manage products
- Track product updates and improvements
- Manage detailed update points for each product update

## Tech Stack

### Backend
- **Framework**: Express.js with TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT-based auth with bcrypt for password hashing
- **Validation**: express-validator for input validation
- **Security**: Helmet for HTTP security headers

### Frontend
- **Framework**: React with TypeScript/JSX
- **Routing**: React Router
- **Styling**: Tailwind CSS
- **Build Tool**: Vite

### DevOps
- **Containerization**: Docker support
- **Testing**: Jest and Supertest
- **Deployment**: Azure-ready with certificate support

## Installation

### Prerequisites
- Node.js (v16+)
- npm or yarn
- PostgreSQL database

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/features-website.git
   cd features-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory with the following variables:
   ```
   DATABASE_URL="postgresql://username:password@localhost:5432/your_database"
   PORT=5000
   JWT_SECRET=your-jwt-secret
   NODE_ENV=development
   ```

4. **Initialize the database**
   ```bash
   npm run prisma:generate
   npm run prisma:migrate
   ```

5. **Development mode**
   ```bash
   npm run dev
   ```
   This will start both frontend and backend in development mode with hot reloading.

## Project Structure

```
features-website/
├── prisma/                 # Prisma schema and migrations
├── src/
│   ├── assets/             # Static assets
│   ├── components/         # React components
│   ├── config/             # Configuration files
│   ├── context/            # React contexts
│   ├── handlers/           # API request handlers
│   ├── middleware/         # Express middleware
│   ├── modules/            # Core functionality modules
│   ├── pages/              # React route pages
│   ├── types/              # TypeScript types and interfaces
│   ├── utils/              # Utility functions
│   ├── App.jsx             # Main React component
│   ├── server.ts           # Express server entry point
│   └── main.jsx            # Frontend entry point
├── dist/                   # Compiled output
├── public/                 # Public assets
└── ...config files
```

## Core Features

### User Management
- Registration with username/password
- Secure authentication with JWT
- Protected routes for authenticated users

### Product Management
- Create, read, update, and delete products
- Associate products with users
- Organize product updates

### Update Tracking
- Track product updates with statuses (IN_PROGRESS, SHIPPED, DEPRECATED)
- Add detailed update points to each update
- Manage update versions and assets

## API Endpoints

### Authentication
- `POST /signin` - User login
- `POST /user` - User registration

### Products
- `GET /api/product` - Get all products
- `GET /api/product/:id` - Get product by ID
- `POST /api/product` - Create new product
- `PUT /api/product/:id` - Update product
- `DELETE /api/product/:id` - Delete product

### Updates
- `GET /api/update` - Get all updates
- `GET /api/update/:id` - Get update by ID
- `POST /api/update` - Create new update
- `PUT /api/update/:id` - Update update
- `DELETE /api/update/:id` - Delete update

### Update Points
- `GET /api/updatepoint` - Get all update points
- `GET /api/updatepoint/:id` - Get update point by ID
- `POST /api/updatepoint` - Create new update point
- `PUT /api/updatepoint/:id` - Update update point
- `DELETE /api/updatepoint/:id` - Delete update point

## Testing

Run the test suite with:
```bash
npm test
```

## Production Deployment

1. **Build the application**
   ```bash
   npm run build
   ```
   This builds both the frontend and backend.

2. **Start the production server**
   ```bash
   npm start
   ```
   This runs the server from the compiled files in the dist directory.

### Docker Deployment

The project includes Docker support:
```bash
docker build -t features-website .
docker run -p 5000:5000 features-website
```

## License

This project is licensed under the ISC License.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.