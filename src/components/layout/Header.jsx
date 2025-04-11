import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function Header() {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  return (
    <header className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">Features Website</Link>
        
        <nav className="flex items-center space-x-6">
          <Link to="/" className="hover:text-blue-300">Home</Link>
          
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="hover:text-blue-300">Dashboard</Link>
              <Link to="/products" className="hover:text-blue-300">Products</Link>
              <Link to="/updates" className="hover:text-blue-300">Updates</Link>
              <div className="flex items-center ml-6">
                <span className="mr-4">Welcome, {user?.username || 'User'}</span>
                <button 
                  onClick={handleLogout}
                  className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <div className="flex space-x-4">
              <Link to="/login" className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded">Login</Link>
              <Link to="/register" className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded">Register</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
