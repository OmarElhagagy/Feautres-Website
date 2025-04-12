import { API_ENDPOINTS, API_BASE_URL } from '../config/api.js';

/**
 * Handle API response and extract data or error
 * @param {Response} response - Fetch API response
 * @returns {Promise<any>} - Parsed response data
 * @throws {Error} - Throws error with message from response
 */
const handleResponse = async (response) => {
  // If we get an error status code
  if (!response.ok) {
    let errorMessage = `Request failed with status ${response.status}`;
    
    try {
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        // Try to parse JSON error
        const error = await response.json();
        errorMessage = error.message || errorMessage;
      } else {
        // Try to get error text
        const text = await response.text();
        if (text) {
          if (text.includes('<!DOCTYPE')) {
            errorMessage = 'Server returned HTML instead of JSON. Check your API endpoint configuration.';
          } else {
            errorMessage = text;
          }
        }
      }
    } catch (parseError) {
      console.error('Error parsing error response:', parseError);
    }
    
    const error = new Error(errorMessage);
    error.status = response.status;
    error.statusText = response.statusText;
    throw error;
  }
  
  // Parse success response
  try {
    // Handle empty responses (like for DELETE operations)
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return await response.json();
    }
    return { success: true };
  } catch (error) {
    console.error('Error parsing JSON response:', error);
    throw new Error('Invalid JSON response from server');
  }
};

/**
 * Make authenticated API request
 * @param {string} endpoint - API endpoint
 * @param {object} options - Fetch options
 * @returns {Promise<any>} - Response data
 */
const fetchWithAuth = async (endpoint, options = {}) => {
  // Build request headers
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };
  
  // Add auth token if available
  const token = localStorage.getItem('token');
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  
  // Build full URL
  const url = `${API_BASE_URL}${endpoint}`;
  
  try {
    console.log(`Fetching ${url}`);
    const response = await fetch(url, {
      ...options,
      headers
    });
    
    return handleResponse(response);
  } catch (error) {
    console.error(`API error for ${endpoint}:`, error);
    // Add request info to error
    error.endpoint = endpoint;
    error.url = url;
    throw error;
  }
};

/**
 * Make unauthenticated API request
 * @param {string} endpoint - API endpoint
 * @param {object} options - Fetch options
 * @returns {Promise<any>} - Response data
 */
const fetchWithoutAuth = async (endpoint, options = {}) => {
  // Build request headers
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };
  
  // Build full URL
  const url = `${API_BASE_URL}${endpoint}`;
  
  try {
    console.log(`Fetching (unauthenticated) ${url}`);
    const response = await fetch(url, {
      ...options,
      headers
    });
    
    return handleResponse(response);
  } catch (error) {
    console.error(`API error for ${endpoint}:`, error);
    // Add request info to error
    error.endpoint = endpoint;
    error.url = url;
    throw error;
  }
};

/**
 * API client with authentication handling
 */
export const api = {
  // Auth
  login: async (credentials) => {
    console.log('Login attempt for:', credentials.username);
    try {
      return await fetchWithoutAuth(API_ENDPOINTS.auth.login, {
        method: 'POST',
        body: JSON.stringify(credentials),
      });
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },
  
  register: async (userData) => {
    console.log('Register attempt for:', userData.username);
    try {
      return await fetchWithoutAuth(API_ENDPOINTS.auth.register, {
        method: 'POST',
        body: JSON.stringify(userData),
      });
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  },
  
  // Products
  getProducts: async () => {
    console.log('Fetching products');
    return fetchWithAuth(API_ENDPOINTS.products.base);
  },
  
  getProduct: async (id) => {
    console.log(`Fetching product: ${id}`);
    return fetchWithAuth(API_ENDPOINTS.products.byId(id));
  },
  
  createProduct: async (productData) => {
    console.log('Creating product:', productData);
    return fetchWithAuth(API_ENDPOINTS.products.base, {
      method: 'POST',
      body: JSON.stringify(productData),
    });
  },
  
  updateProduct: async (id, productData) => {
    console.log(`Updating product: ${id}`, productData);
    return fetchWithAuth(API_ENDPOINTS.products.byId(id), {
      method: 'PUT',
      body: JSON.stringify(productData),
    });
  },
  
  deleteProduct: async (id) => {
    console.log(`Deleting product: ${id}`);
    return fetchWithAuth(API_ENDPOINTS.products.byId(id), {
      method: 'DELETE',
    });
  },
  
  // Updates
  getUpdates: async () => {
    console.log('Fetching updates');
    return fetchWithAuth(API_ENDPOINTS.updates.base);
  },
  
  getUpdate: async (id) => {
    console.log(`Fetching update: ${id}`);
    return fetchWithAuth(API_ENDPOINTS.updates.byId(id));
  },
  
  createUpdate: async (updateData) => {
    console.log('Creating update:', updateData);
    return fetchWithAuth(API_ENDPOINTS.updates.base, {
      method: 'POST',
      body: JSON.stringify(updateData),
    });
  },
  
  updateUpdate: async (id, updateData) => {
    console.log(`Updating update: ${id}`, updateData);
    return fetchWithAuth(API_ENDPOINTS.updates.byId(id), {
      method: 'PUT',
      body: JSON.stringify(updateData),
    });
  },
  
  deleteUpdate: async (id) => {
    console.log(`Deleting update: ${id}`);
    return fetchWithAuth(API_ENDPOINTS.updates.byId(id), {
      method: 'DELETE',
    });
  },
  
  // Update Points
  getUpdatePoints: async (updateId) => {
    console.log(`Fetching update points for update: ${updateId}`);
    return fetchWithAuth(API_ENDPOINTS.updates.points.base(updateId));
  },
  
  createUpdatePoint: async (updateId, data) => {
    console.log(`Creating update point for update: ${updateId}`, data);
    return fetchWithAuth(API_ENDPOINTS.updates.points.base(updateId), {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
  
  updateUpdatePoint: async (updateId, pointId, data) => {
    console.log(`Updating update point: ${pointId} for update: ${updateId}`, data);
    return fetchWithAuth(API_ENDPOINTS.updates.points.byId(updateId, pointId), {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },
  
  deleteUpdatePoint: async (updateId, pointId) => {
    console.log(`Deleting update point: ${pointId} for update: ${updateId}`);
    return fetchWithAuth(API_ENDPOINTS.updates.points.byId(updateId, pointId), {
      method: 'DELETE',
    });
  }
};

export default api;
