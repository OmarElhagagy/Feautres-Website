import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../utils/api.js';
import ProductList from '../components/products/ProductList.jsx';
import ProductForm from '../components/products/ProductForm.jsx';

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await api.getProducts();
      setProducts(response.data || []);
      setError(null);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProduct = async (productData) => {
    try {
      await api.createProduct(productData);
      await fetchProducts();
    } catch (err) {
      setError('Failed to create product');
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await api.deleteProduct(id);
      await fetchProducts();
    } catch (err) {
      setError('Failed to delete product');
    }
  };

  if (loading) return <div className="text-center py-10">Loading products...</div>;
  
  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">Products</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <div className="bg-white p-6 rounded shadow mb-6">
        <h2 className="text-xl font-bold mb-4">Add New Product</h2>
        <ProductForm onSubmit={handleCreateProduct} />
      </div>
      
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-bold mb-4">Your Products</h2>
        <ProductList products={products} onDelete={handleDeleteProduct} />
      </div>
    </div>
  );
}

export default Products;
