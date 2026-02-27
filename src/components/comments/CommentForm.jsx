import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createComment } from '../../store/thunks/threadsThunks';
import './CommentForm.css';

function CommentForm({ threadId }) {
  const [content, setContent] = useState('');
  const dispatch = useDispatch();
  const { token, loading } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    await dispatch(createComment({ threadId, content }));
    setContent('');
  };

  if (!token) {
    return (
      <div className="comment-form__login">
        <p>
          <Link to="/login">Masuk</Link>
          {' '}
          untuk meninggalkan komentar.
        </p>
      </div>
    );
  }

  return (
    <form className="comment-form" onSubmit={handleSubmit}>
      <label htmlFor="comment-input" className="comment-form__label">
        Tulis Komentar
      </label>
      <textarea
        id="comment-input"
        className="comment-form__input"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Tulis komentar Anda..."
        rows={4}
        required
      />
      <button
        type="submit"
        className="comment-form__submit"
        disabled={loading || !content.trim()}
      >
        {loading ? 'Mengirim...' : 'Kirim Komentar'}
      </button>
    </form>
  );
}

CommentForm.propTypes = {
  threadId: PropTypes.string.isRequired,
};

export default CommentForm;
