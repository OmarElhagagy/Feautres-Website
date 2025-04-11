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
  login: (credentials) => {
    return fetch(`${API_URL}/signin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    })
    .then(res => {
      if (!res.ok) {
        return res.text().then(text => {
          try {
            // Try to parse as JSON first
            const error = JSON.parse(text);
            throw new Error(error.message || 'Login failed');
          } catch (e) {
            // If it's not JSON, it's likely HTML
            if (text.includes('<!DOCTYPE')) {
              throw new Error('Server returned HTML instead of JSON. Check your API endpoint configuration.');
            }
            throw new Error('Login failed: ' + text);
          }
        });
      }
      return res.json();
    });
  },
  
  register: (userData) => {
    console.log('Registering user with data:', userData);
    return fetch(`${API_URL}/user`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    })
    .then(res => {
        console.log('Registration response status:', res.status);
        console.log('Response headers:', Object.fromEntries([...res.headers.entries()]));
      if (!res.ok) {
        return res.text().then(text => {
          console.error('Error response body:', text); 
          try {
            // Try to parse as JSON first
            const error = JSON.parse(text);
            throw new Error(error.message || 'Registration failed');
          } catch (e) {
            // If it's not JSON, it's likely HTML
            if (text.includes('<!DOCTYPE')) {
              throw new Error('Server returned HTML instead of JSON. Check your API endpoint configuration.');
            }
            throw new Error('Registration failed: ' + text);
          }
        });
      }
      return res.json();
    });
  },
  
  // Products
  getProducts: () => fetchWithAuth('/api/product'),
  
  getProduct: (id) => fetchWithAuth(`/api/product/${id}`),
  
  createProduct: (productData) => fetchWithAuth('/api/product', {
    method: 'POST',
    body: JSON.stringify(productData)
  }),
  
  updateProduct: (id, productData) => fetchWithAuth(`/api/product/${id}`, {
    method: 'PUT',
    body: JSON.stringify(productData)
  }),
  
  deleteProduct: (id) => fetchWithAuth(`/api/product/${id}`, {
    method: 'DELETE'
  }),
  
  // Updates
  getUpdates: () => fetchWithAuth('/api/update'),
  
  getUpdate: (id) => fetchWithAuth(`/api/update/${id}`),
  
  createUpdate: (updateData) => fetchWithAuth('/api/update', {
    method: 'POST',
    body: JSON.stringify(updateData)
  }),
  
  updateUpdate: (id, updateData) => fetchWithAuth(`/api/update/${id}`, {
    method: 'PUT',
    body: JSON.stringify(updateData)
  }),
  
  deleteUpdate: (id) => fetchWithAuth(`/api/update/${id}`, {
    method: 'DELETE'
  }),
  
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
