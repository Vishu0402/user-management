import { Link, useParams } from 'react-router-dom';
import { useUsers } from '../hooks/useUsers.jsx';
import Loader from '../components/Loader.jsx';
import ErrorMessage from '../components/ErrorMessage.jsx';
import EmptyState from '../components/EmptyState.jsx';

export default function UserDetails() {
  const { id } = useParams();
  const { users, loading, error, reload } = useUsers();

  if (loading) return <Loader label="Loading user…" />;
  if (error) return <ErrorMessage message={error} onRetry={reload} />;

  const user = users.find((u) => u.id === Number(id));

  if (!user) {
    return (
      <EmptyState
        title="User not found."
        hint="They may have been removed, or the link is outdated."
      />
    );
  }

  const company = typeof user.company === 'string' ? user.company : user.company?.name;

  return (
    <section className="page">
      <Link to="/" className="back-link">
        ← Back to directory
      </Link>

      <div className="detail-card">
        <p className="eyebrow">User #{user.id}</p>
        <h1>{user.name}</h1>
        <p className="detail-card__username">@{user.username}</p>

        <dl className="detail-card__grid">
          <div>
            <dt>Email</dt>
            <dd>{user.email}</dd>
          </div>
          <div>
            <dt>Phone</dt>
            <dd>{user.phone}</dd>
          </div>
          {company && (
            <div>
              <dt>Company</dt>
              <dd>{company}</dd>
            </div>
          )}
          {user.address?.city && (
            <div>
              <dt>City</dt>
              <dd>{user.address.city}</dd>
            </div>
          )}
        </dl>

        <Link to={`/edit/${user.id}`} className="btn btn--primary">
          Edit user
        </Link>
      </div>
    </section>
  );
}
