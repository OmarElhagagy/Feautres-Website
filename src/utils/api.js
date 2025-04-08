const API_URL = 'http://localhost:4000';

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
    const error = await response.json();
    throw new Error(error.message || 'Something went wrong');
  }
  
  return response.json();
};

// API Functions
export const api = {
  // Auth
  login: (credentials) => {
    return fetch(`${API_URL}/sigin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    }).then(res => res.json());
  },
  
  register: (userData) => {
    return fetch(`${API_URL}/user`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    }).then(res => res.json());
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
