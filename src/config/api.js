export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/api/auth/login',
    REGISTER: '/api/auth/register',
  },
  PRODUCTS: {
    BASE: '/api/products',
    BY_ID: (id) => `/api/products/${id}`,
  },
  UPDATES: {
    BASE: '/api/updates',
    BY_ID: (id) => `/api/updates/${id}`,
    POINTS: {
      BASE: (updateId) => `/api/updates/${updateId}/points`,
      BY_ID: (updateId, pointId) => `/api/updates/${updateId}/points/${pointId}`,
    },
  },
};

export const API_BASE_URL = process.env.VITE_API_BASE_URL || 'http://localhost:3000'; 