import { Link } from 'react-router-dom';

export default function UserTable({ users, onDeleteRequest }) {
  return (
    <div className="user-table" role="table" aria-label="Users">
      <div className="user-table__head" role="row">
        <span role="columnheader">Name</span>
        <span role="columnheader">Email</span>
        <span role="columnheader">Phone</span>
        <span role="columnheader">Actions</span>
      </div>

      {users.map((user, index) => (
        <div className="user-table__row" role="row" key={user.id}>
          <span className="user-table__index" aria-hidden="true">
            {String(index + 1).padStart(2, '0')}
          </span>
          <div className="user-table__cell" role="cell" data-label="Name">
            <Link to={`/users/${user.id}`} className="user-table__name">
              {user.name}
            </Link>
            <span className="user-table__username">@{user.username}</span>
          </div>
          <div className="user-table__cell" role="cell" data-label="Email">
            {user.email}
          </div>
          <div className="user-table__cell" role="cell" data-label="Phone">
            {user.phone}
          </div>
          <div className="user-table__cell user-table__actions" role="cell" data-label="Actions">
            <Link to={`/users/${user.id}`} className="btn btn--ghost btn--sm">
              View
            </Link>
            <Link to={`/edit/${user.id}`} className="btn btn--ghost btn--sm">
              Edit
            </Link>
            <button
              type="button"
              className="btn btn--danger btn--sm"
              onClick={() => onDeleteRequest(user)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
