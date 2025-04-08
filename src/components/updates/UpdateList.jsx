import UpdateItem from './UpdateItem';

function UpdateList({ updates, onDelete }) {
  return (
    <ul className="space-y-4">
      {updates.map(update => (
        <UpdateItem key={update.id} update={update} onDelete={onDelete} />
      ))}
    </ul>
  );
}

export default UpdateList;
