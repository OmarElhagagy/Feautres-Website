import { API_ENDPOINTS } from '../config/api.js';

const API_URL = 'http://localhost:5000'; // Using the proxy for all requests

export const fetchWithAuth = async (endpoint, options = {}) => {
  const token = localStorage.getItem('token');
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };
  
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  
  const response = await fetch(`${API_URL}${endpoint}`, {
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
        // Handle non-JSON error responses
        const text = await response.text();
        if (text.includes('<!DOCTYPE')) {
          throw new Error('Server returned HTML instead of JSON. Check your API endpoint configuration.');
        }
        throw new Error('Request failed: ' + text);
      }
    } catch (e) {
      throw e; // Re-throw the error
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
    const response = await fetch(API_ENDPOINTS.auth.login, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    return response.json();
  },
  
  register: async (userData) => {
    const response = await fetch(API_ENDPOINTS.auth.register, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    return response.json();
  },
  
  // Products
  getProducts: async () => {
    const response = await fetch(API_ENDPOINTS.products.list, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.json();
  },
  
  getProduct: async (id) => {
    const response = await fetch(API_ENDPOINTS.products.detail(id), {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.json();
  },
  
  createProduct: async (productData) => {
    const response = await fetch(API_ENDPOINTS.products.list, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(productData),
    });
    return response.json();
  },
  
  updateProduct: async (id, productData) => {
    const response = await fetch(API_ENDPOINTS.products.detail(id), {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(productData),
    });
    return response.json();
  },
  
  deleteProduct: async (id) => {
    const response = await fetch(API_ENDPOINTS.products.detail(id), {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.json();
  },
  
  // Updates
  getUpdates: async () => {
    const response = await fetch(API_ENDPOINTS.updates.list, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.json();
  },
  
  getUpdate: async (id) => {
    const response = await fetch(API_ENDPOINTS.updates.detail(id), {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.json();
  },
  
  createUpdate: async (updateData) => {
    const response = await fetch(API_ENDPOINTS.updates.list, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(updateData),
    });
    return response.json();
  },
  
  updateUpdate: async (id, updateData) => {
    const response = await fetch(API_ENDPOINTS.updates.detail(id), {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(updateData),
    });
    return response.json();
  },
  
  deleteUpdate: async (id) => {
    const response = await fetch(API_ENDPOINTS.updates.detail(id), {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.json();
  },
  
  // Update Points
  getUpdatePoints: () => fetchWithAuth('/api/updatepoint'),
  
  createUpdatePoint: (data) => fetchWithAuth('/api/updatepoint', {
    method: 'POST',
    body: JSON.stringify(data)
  }),
  
  updateUpdatePoint: (id, data) => fetchWithAuth(`/api/updatepoint/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data)
  }),
  
  deleteUpdatePoint: (id) => fetchWithAuth(`/api/updatepoint/${id}`, {
    method: 'DELETE'
  })
};

export default api;
