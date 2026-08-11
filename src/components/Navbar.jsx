import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar__inner">
        <Link to="/" className="navbar__brand">
          <span className="navbar__mark"></span>
          Roster
        </Link>
        <nav className="navbar__links">
          <Link to="/">Directory</Link>
          <Link to="/create" className="navbar__cta">
            + Add user
          </Link>
        </nav>
      </div>
    </header>
  );
}
