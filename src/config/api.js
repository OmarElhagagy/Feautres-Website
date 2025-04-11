export const API_ENDPOINTS = {
  auth: {
    login: '/api/auth/login',
    register: '/api/auth/register',
  },
  products: {
    base: '/api/products',
    byId: (id) => `/api/products/${id}`,
  },
  updates: {
    base: '/api/updates',
    byId: (id) => `/api/updates/${id}`,
    points: {
      base: (updateId) => `/api/updates/${updateId}/points`,
      byId: (updateId, pointId) => `/api/updates/${updateId}/points/${pointId}`,
    },
  },
};

export const API_BASE_URL = process.env.VITE_API_BASE_URL || 'http://localhost:3000'; 