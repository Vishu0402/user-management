import { useMemo, useState } from 'react';
import { useUsers } from '../hooks/useUsers.jsx';
import UserTable from '../components/UserTable.jsx';
import SearchBar from '../components/SearchBar.jsx';
import Loader from '../components/Loader.jsx';
import ErrorMessage from '../components/ErrorMessage.jsx';
import EmptyState from '../components/EmptyState.jsx';
import ConfirmDialog from '../components/ConfirmDialog.jsx';

export default function Home() {
  const { users, loading, error, reload, removeUser } = useUsers();
  const [query, setQuery] = useState('');
  const [pendingDelete, setPendingDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return users;
    return users.filter(
      (u) => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)
    );
  }, [users, query]);

  async function confirmDelete() {
    if (!pendingDelete) return;
    setDeleting(true);
    setDeleteError(null);
    try {
      await removeUser(pendingDelete.id);
      setPendingDelete(null);
    } catch (err) {
      setDeleteError('Could not remove this user. Please try again.');
    } finally {
      setDeleting(false);
    }
  }

  return (
    <section className="page">
      <div className="page__header">
        <div>
          <p className="eyebrow">Directory</p>
          <h1>Every user, one screen.</h1>
        </div>
        <SearchBar value={query} onChange={setQuery} />
      </div>

      <ErrorMessage message={error} onRetry={reload} />
      <ErrorMessage message={deleteError} />

      {loading && <Loader label="Fetching users…" />}

      {!loading && !error && filtered.length === 0 && (
        <EmptyState
          title={query ? 'No users match that search.' : 'No users yet.'}
          hint={query ? 'Try a different name or email.' : 'Add your first user to get started.'}
        />
      )}

      {!loading && !error && filtered.length > 0 && (
        <UserTable users={filtered} onDeleteRequest={setPendingDelete} />
      )}

      <ConfirmDialog
        open={!!pendingDelete}
        title="Remove this user?"
        body={pendingDelete ? `${pendingDelete.name} will be removed from the directory.` : ''}
        onConfirm={confirmDelete}
        onCancel={() => setPendingDelete(null)}
        busy={deleting}
      />
    </section>
  );
}
