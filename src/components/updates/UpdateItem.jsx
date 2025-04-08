import { Link } from 'react-router-dom';

function UpdateItem({ update, onDelete }) {
  return (
    <li className="bg-white p-4 rounded shadow">
      <Link to={`/updates/${update.id}`} className="block">
        <h2 className="text-xl font-bold">{update.title}</h2>
        <p className="text-gray-600">{update.description}</p>
        <div className="flex justify-between text-sm mt-2">
          <span>{new Date(update.updatedAt).toLocaleDateString()}</span>
          <span
            className={`px-2 py-1 rounded ${
              update.status === 'SHIPPED' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
            }`}
          >
            {update.status.replace('_', ' ')}
          </span>
        </div>
      </Link>
      <button
        onClick={() => onDelete(update.id)}
        className="text-red-500 hover:underline mt-2"
      >
        Delete
      </button>
    </li>
  );
}

export default UpdateItem;
