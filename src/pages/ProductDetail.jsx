import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../utils/api';
import UpdateList from '../components/updates/UpdateList';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.getProduct(id);
        setProduct(response.data);
        setError('');
      } catch (err) {
        setError(err.message || 'Failed to load product');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleDeleteUpdate = async (updateId) => {
    if (window.confirm('Are you sure you want to delete this update?')) {
      try {
        await api.deleteUpdate(updateId);
        setProduct({
          ...product,
          updates: product.updates.filter(update => update.id !== updateId),
        });
      } catch (err) {
        setError(err.message || 'Failed to delete update');
      }
    }
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-red-500 text-center py-10">{error}</div>;
  if (!product) return <div className="text-center py-10">Product not found</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">{product.name}</h1>
      <p className="text-gray-600 mb-8">Created on {new Date(product.createdAt).toLocaleDateString()}</p>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Updates</h2>
        <Link to={`/updates/new?productId=${id}`} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
          + Add Update
        </Link>
      </div>
      {product.updates.length > 0 ? (
        <UpdateList updates={product.updates} onDelete={handleDeleteUpdate} />
      ) : (
        <p className="text-gray-500">No updates yet.</p>
      )}
    </div>
  );
}

export default ProductDetail;
