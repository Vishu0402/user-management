import axios from 'axios';

// All network access is isolated here so components never call fetch/axios directly.
const client = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 8000,
});

/**
 * NOTE ON JSONPLACEHOLDER:
 * This is a fake REST API. POST/PUT/DELETE requests are accepted and return
 * a plausible response, but nothing is actually persisted server-side.
 * Because of that, every write below is paired with a local state update
 * in `useUsers` so the UI behaves like a real app even though the backend
 * quietly discards the change.
 */

export async function fetchUsers() {
  const { data } = await client.get('/users');
  return data;
}

export async function fetchUserById(id) {
  const { data } = await client.get(`/users/${id}`);
  return data;
}

export async function createUser(user) {
  const { data } = await client.post('/users', user);
  return data;
}

export async function updateUser(id, user) {
  const { data } = await client.put(`/users/${id}`, user);
  return data;
}

export async function deleteUser(id) {
  await client.delete(`/users/${id}`);
  return id;
}
