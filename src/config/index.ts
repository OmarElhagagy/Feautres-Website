import merge from 'lodash.merge';

// Ensure NODE_ENV is set
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const stage = process.env.STAGE || 'local';

// Import environment-specific configs dynamically
let envConfig: Record<string, any>;

if (stage === 'production') {
  envConfig = (await import('../config/production.js')).default;
} else if (stage === 'testing') {
  envConfig = (await import('../config/testing.js')).default;
} else {
  envConfig = (await import('../config/local.js')).default;
}

// Default configuration
const defaultConfig = {
  stage,
  dbURL: process.env.DATABASE_URL,
  jwtSecret: process.env.JWT_SECRET,
  port: 4000,
  logging: false,
};

// Merge default and environment-specific configs
export default merge(defaultConfig, envConfig);
