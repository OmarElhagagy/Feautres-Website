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
        setError(err.message || 'Failed to load updates');
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
        setError(err.message || 'Failed to delete update');
      }
    }
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-red-500 text-center py-10">{error}</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Updates</h1>
        <Link to="/updates/new" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
          + Add Update
        </Link>
      </div>
      {updates.length > 0 ? (
        <UpdateList updates={updates} onDelete={handleDeleteUpdate} />
      ) : (
        <p className="text-gray-500">No updates found.</p>
      )}
    </div>
  );
}

export default Updates;
