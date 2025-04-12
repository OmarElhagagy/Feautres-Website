import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import api from '../utils/api';

// Create a context with default values
export const AuthContext = createContext({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
  login: async () => {},
  register: async () => {},
  logout: () => {},
});

// Safe token parsing function
const parseJwt = (token) => {
  try {
    if (!token) return null;
    // Split the token and get the payload part
    const base64Url = token.split('.')[1];
    if (!base64Url) return null;
    
    // Replace URL-safe characters and convert to string
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    // Decode the base64 string and parse as JSON
    const jsonPayload = decodeURIComponent(
      window.atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Error parsing JWT token:', error);
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => {
    // Get token from localStorage on initialization
    return localStorage.getItem('token') || null;
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Extract user data from token
  const setUserFromToken = useCallback((token) => {
    try {
      if (!token) {
        setUser(null);
        return false;
      }
      
      const payload = parseJwt(token);
      if (!payload || !payload.id || !payload.username) {
        console.error('Invalid token payload:', payload);
        return false;
      }
      
      // Check token expiration
      if (payload.exp && payload.exp * 1000 < Date.now()) {
        console.warn('Token has expired');
        return false;
      }
      
      setUser({ id: payload.id, username: payload.username });
      return true;
    } catch (error) {
      console.error('Error processing token:', error);
      return false;
    }
  }, []);

  // Initialize authentication state on component mount
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        if (token) {
          const isValid = setUserFromToken(token);
          if (!isValid) {
            // Token is invalid, clear it
            logout();
          }
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        logout();
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, [token, setUserFromToken]);

  // Login function
  const login = async (credentials) => {
    try {
      setError(null);
      // Set loading state (optional)
      setIsLoading(true);
      
      const response = await api.login(credentials);
      if (!response || !response.token) {
        throw new Error('Invalid response from server');
      }
      
      const newToken = response.token;
      localStorage.setItem('token', newToken);
      setToken(newToken);
      
      const isValid = setUserFromToken(newToken);
      if (!isValid) {
        throw new Error('Invalid token received from server');
      }
      
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      setError(error.message || 'Login failed');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Register function
  const register = async (userData) => {
    try {
      setError(null);
      // Set loading state (optional)
      setIsLoading(true);
      
      const response = await api.register(userData);
      if (!response || !response.token) {
        throw new Error('Invalid response from server');
      }
      
      const newToken = response.token;
      localStorage.setItem('token', newToken);
      setToken(newToken);
      
      const isValid = setUserFromToken(newToken);
      if (!isValid) {
        throw new Error('Invalid token received from server');
      }
      
      return true;
    } catch (error) {
      console.error('Registration failed:', error);
      setError(error.message || 'Registration failed');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = useCallback(() => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    setError(null);
  }, []);

  // Calculate authentication state
  const isAuthenticated = !!token && !!user;

  // Create the context value object
  const contextValue = {
    user,
    token,
    isAuthenticated,
    isLoading,
    error,
    login,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
