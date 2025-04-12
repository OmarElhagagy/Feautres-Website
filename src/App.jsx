import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ErrorBoundary from './components/layout/ErrorBoundary.jsx';
import Layout from './components/layout/Layout.jsx';
import Home from './pages/Home.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Products from './pages/Products.jsx';
import ProductDetail from './pages/ProductDetail.jsx';
import Updates from './pages/Updates.jsx';
import UpdateDetail from './pages/UpdateDetail.jsx';
import NewUpdate from './pages/NewUpdate.jsx';
import NewUpdatePoint from './pages/NewUpdatePoint.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import { AuthProvider, useAuth } from './context/AuthContext.jsx';

// We need to create a separate component for routes that use authentication
// to make sure hooks are only used within components
const AuthenticatedRoutes = () => {
  const { isAuthenticated } = useAuth();
  
  // Route guard components
  const PrivateRoute = ({ children }) => {
    return isAuthenticated ? children : <Navigate to="/login" />;
  };

  const PublicRoute = ({ children }) => {
    return !isAuthenticated ? children : <Navigate to="/dashboard" />;
  };
  
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={
        <PublicRoute>
          <Login />
        </PublicRoute>
      } />
      <Route path="/register" element={
        <PublicRoute>
          <Register />
        </PublicRoute>
      } />

      {/* Protected Routes */}
      <Route path="/" element={
        <PrivateRoute>
          <Layout />
        </PrivateRoute>
      }>
        <Route index element={<Home />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="products">
          <Route index element={<Products />} />
          <Route path=":id" element={<ProductDetail />} />
        </Route>
        <Route path="updates">
          <Route index element={<Updates />} />
          <Route path=":id" element={<UpdateDetail />} />
          <Route path="new" element={<NewUpdate />} />
          <Route path=":updateId/points/new" element={<NewUpdatePoint />} />
        </Route>
      </Route>

      {/* Catch all route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <Router>
          <AuthenticatedRoutes />
        </Router>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
