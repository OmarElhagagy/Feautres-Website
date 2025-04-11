import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../utils/api';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const setUserFromToken = (token) => {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      setUser({ id: payload.id, username: payload.username });
    } catch (error) {
      console.error('Invalid token:', error);
      setError('Invalid authentication token');
      logout();
    }
  };

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        if (token) {
          setUserFromToken(token);
        }
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, [token]);

  const login = async (credentials) => {
    try {
      setError(null);
      const response = await api.login(credentials);
      const newToken = response.token;
      localStorage.setItem('token', newToken);
      setToken(newToken);
      setUserFromToken(newToken);
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      setError(error.message || 'Login failed');
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      setError(null);
      const response = await api.register(userData);
      const newToken = response.token;
      localStorage.setItem('token', newToken);
      setToken(newToken);
      setUserFromToken(newToken);
      return true;
    } catch (error) {
      console.error('Registration failed:', error);
      setError(error.message || 'Registration failed');
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    setError(null);
  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
        isLoading,
        error,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
