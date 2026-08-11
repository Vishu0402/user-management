import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useUsers } from '../hooks/useUsers.jsx';
import UserForm from '../components/UserForm.jsx';
import Loader from '../components/Loader.jsx';
import ErrorMessage from '../components/ErrorMessage.jsx';
import EmptyState from '../components/EmptyState.jsx';

export default function EditUser() {
  const { id } = useParams();
  const { users, loading, error, reload, editUser } = useUsers();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  if (loading) return <Loader label="Loading user…" />;
  if (error) return <ErrorMessage message={error} onRetry={reload} />;

  const user = users.find((u) => u.id === Number(id));
  if (!user) {
    return <EmptyState title="User not found." hint="They may have already been removed." />;
  }

  async function handleSubmit(values) {
    setSubmitting(true);
    setSubmitError(null);
    try {
      await editUser(id, values);
      navigate(`/users/${id}`);
    } catch (err) {
      setSubmitError('Could not save changes. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="page page--narrow">
      <p className="eyebrow">Editing</p>
      <h1>{user.name}</h1>

      <ErrorMessage message={submitError} />

      <UserForm
        initialValues={user}
        submitLabel="Save changes"
        onSubmit={handleSubmit}
        submitting={submitting}
      />
    </section>
  );
}
