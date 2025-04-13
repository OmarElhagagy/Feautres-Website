import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import Header from './Header.jsx';
import Footer from './Footer.jsx';

const Layout = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? 'bg-gray-900' : '';
  };

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