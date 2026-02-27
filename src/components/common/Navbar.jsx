import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../../store/thunks/authThunks';
import './Navbar.css';

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar__container">
        <Link to="/" className="navbar__brand">
          <span className="navbar__brand-icon">⬡</span>
          <span className="navbar__brand-text">ForumDisku</span>
        </Link>

        <div className="navbar__links">
          <Link to="/" className="navbar__link">Threads</Link>
          <Link to="/leaderboard" className="navbar__link">Leaderboard</Link>
        </div>

        <div className="navbar__actions">
          {user ? (
            <div className="navbar__user">
              <img
                src={user.avatar}
                alt={user.name}
                className="navbar__avatar"
              />
              <span className="navbar__username">{user.name}</span>
              <button
                type="button"
                onClick={handleLogout}
                className="navbar__btn navbar__btn--outline"
              >
                Keluar
              </button>
            </div>
          ) : (
            <div className="navbar__auth">
              <Link to="/login" className="navbar__btn navbar__btn--outline">Masuk</Link>
              <Link to="/register" className="navbar__btn navbar__btn--primary">Daftar</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
