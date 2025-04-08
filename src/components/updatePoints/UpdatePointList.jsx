import UpdatePointItem from './UpdatePointItem';

function UpdatePointList({ updatePoints }) {
  return (
    <ul className="space-y-4">
      {updatePoints.map(point => (
        <UpdatePointItem key={point.id} point={point} />
      ))}
    </ul>
  );
}

export default UpdatePointList;
