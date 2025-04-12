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

// Use window.location.origin to get the current host dynamically,
// or fallback to localhost:5000 if not available (e.g., in Node.js environment)
export const API_BASE_URL = typeof window !== 'undefined' ? 
  window.location.origin : 
  (process.env.VITE_API_BASE_URL || 'http://localhost:5000'); 