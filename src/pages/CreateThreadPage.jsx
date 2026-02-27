import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createThread } from '../store/thunks/threadsThunks';
import './CreateThreadPage.css';

function CreateThreadPage() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [category, setCategory] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.threads);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !body.trim()) return;
    const thread = await dispatch(createThread({ title, body, category }));
    if (thread) navigate(`/threads/${thread.id}`);
  };

  return (
    <div className="create-thread-page">
      <div className="create-thread__card">
        <h1 className="create-thread__title">Buat Thread Baru</h1>
        <p className="create-thread__subtitle">Mulai diskusi dengan komunitas</p>

        <form className="create-thread__form" onSubmit={handleSubmit}>
          <div className="create-thread__field">
            <label htmlFor="thread-title" className="create-thread__label">
              Judul Thread *
            </label>
            <input
              id="thread-title"
              type="text"
              className="create-thread__input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Judul yang menarik..."
              required
            />
          </div>

          <div className="create-thread__field">
            <label htmlFor="thread-category" className="create-thread__label">
              Kategori
            </label>
            <input
              id="thread-category"
              type="text"
              className="create-thread__input"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="contoh: teknologi, sains..."
            />
          </div>

          <div className="create-thread__field">
            <label htmlFor="thread-body" className="create-thread__label">
              Konten Thread *
            </label>
            <textarea
              id="thread-body"
              className="create-thread__textarea"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Tulis diskusi Anda di sini..."
              rows={8}
              required
            />
          </div>

          <div className="create-thread__actions">
            <button
              type="button"
              className="create-thread__btn create-thread__btn--cancel"
              onClick={() => navigate('/')}
            >
              Batal
            </button>
            <button
              type="submit"
              className="create-thread__btn create-thread__btn--submit"
              disabled={loading}
            >
              {loading ? 'Membuat...' : 'Buat Thread'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateThreadPage;
