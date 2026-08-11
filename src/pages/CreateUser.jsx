import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUsers } from '../hooks/useUsers.jsx';
import UserForm from '../components/UserForm.jsx';
import ErrorMessage from '../components/ErrorMessage.jsx';

export default function CreateUser() {
  const { addUser } = useUsers();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  async function handleSubmit(values) {
    setSubmitting(true);
    setSubmitError(null);
    try {
      const newId = await addUser(values);
      navigate(`/users/${newId}`);
    } catch (err) {
      setSubmitError('Could not create the user. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="page page--narrow">
      <p className="eyebrow">New entry</p>
      <h1>Add a user</h1>
      <p className="page__subtitle">
        This posts to a mock API, so the record lives in this app's memory only.
      </p>

      <ErrorMessage message={submitError} />

      <UserForm submitLabel="Create user" onSubmit={handleSubmit} submitting={submitting} />
    </section>
  );
}
