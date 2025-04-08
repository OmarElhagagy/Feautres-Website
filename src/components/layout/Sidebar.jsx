import { Link } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../../context/AuthContext';

function Sidebar() {
  const { user } = useContext(AuthContext);

  return (
    <aside className="w-64 bg-gray-100 p-4 h-full">
      <nav className="space-y-4">
        <Link to="/" className="block text-gray-700 hover:text-blue-500">Home</Link>
        {user && (
          <>
            <Link to="/dashboard" className="block text-gray-700 hover:text-blue-500">Dashboard</Link>
            <Link to="/products" className="block text-gray-700 hover:text-blue-500">Products</Link>
            <Link to="/updates" className="block text-gray-700 hover:text-blue-500">Updates</Link>
          </>
        )}
      </nav>
    </aside>
  );
}

export default Sidebar;
