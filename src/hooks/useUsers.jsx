import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import * as userApi from '../api/userApi.js';

/**
 * Single source of truth for user data across the app.
 *
 * This lives in Context (not a plain hook) on purpose: a plain hook creates
 * a brand-new state instance every time a component calls it. Home,
 * CreateUser, EditUser, and UserDetails would each end up with their own
 * disconnected copy of `users` — so a user created on one page would be
 * invisible on the next, since JSONPlaceholder never actually persists it
 * server-side for a real re-fetch to pick up.
 *
 * By providing the state once at the app root and having every page consume
 * it through `useUsers()`, a create/update/delete on one screen is
 * immediately visible on every other screen.
 */
const UsersContext = createContext(null);

export function UsersProvider({ children }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await userApi.fetchUsers();
      setUsers(data);
    } catch (err) {
      setError('Could not load users. Check your connection and try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const addUser = useCallback(async (newUser) => {
    const created = await userApi.createUser(newUser);
    // JSONPlaceholder always returns id: 11 for new posts regardless of
    // existing data, so we assign a locally-unique id to avoid collisions.
    const localId = Date.now();
    setUsers((prev) => [{ ...newUser, ...created, id: localId }, ...prev]);
    return localId;
  }, []);

  const editUser = useCallback(async (id, updates) => {
    await userApi.updateUser(id, updates);
    setUsers((prev) =>
      prev.map((u) => (u.id === Number(id) ? { ...u, ...updates } : u))
    );
  }, []);

  const removeUser = useCallback(async (id) => {
    await userApi.deleteUser(id);
    setUsers((prev) => prev.filter((u) => u.id !== Number(id)));
  }, []);

  const value = { users, loading, error, reload: loadUsers, addUser, editUser, removeUser };

  return <UsersContext.Provider value={value}>{children}</UsersContext.Provider>;
}

export function useUsers() {
  const ctx = useContext(UsersContext);
  if (!ctx) {
    throw new Error('useUsers must be used within a UsersProvider');
  }
  return ctx;
}
