function UpdatePointItem({ point }) {
  return (
    <li className="bg-white p-4 rounded shadow">
      <h3 className="text-lg font-bold">{point.name}</h3>
      <p className="text-gray-600">{point.description}</p>
      <div className="text-sm text-gray-500 mt-2">
        {point.status.replace('_', ' ')} • {new Date(point.updatedAt).toLocaleDateString()}
      </div>
    </li>
  );
}

export default UpdatePointItem;
