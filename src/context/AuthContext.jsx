import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../utils/api';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const parseToken = (token) => {
    try {
      if (!token) return null;
      // Split the token and get the payload part
      const base64Url = token.split('.')[1];
      // Replace URL-safe characters and convert to string
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      // Decode the base64 string and parse as JSON
      const payload = JSON.parse(window.atob(base64));
      
      // Check if token is expired
      if (payload.exp && payload.exp * 1000 < Date.now()) {
        console.warn('Token has expired');
        return null;
      }
      
      return payload;
    } catch (error) {
      console.error('Error parsing token:', error);
      return null;
    }
  };

  const setUserFromToken = (token) => {
    try {
      if (!token) {
        setUser(null);
        return;
      }
      
      const payload = parseToken(token);
      if (!payload) {
        logout();
        setError('Invalid or expired token');
        return;
      }
      
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
      if (!response || !response.token) {
        throw new Error('Invalid response from server');
      }
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
      if (!response || !response.token) {
        throw new Error('Invalid response from server');
      }
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

  const isAuthenticated = !!token && !!user;

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
