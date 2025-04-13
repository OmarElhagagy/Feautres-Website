import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../utils/api';
import UpdateList from '../components/updates/UpdateList';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [updates, setUpdates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Fetch product
        const productResponse = await api.getProduct(id);
        if (!productResponse.data) {
          setError('Product not found');
          return;
        }
        setProduct(productResponse.data);
        
        // Fetch updates for this product
        try {
          const updatesResponse = await api.getUpdates();
          // Filter updates for this product if possible
          const productUpdates = updatesResponse.data.filter(update => 
            update.productId === id
          );
          setUpdates(productUpdates || []);
        } catch (updateErr) {
          console.error('Error fetching updates:', updateErr);
          // Don't set error for updates, just use empty array
          setUpdates([]);
        }
        
        setError('');
      } catch (err) {
        console.error('Error fetching product:', err);
        setError(err.message || 'Failed to load product');
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [id]);

  const handleDeleteUpdate = async (updateId) => {
    if (window.confirm('Are you sure you want to delete this update?')) {
      try {
        await api.deleteUpdate(updateId);
        setUpdates(updates.filter(update => update.id !== updateId));
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
      {product.createdAt ? (
        <p className="text-gray-600 mb-8">Created on {new Date(product.createdAt).toLocaleDateString()}</p>
      ) : (
        <p className="text-gray-600 mb-8">Version: {product.version || 'N/A'}</p>
      )}
      
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Updates</h2>
        <Link to={`/updates/new?productId=${id}`} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
          + Add Update
        </Link>
      </div>
      
      {updates.length > 0 ? (
        <UpdateList updates={updates} onDelete={handleDeleteUpdate} />
      ) : (
        <p className="text-gray-500">No updates yet.</p>
      )}
    </div>
  );
}

export default ProductDetail;
