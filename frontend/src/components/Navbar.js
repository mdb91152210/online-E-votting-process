import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { isAuthenticated, user, logout, isAdmin } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-content">
          <Link to="/" className="navbar-brand">
            <span className="brand-icon">🗳️</span>
            E-Voting System
          </Link>
          <div className="navbar-links">
            {isAuthenticated ? (
              <>
                {user?.role === 'user' && (
                  <>
                    <Link to="/voting" className="nav-link">Vote</Link>
                    <Link to="/results" className="nav-link">Results</Link>
                  </>
                )}
                {isAdmin && (
                  <Link to="/admin/dashboard" className="nav-link">Admin Dashboard</Link>
                )}
                <span className="nav-user">Welcome, {user?.name}</span>
                <button onClick={handleLogout} className="btn btn-secondary btn-sm">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="nav-link">Login</Link>
                <Link to="/admin/login" className="nav-link">Admin</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;


