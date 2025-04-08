import { Link } from 'react-router-dom';

function ProductItem({ product, onDelete }) {
  return (
    <div className="bg-white rounded shadow overflow-hidden">
      <div className="p-6">
        <h2 className="text-xl font-bold mb-2">{product.name}</h2>
        <div className="text-sm text-gray-500 mb-4">
          Created on {new Date(product.createdAt).toLocaleDateString()}
        </div>
        <div className="mb-4">
          <span className="text-gray-700 font-medium">{product.updates.length}</span> updates
        </div>
        <div className="flex space-x-2">
          <Link
            to={`/products/${product.id}`}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded flex-grow text-center"
          >
            View Details
          </Link>
          <button
            onClick={() => onDelete(product.id)}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductItem;
