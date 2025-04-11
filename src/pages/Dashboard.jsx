import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { api } from '../utils/api';

function Dashboard() {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [updates, setUpdates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsRes = await api.getProducts();
        setProducts(productsRes.data || []);
        
        const updatesRes = await api.getUpdates();
        setUpdates(updatesRes.data || []);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('Failed to load dashboard data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  if (loading) {
    return <div className="text-center py-10">Loading dashboard...</div>;
  }
  
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded shadow">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Your Products</h2>
            <Link 
              to="/products"
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
              View All
            </Link>
          </div>
          
          {products.length > 0 ? (
            <ul className="divide-y">
              {products.slice(0, 5).map(product => (
                <li key={product.id} className="py-3">
                  <Link 
                    to={`/products/${product.id}`}
                    className="block hover:bg-gray-50 rounded p-2"
                  >
                    <div className="font-medium">{product.name}</div>
                    <div className="text-sm text-gray-500">
                      {product.updates.length} updates
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No products yet. Create your first product!</p>
          )}
          
          <Link 
            to="/products"
            className="block text-blue-500 mt-4 hover:underline"
          >
            + Add new product
          </Link>
        </div>
        
        <div className="bg-white p-6 rounded shadow">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Recent Updates</h2>
            <Link 
              to="/updates"
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
              View All
            </Link>
          </div>
          
          {updates.length > 0 ? (
            <ul className="divide-y">
              {updates.slice(0, 5).map(update => (
                <li key={update.id} className="py-3">
                  <Link 
                    to={`/updates/${update.id}`}
                    className="block hover:bg-gray-50 rounded p-2"
                  >
                    <div className="font-medium">{update.title}</div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">
                        {new Date(update.updatedAt).toLocaleDateString()}
                      </span>
                      <span className={`
                        px-2 rounded-full text-xs
                        ${update.status === 'SHIPPED' ? 'bg-green-100 text-green-800' : 
                          update.status === 'IN_PROGRESS' ? 'bg-yellow-100 text-yellow-800' : 
                          'bg-gray-100 text-gray-800'}
                      `}>
                        {update.status.replace('_', ' ')}
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No updates yet.</p>
          )}
          
          <Link 
            to="/updates"
            className="block text-blue-500 mt-4 hover:underline"
          >
            + Add new update
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
