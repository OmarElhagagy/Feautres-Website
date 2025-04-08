import { useState, useEffect } from 'react';
import { api } from '../utils/api';
import ProductList from '../components/products/ProductList';
import ProductForm from '../components/products/ProductForm';

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.getProducts();
        setProducts(response.data || []);
        setError('');
      } catch (err) {
        setError(err.message || 'Failed to load products');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleCreateProduct = async (formData) => {
    try {
      await api.createProduct(formData);
      setShowForm(false);
      const response = await api.getProducts();
      setProducts(response.data || []);
    } catch (err) {
      setError(err.message || 'Failed to create product');
    }
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await api.deleteProduct(id);
        setProducts(products.filter(product => product.id !== id));
      } catch (err) {
        setError(err.message || 'Failed to delete product');
      }
    }
  };

  if (loading && products.length === 0) return <div className="text-center py-10">Loading...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Your Products</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          {showForm ? 'Cancel' : '+ Add Product'}
        </button>
      </div>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>
      )}
      {showForm && <ProductForm onSubmit={handleCreateProduct} />}
      {products.length > 0 ? (
        <ProductList products={products} onDelete={handleDeleteProduct} />
      ) : (
        <p className="text-gray-500">No products yet.</p>
      )}
    </div>
  );
}

export default Products;
