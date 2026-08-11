# Roster — User Management App

A CRUD dashboard for managing users, built with React, React Router, and the
[JSONPlaceholder](https://jsonplaceholder.typicode.com/) API.

> **Note on data persistence:** JSONPlaceholder is a mock API — it accepts
> POST/PUT/DELETE requests and returns realistic responses, but nothing is
> saved server-side. This app treats a successful response as confirmation
> and reflects the change in local React state, so the UI behaves correctly
> within a session even though the backend doesn't persist it.

## Features

- **List** all users in a searchable directory (filter by name or email)
- **View** a full detail page per user
- **Create** a new user via a validated form
- **Edit** an existing user, pre-filled with current data
- **Delete** a user, with a confirmation step
- Loading, empty, and error states throughout
- Fully responsive — table collapses to stacked cards on mobile

## Tech stack

- React 18 (functional components + hooks)
- React Router v6
- Axios
- Vite
- Plain CSS (no UI framework)

## Project structure

```
src/
  api/userApi.js        API calls, isolated from UI
  hooks/useUsers.js      Shared state + CRUD logic
  components/            Reusable UI (table, form, dialog, etc.)
  pages/                  Route-level screens
  App.jsx                 Router + layout
  main.jsx                Entry point
```

## Getting started

```bash
npm install
npm run dev
```

The app runs at `http://localhost:5173`.

### Build for production

```bash
npm run build
npm run preview
```

## Testing checklist

- [ ] Users load on first visit and display name, email, phone
- [ ] Search filters the list by name/email
- [ ] Empty search result shows an empty state
- [ ] "Add user" creates a user with valid data and redirects to its detail page
- [ ] Form rejects empty name / invalid email / empty phone
- [ ] "Edit" pre-fills the form and saves changes back to the list
- [ ] "Delete" asks for confirmation, then removes the user from the list
- [ ] Reloading the network tab / throttling shows loading and error states correctly
- [ ] Layout looks correct on desktop, tablet, and mobile widths

## Routes

| Path | Screen |
|---|---|
| `/` | User directory |
| `/users/:id` | User details |
| `/create` | Create user |
| `/edit/:id` | Edit user |

## Deployment

See the deployment steps provided alongside this project for Vercel/Netlify instructions.
