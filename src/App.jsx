import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import { UsersProvider } from './hooks/useUsers.jsx';
import Home from './pages/Home.jsx';
import UserDetails from './pages/UserDetails.jsx';
import CreateUser from './pages/CreateUser.jsx';
import EditUser from './pages/EditUser.jsx';

export default function App() {
  return (
    <UsersProvider>
      <div className="app-shell">
        <Navbar />
        <main className="app-main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/users/:id" element={<UserDetails />} />
            <Route path="/create" element={<CreateUser />} />
            <Route path="/edit/:id" element={<EditUser />} />
            <Route
              path="*"
              element={
                <section className="page">
                  <p className="eyebrow">404</p>
                  <h1>Nothing here.</h1>
                </section>
              }
            />
          </Routes>
        </main>
      </div>
    </UsersProvider>
  );
}
