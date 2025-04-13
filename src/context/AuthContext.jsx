import React, { createContext, useContext } from 'react';

// Create a context with mock values for authenticated user
export const AuthContext = createContext({
  user: { id: '1', username: 'demo-user' },
  token: 'mock-token',
  isAuthenticated: true,
  isLoading: false,
  error: null,
  login: async () => true,
  register: async () => true,
  logout: () => {},
});

// Simplified AuthProvider that always returns an authenticated user
export const AuthProvider = ({ children }) => {
  // Mock values
  const mockUser = { id: '1', username: 'demo-user' };
  const mockToken = 'mock-token';

  // Context value with mock data
  const contextValue = {
    user: mockUser,
    token: mockToken,
    isAuthenticated: true,
    isLoading: false,
    error: null,
    // No-op functions
    login: async () => true,
    register: async () => true,
    logout: () => {},
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
