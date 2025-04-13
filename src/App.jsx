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
import { AuthProvider } from './context/AuthContext.jsx';

// Main application component
function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <Router>
          <Routes>
            {/* Send all requests to the main layout */}
            <Route path="/" element={<Layout />}>
              {/* Redirect root to dashboard */}
              <Route index element={<Navigate to="/dashboard" replace />} />
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
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
