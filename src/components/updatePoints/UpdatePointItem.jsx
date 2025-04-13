function UpdatePointItem({ point }) {
  return (
    <li className="bg-white p-4 rounded shadow">
      <h3 className="text-lg font-bold">{point.title || point.name || 'Untitled Point'}</h3>
      <p className="text-gray-600">{point.description || 'No description available'}</p>
      <div className="text-sm text-gray-500 mt-2">
        {point.status ? point.status.replace('_', ' ') : 'In Progress'} 
        {point.updatedAt ? ` • ${new Date(point.updatedAt).toLocaleDateString()}` : ''}
      </div>
    </li>
  );
}

export default UpdatePointItem;
