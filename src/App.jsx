import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
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
import { AuthProvider } from './context/AuthContext.jsx';

// Simple components that don't use hooks themselves
const PrivateRouteWrapper = ({ children, isAuthenticated }) => {
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const PublicRouteWrapper = ({ children, isAuthenticated }) => {
  return !isAuthenticated ? children : <Navigate to="/dashboard" />;
};

// Components that use hooks
const PrivateRoute = ({ children }) => {
  // Only import useAuth here inside a component
  const { useAuth } = require('./context/AuthContext.jsx');
  const { isAuthenticated } = useAuth();
  return <PrivateRouteWrapper isAuthenticated={isAuthenticated}>{children}</PrivateRouteWrapper>;
};

const PublicRoute = ({ children }) => {
  // Only import useAuth here inside a component
  const { useAuth } = require('./context/AuthContext.jsx');
  const { isAuthenticated } = useAuth();
  return <PublicRouteWrapper isAuthenticated={isAuthenticated}>{children}</PublicRouteWrapper>;
};

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <Router>
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
        </Router>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
