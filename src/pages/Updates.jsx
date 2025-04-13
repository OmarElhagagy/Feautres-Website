import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../utils/api';
import UpdateList from '../components/updates/UpdateList';

function Updates() {
  const [updates, setUpdates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUpdates = async () => {
      try {
        const response = await api.getUpdates();
        setUpdates(response.data || []);
        setError('');
      } catch (err) {
        console.error('Error fetching updates:', err);
        setError('Failed to load updates');
      } finally {
        setLoading(false);
      }
    };
    fetchUpdates();
  }, []);

  const handleDeleteUpdate = async (id) => {
    if (window.confirm('Are you sure you want to delete this update?')) {
      try {
        await api.deleteUpdate(id);
        setUpdates(updates.filter(update => update.id !== id));
      } catch (err) {
        console.error('Error deleting update:', err);
        setError('Failed to delete update');
      }
    }
  };

  if (loading) return <div className="text-center py-10">Loading updates...</div>;

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Updates</h1>
        <Link to="/updates/new" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
          + Add Update
        </Link>
      </div>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <div className="bg-white p-6 rounded shadow">
        {updates.length > 0 ? (
          <UpdateList updates={updates} onDelete={handleDeleteUpdate} />
        ) : (
          <p className="text-gray-500 text-center py-4">No updates found.</p>
        )}
      </div>
    </div>
  );
}

export default Updates;
