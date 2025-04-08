import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../utils/api';
import UpdatePointList from '../components/updatePoints/UpdatePointList';

function UpdateDetail() {
  const { id } = useParams();
  const [update, setUpdate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUpdate = async () => {
      try {
        const response = await api.getUpdate(id);
        setUpdate(response.data);
        setError('');
      } catch (err) {
        setError(err.message || 'Failed to load update');
      } finally {
        setLoading(false);
      }
    };
    fetchUpdate();
  }, [id]);

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-red-500 text-center py-10">{error}</div>;
  if (!update) return <div className="text-center py-10">Update not found</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">{update.title}</h1>
      <div className="mb-4">
        <span
          className={`px-3 py-1 rounded-full text-sm ${
            update.status === 'SHIPPED' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
          }`}
        >
          {update.status.replace('_', ' ')}
        </span>
      </div>
      <p className="text-gray-700 mb-6">{update.description}</p>
      <p className="text-sm text-gray-500 mb-8">Last updated: {new Date(update.updatedAt).toLocaleString()}</p>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Update Points</h2>
        <Link to={`/updates/${id}/points/new`} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
          + Add Update Point
        </Link>
      </div>
      {update.updatePoints && update.updatePoints.length > 0 ? (
        <UpdatePointList updatePoints={update.updatePoints} />
      ) : (
        <p className="text-gray-500">No update points yet.</p>
      )}
    </div>
  );
}

export default UpdateDetail;
