import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLeaderboard } from '../store/thunks/usersThunks';
import LoadingSpinner from '../components/common/LoadingSpinner';
import './LeaderboardPage.css';

const MEDALS = ['🥇', '🥈', '🥉'];

function LeaderboardPage() {
  const dispatch = useDispatch();
  const { leaderboard, loading } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchLeaderboard());
  }, [dispatch]);

  return (
    <div className="leaderboard-page">
      <div className="leaderboard__header">
        <h1 className="leaderboard__title">Papan Peringkat</h1>
        <p className="leaderboard__subtitle">Pengguna paling aktif bulan ini</p>
      </div>

      {loading && leaderboard.length === 0 && (
        <div className="leaderboard__loading">
          <LoadingSpinner />
        </div>
      )}

      <div className="leaderboard__list">
        {leaderboard.map((item, index) => (
          <div
            key={item.user.id}
            className={`leaderboard-item ${index < 3 ? 'leaderboard-item--top' : ''}`}
          >
            <div className="leaderboard-item__rank">
              {index < 3 ? (
                <span className="leaderboard-item__medal">{MEDALS[index]}</span>
              ) : (
                <span className="leaderboard-item__number">{index + 1}</span>
              )}
            </div>

            <img
              src={item.user.avatar}
              alt={item.user.name}
              className="leaderboard-item__avatar"
            />

            <div className="leaderboard-item__info">
              <span className="leaderboard-item__name">{item.user.name}</span>
              <span className="leaderboard-item__email">{item.user.email}</span>
            </div>

            <div className="leaderboard-item__score">
              <span className="leaderboard-item__score-number">{item.score}</span>
              <span className="leaderboard-item__score-label">poin</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LeaderboardPage;
