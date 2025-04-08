import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { api } from '../utils/api';
import UpdateForm from '../components/updates/UpdateForm';

function NewUpdate() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const productId = searchParams.get('productId');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.getProducts();
        setProducts(response.data || []);
      } catch (err) {
        setError(err.message || 'Failed to load products');
      }
    };
    fetchProducts();
  }, []);

  const handleSubmit = async (formData) => {
    try {
      await api.createUpdate(formData);
      navigate('/updates');
    } catch (err) {
      setError(err.message || 'Failed to create update');
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Create New Update</h1>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>
      )}
      <UpdateForm
        onSubmit={handleSubmit}
        initialData={{ productId: productId || '', title: '', description: '', status: 'IN_PROGRESS' }}
        products={products}
      />
    </div>
  );
}

export default NewUpdate;
