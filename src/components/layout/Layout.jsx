import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation, Navigate } from 'react-router-dom';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import LoadingSpinner from './LoadingSpinner.jsx';

const Layout = () => {
  const { logout, isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? 'bg-gray-900' : '';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-800 text-white p-4">
          <nav className="space-y-2">
            <Link
              to="/dashboard"
              className={`block px-4 py-2 rounded hover:bg-gray-700 ${isActive('/dashboard')}`}
            >
              Dashboard
            </Link>
            <Link
              to="/products"
              className={`block px-4 py-2 rounded hover:bg-gray-700 ${isActive('/products')}`}
            >
              Products
            </Link>
            <Link
              to="/updates"
              className={`block px-4 py-2 rounded hover:bg-gray-700 ${isActive('/updates')}`}
            >
              Updates
            </Link>
            <button
              onClick={logout}
              className="w-full mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Logout
            </button>
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 container mx-auto px-4 py-8">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout; 