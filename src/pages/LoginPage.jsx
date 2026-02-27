import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../store/thunks/authThunks';
import './AuthPage.css';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) navigate('/');
  }, [user, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-card__brand">
          <span className="auth-card__brand-icon">⬡</span>
          <span className="auth-card__brand-text">ForumDisku</span>
        </div>

        <h1 className="auth-card__title">Selamat Datang Kembali</h1>
        <p className="auth-card__subtitle">Masuk untuk melanjutkan diskusi</p>

        {error && <div className="auth-card__error">{error}</div>}

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-form__field">
            <label htmlFor="login-email" className="auth-form__label">
              Email
            </label>
            <input
              id="login-email"
              type="email"
              className="auth-form__input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="nama@email.com"
              required
            />
          </div>

          <div className="auth-form__field">
            <label htmlFor="login-password" className="auth-form__label">
              Password
            </label>
            <input
              id="login-password"
              type="password"
              className="auth-form__input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            className="auth-form__submit"
            disabled={loading}
          >
            {loading ? 'Memproses...' : 'Masuk'}
          </button>
        </form>

        <p className="auth-card__switch">
          Belum punya akun?
          {' '}
          <Link to="/register">Daftar sekarang</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
