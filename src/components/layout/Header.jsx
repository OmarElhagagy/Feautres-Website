import { Link } from 'react-router-dom';

function Header() {  
  return (
    <header className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">Features Website</Link>
        
        <nav className="flex items-center space-x-6">
          <Link to="/dashboard" className="hover:text-blue-300">Dashboard</Link>
          <Link to="/products" className="hover:text-blue-300">Products</Link>
          <Link to="/updates" className="hover:text-blue-300">Updates</Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
