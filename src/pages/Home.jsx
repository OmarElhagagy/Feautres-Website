import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Home() {
  const { user } = useAuth();
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center py-12">
        <h1 className="text-4xl sm:text-5xl font-bold mb-6">Features Website</h1>
        <p className="text-xl text-gray-600 mb-8">
          A robust platform for managing products and their updates
        </p>
        
        {user ? (
          <div className="flex justify-center space-x-4">
            <Link 
              to="/dashboard" 
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg"
            >
              Go to Dashboard
            </Link>
            <Link 
              to="/products" 
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg"
            >
              View Your Products
            </Link>
          </div>
        ) : (
          <div className="flex justify-center space-x-4">
            <Link 
              to="/login" 
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg"
            >
              Login
            </Link>
            <Link 
              to="/register" 
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg"
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-12">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-3">Product Management</h2>
          <p className="text-gray-600">
            Create and manage your products with ease. Keep track of all your product details in one place.
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-3">Feature Updates</h2>
          <p className="text-gray-600">
            Document and share your product updates. Keep your users informed about new features and improvements.
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-3">Update Points</h2>
          <p className="text-gray-600">
            Break down your updates into specific points. Make your updates more organized and easier to understand.
          </p>
        </div>
      </div>
      
      <div className="bg-gray-100 p-8 rounded-lg my-12">
        <h2 className="text-2xl font-bold mb-4">About This Project</h2>
        <p className="text-gray-700 mb-4">
          This project is a passion-driven effort to build a high-quality product management system. 
          Leveraging TypeScript and Node.js for the backend, it combines type safety with the flexibility 
          of JavaScript to create a reliable foundation.
        </p>
        <p className="text-gray-700">
          Inspired by the elegance of Chronos, we're crafting a system that's both developer-friendly 
          and ready for real-world use.
        </p>
      </div>
    </div>
  );
}

export default Home;
