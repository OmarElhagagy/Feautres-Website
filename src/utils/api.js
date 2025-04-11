import { API_ENDPOINTS, API_BASE_URL } from '../config/api.js';

const fetchWithAuth = async (endpoint, options = {}) => {
  const token = localStorage.getItem('token');
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };
  
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers
  });
  
  if (!response.ok) {
    try {
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const error = await response.json();
        throw new Error(error.message || 'Something went wrong');
      } else {
        const text = await response.text();
        if (text.includes('<!DOCTYPE')) {
          throw new Error('Server returned HTML instead of JSON. Check your API endpoint configuration.');
        }
        throw new Error('Request failed: ' + text);
      }
    } catch (e) {
      throw e;
    }
  }
  
  try {
    return await response.json();
  } catch (e) {
    throw new Error('Invalid JSON response from server');
  }
};

// API Functions
export const api = {
  // Auth
  login: async (credentials) => {
    return fetchWithAuth(API_ENDPOINTS.auth.login, {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },
  
  register: async (userData) => {
    return fetchWithAuth(API_ENDPOINTS.auth.register, {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },
  
  // Products
  getProducts: async () => {
    return fetchWithAuth(API_ENDPOINTS.products.base);
  },
  
  getProduct: async (id) => {
    return fetchWithAuth(API_ENDPOINTS.products.byId(id));
  },
  
  createProduct: async (productData) => {
    return fetchWithAuth(API_ENDPOINTS.products.base, {
      method: 'POST',
      body: JSON.stringify(productData),
    });
  },
  
  updateProduct: async (id, productData) => {
    return fetchWithAuth(API_ENDPOINTS.products.byId(id), {
      method: 'PUT',
      body: JSON.stringify(productData),
    });
  },
  
  deleteProduct: async (id) => {
    return fetchWithAuth(API_ENDPOINTS.products.byId(id), {
      method: 'DELETE',
    });
  },
  
  // Updates
  getUpdates: async () => {
    return fetchWithAuth(API_ENDPOINTS.updates.base);
  },
  
  getUpdate: async (id) => {
    return fetchWithAuth(API_ENDPOINTS.updates.byId(id));
  },
  
  createUpdate: async (updateData) => {
    return fetchWithAuth(API_ENDPOINTS.updates.base, {
      method: 'POST',
      body: JSON.stringify(updateData),
    });
  },
  
  updateUpdate: async (id, updateData) => {
    return fetchWithAuth(API_ENDPOINTS.updates.byId(id), {
      method: 'PUT',
      body: JSON.stringify(updateData),
    });
  },
  
  deleteUpdate: async (id) => {
    return fetchWithAuth(API_ENDPOINTS.updates.byId(id), {
      method: 'DELETE',
    });
  },
  
  // Update Points
  getUpdatePoints: async (updateId) => {
    return fetchWithAuth(API_ENDPOINTS.updates.points.base(updateId));
  },
  
  createUpdatePoint: async (updateId, data) => {
    return fetchWithAuth(API_ENDPOINTS.updates.points.base(updateId), {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
  
  updateUpdatePoint: async (updateId, pointId, data) => {
    return fetchWithAuth(API_ENDPOINTS.updates.points.byId(updateId, pointId), {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },
  
  deleteUpdatePoint: async (updateId, pointId) => {
    return fetchWithAuth(API_ENDPOINTS.updates.points.byId(updateId, pointId), {
      method: 'DELETE',
    });
  }
};

export default api;
