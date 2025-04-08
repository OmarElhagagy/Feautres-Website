import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { api } from '../utils/api';
import RegisterForm from '../components/auth/RegisterForm';

function Register() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    setLoading(true);
    setError('');
    try {
      const response = await api.register(formData);
      if (response.token) {
        login(response.token);
        navigate('/dashboard');
      } else {
        setError('Registration failed');
      }
    } catch (err) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-6">Register</h1>
      <RegisterForm onSubmit={handleSubmit} error={error} loading={loading} />
    </div>
  );
}

export default Register;
