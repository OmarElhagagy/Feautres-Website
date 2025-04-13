import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../utils/api';
import UpdatePointList from '../components/updatePoints/UpdatePointList';

function UpdateDetail() {
  const { id } = useParams();
  const [update, setUpdate] = useState(null);
  const [updatePoints, setUpdatePoints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Fetch update
        const updateResponse = await api.getUpdate(id);
        if (!updateResponse.data) {
          setError('Update not found');
          setLoading(false);
          return;
        }
        setUpdate(updateResponse.data);
        
        // Fetch update points for this update
        try {
          const pointsResponse = await api.getUpdatePoints(id);
          setUpdatePoints(pointsResponse.data || []);
        } catch (pointsErr) {
          console.error('Error fetching update points:', pointsErr);
          // Don't set error for points, just use empty array
          setUpdatePoints([]);
        }
        
        setError('');
      } catch (err) {
        console.error('Error fetching update:', err);
        setError(err.message || 'Failed to load update');
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
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
          {update.status ? update.status.replace('_', ' ') : 'PENDING'}
        </span>
      </div>
      <p className="text-gray-700 mb-6">{update.description || update.body || 'No description available'}</p>
      {update.updatedAt ? (
        <p className="text-sm text-gray-500 mb-8">Last updated: {new Date(update.updatedAt).toLocaleString()}</p>
      ) : (
        <p className="text-sm text-gray-500 mb-8">Version: {update.version || 'N/A'}</p>
      )}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Update Points</h2>
        <Link to={`/updates/${id}/points/new`} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
          + Add Update Point
        </Link>
      </div>
      {updatePoints.length > 0 ? (
        <UpdatePointList updatePoints={updatePoints} />
      ) : (
        <p className="text-gray-500">No update points yet.</p>
      )}
    </div>
  );
}

export default UpdateDetail;
