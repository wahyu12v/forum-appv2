import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchThreads } from '../store/thunks/threadsThunks';
import { fetchUsers } from '../store/thunks/usersThunks';
import ThreadCard from '../components/threads/ThreadCard';
import CategoryFilter from '../components/threads/CategoryFilter';
import LoadingSpinner from '../components/common/LoadingSpinner';
import './HomePage.css';

function HomePage() {
  const dispatch = useDispatch();
  const { list: threads, loading, activeCategory } = useSelector((state) => state.threads);
  const { list: users } = useSelector((state) => state.users);
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchThreads());
    dispatch(fetchUsers());
  }, [dispatch]);

  const categories = [...new Set(threads.map((t) => t.category).filter(Boolean))];

  const filteredThreads = activeCategory
    ? threads.filter((t) => t.category === activeCategory)
    : threads;

  return (
    <div className="home-page">
      <div className="home-page__header">
        <div>
          <h1 className="home-page__title">Diskusi Terbaru</h1>
          <p className="home-page__subtitle">Bergabunglah dalam percakapan komunitas</p>
        </div>
        {token && (
          <Link to="/threads/new" className="home-page__create-btn">
            + Buat Thread
          </Link>
        )}
      </div>

      {categories.length > 0 && (
        <CategoryFilter categories={categories} />
      )}

      {loading && filteredThreads.length === 0 && (
        <div className="home-page__loading">
          <LoadingSpinner />
        </div>
      )}

      <div className="home-page__threads">
        {filteredThreads.map((thread) => (
          <ThreadCard key={thread.id} thread={thread} users={users} />
        ))}
      </div>

      {!loading && filteredThreads.length === 0 && (
        <div className="home-page__empty">
          <p>Tidak ada thread ditemukan.</p>
        </div>
      )}
    </div>
  );
}

export default HomePage;
