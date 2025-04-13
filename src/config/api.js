/**
 * API Endpoint configuration
 * These are the paths used for various API operations
 */
export const API_ENDPOINTS = {
  auth: {
    login: '/api/auth/login',
    register: '/api/auth/register',
    status: '/api/auth/status'
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

/**
 * Determine the base URL for API requests
 * In browser context: use the current origin (same domain to avoid CORS issues)
 * In server/build context: use the environment variable or default localhost:5000
 */
export const API_BASE_URL = typeof window !== 'undefined' && window.location ? 
  window.location.origin : 
  (process.env.VITE_API_BASE_URL || 'http://localhost:5000'); 