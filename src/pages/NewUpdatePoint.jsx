import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../utils/api';
import UpdatePointForm from '../components/updatePoints/UpdatePointForm';

function NewUpdatePoint() {
  const { updateId } = useParams();
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    try {
      await api.createUpdatePoint({ ...formData, updateId });
      navigate(`/updates/${updateId}`);
    } catch (err) {
      setError(err.message || 'Failed to create update point');
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Create New Update Point</h1>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>
      )}
      <UpdatePointForm onSubmit={handleSubmit} />
    </div>
  );
}

export default NewUpdatePoint;
