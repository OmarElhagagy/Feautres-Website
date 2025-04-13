import { API_ENDPOINTS } from '../config/api.js';

// Mock data for development
const MOCK_DATA = {
  products: [
    { id: '1', name: 'Product 1', description: 'Description for product 1', version: '1.0.0' },
    { id: '2', name: 'Product 2', description: 'Description for product 2', version: '2.0.0' },
    { id: '3', name: 'Product 3', description: 'Description for product 3', version: '1.5.0' },
  ],
  updates: [
    { 
      id: '1', 
      title: 'Update 1 for Product 1', 
      body: 'Details about update 1', 
      version: '1.1.0',
      productId: '1' 
    },
    { 
      id: '2', 
      title: 'Update 2 for Product 1', 
      body: 'Details about update 2', 
      version: '1.2.0',
      productId: '1' 
    },
    { 
      id: '3', 
      title: 'Update 1 for Product 2', 
      body: 'Details about update 1 for product 2', 
      version: '2.1.0',
      productId: '2' 
    },
  ],
  updatePoints: [
    { id: '1', title: 'Point 1', description: 'Description for point 1', updateId: '1' },
    { id: '2', title: 'Point 2', description: 'Description for point 2', updateId: '1' },
    { id: '3', title: 'Point 3', description: 'Description for point 3', updateId: '2' },
  ]
};

/**
 * Mock API client that returns predefined data
 */
export const api = {
  // Auth - not used but kept for compatibility
  login: async () => ({ token: 'mock-token' }),
  register: async () => ({ token: 'mock-token' }),
  
  // Products
  getProducts: async () => {
    console.log('Fetching products (mock)');
    return { data: MOCK_DATA.products };
  },
  
  getProduct: async (id) => {
    console.log(`Fetching product: ${id} (mock)`);
    const product = MOCK_DATA.products.find(p => p.id === id);
    return { data: product || null };
  },
  
  createProduct: async (productData) => {
    console.log('Creating product (mock):', productData);
    const newProduct = {
      id: String(Date.now()),
      ...productData,
    };
    MOCK_DATA.products.push(newProduct);
    return { data: newProduct };
  },
  
  updateProduct: async (id, productData) => {
    console.log(`Updating product: ${id} (mock)`, productData);
    const index = MOCK_DATA.products.findIndex(p => p.id === id);
    if (index >= 0) {
      MOCK_DATA.products[index] = { ...MOCK_DATA.products[index], ...productData };
      return { data: MOCK_DATA.products[index] };
    }
    return { error: 'Product not found' };
  },
  
  deleteProduct: async (id) => {
    console.log(`Deleting product: ${id} (mock)`);
    const index = MOCK_DATA.products.findIndex(p => p.id === id);
    if (index >= 0) {
      MOCK_DATA.products.splice(index, 1);
      return { success: true };
    }
    return { error: 'Product not found' };
  },
  
  // Updates
  getUpdates: async () => {
    console.log('Fetching updates (mock)');
    return { data: MOCK_DATA.updates };
  },
  
  getUpdate: async (id) => {
    console.log(`Fetching update: ${id} (mock)`);
    const update = MOCK_DATA.updates.find(u => u.id === id);
    return { data: update || null };
  },
  
  createUpdate: async (updateData) => {
    console.log('Creating update (mock):', updateData);
    const newUpdate = {
      id: String(Date.now()),
      ...updateData,
    };
    MOCK_DATA.updates.push(newUpdate);
    return { data: newUpdate };
  },
  
  updateUpdate: async (id, updateData) => {
    console.log(`Updating update: ${id} (mock)`, updateData);
    const index = MOCK_DATA.updates.findIndex(u => u.id === id);
    if (index >= 0) {
      MOCK_DATA.updates[index] = { ...MOCK_DATA.updates[index], ...updateData };
      return { data: MOCK_DATA.updates[index] };
    }
    return { error: 'Update not found' };
  },
  
  deleteUpdate: async (id) => {
    console.log(`Deleting update: ${id} (mock)`);
    const index = MOCK_DATA.updates.findIndex(u => u.id === id);
    if (index >= 0) {
      MOCK_DATA.updates.splice(index, 1);
      return { success: true };
    }
    return { error: 'Update not found' };
  },
  
  // Update Points
  getUpdatePoints: async (updateId) => {
    console.log(`Fetching update points for update: ${updateId} (mock)`);
    const points = MOCK_DATA.updatePoints.filter(p => p.updateId === updateId);
    return { data: points };
  },
  
  createUpdatePoint: async (updateId, data) => {
    console.log(`Creating update point for update: ${updateId} (mock)`, data);
    const newPoint = {
      id: String(Date.now()),
      updateId,
      ...data,
    };
    MOCK_DATA.updatePoints.push(newPoint);
    return { data: newPoint };
  },
  
  updateUpdatePoint: async (updateId, pointId, data) => {
    console.log(`Updating update point: ${pointId} for update: ${updateId} (mock)`, data);
    const index = MOCK_DATA.updatePoints.findIndex(p => p.id === pointId && p.updateId === updateId);
    if (index >= 0) {
      MOCK_DATA.updatePoints[index] = { ...MOCK_DATA.updatePoints[index], ...data };
      return { data: MOCK_DATA.updatePoints[index] };
    }
    return { error: 'Update point not found' };
  },
  
  deleteUpdatePoint: async (updateId, pointId) => {
    console.log(`Deleting update point: ${pointId} for update: ${updateId} (mock)`);
    const index = MOCK_DATA.updatePoints.findIndex(p => p.id === pointId && p.updateId === updateId);
    if (index >= 0) {
      MOCK_DATA.updatePoints.splice(index, 1);
      return { success: true };
    }
    return { error: 'Update point not found' };
  }
};

export default api;
