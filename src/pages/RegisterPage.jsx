import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../store/thunks/authThunks';
import './AuthPage.css';

function RegisterPage() {
  const [name, setName] = useState('');
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
    dispatch(registerUser({ name, email, password }));
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-card__brand">
          <span className="auth-card__brand-icon">⬡</span>
          <span className="auth-card__brand-text">ForumDisku</span>
        </div>

        <h1 className="auth-card__title">Buat Akun Baru</h1>
        <p className="auth-card__subtitle">Bergabunglah dengan komunitas diskusi</p>

        {error && <div className="auth-card__error">{error}</div>}

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-form__field">
            <label htmlFor="register-name" className="auth-form__label">
              Nama Lengkap
            </label>
            <input
              id="register-name"
              type="text"
              className="auth-form__input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nama Anda"
              required
            />
          </div>

          <div className="auth-form__field">
            <label htmlFor="register-email" className="auth-form__label">
              Email
            </label>
            <input
              id="register-email"
              type="email"
              className="auth-form__input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="nama@email.com"
              required
            />
          </div>

          <div className="auth-form__field">
            <label htmlFor="register-password" className="auth-form__label">
              Password
            </label>
            <input
              id="register-password"
              type="password"
              className="auth-form__input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Minimal 8 karakter"
              minLength={8}
              required
            />
          </div>

          <button
            type="submit"
            className="auth-form__submit"
            disabled={loading}
          >
            {loading ? 'Memproses...' : 'Daftar'}
          </button>
        </form>

        <p className="auth-card__switch">
          Sudah punya akun?
          {' '}
          <Link to="/login">Masuk di sini</Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
