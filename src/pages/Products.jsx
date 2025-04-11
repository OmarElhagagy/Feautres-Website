import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api.js';
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
      const data = await api.getProducts();
      setProducts(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      if (err.message.includes('unauthorized')) {
        navigate('/login');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProduct = async (productData) => {
    try {
      await api.createProduct(productData);
      await fetchProducts();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await api.deleteProduct(id);
      await fetchProducts();
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Products</h1>
      <ProductForm onSubmit={handleCreateProduct} />
      <ProductList products={products} onDelete={handleDeleteProduct} />
    </div>
  );
}

export default Products;
