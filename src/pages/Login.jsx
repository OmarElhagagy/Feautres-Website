import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { api } from '../utils/api';
import LoginForm from '../components/auth/LoginForm';

function Login() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    setLoading(true);
    setError('');
    try {
      const response = await api.login(formData);
      if (response.token) {
        login(response.token);
        navigate('/dashboard');
      } else {
        setError('Login failed');
      }
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-6">Login</h1>
      <LoginForm onSubmit={handleSubmit} error={error} loading={loading} />
    </div>
  );
}

export default Login;
