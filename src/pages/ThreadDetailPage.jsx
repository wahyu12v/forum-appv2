import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchThreadDetail, voteThread } from '../store/thunks/threadsThunks';
import { timeAgo } from '../utils/helpers';
import CommentItem from '../components/comments/CommentItem';
import CommentForm from '../components/comments/CommentForm';
import VoteButton from '../components/common/VoteButton';
import LoadingSpinner from '../components/common/LoadingSpinner';
import './ThreadDetailPage.css';

function ThreadDetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { detail: thread, loading } = useSelector((state) => state.threads);
  const { user, token } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchThreadDetail(id));
  }, [dispatch, id]);

  if (loading && !thread) return <LoadingSpinner fullPage />;

  if (!thread) {
    return (
      <div className="thread-detail-page">
        <p className="thread-detail__not-found">Thread tidak ditemukan.</p>
      </div>
    );
  }

  const isUpvoted = Boolean(user && thread.upVotesBy.includes(user.id));
  const isDownvoted = Boolean(user && thread.downVotesBy.includes(user.id));

  const handleVote = (voteType) => {
    if (!token) return;
    const currentlyUpvoted = voteType === 'up' && isUpvoted;
    const currentlyDownvoted = voteType === 'down' && isDownvoted;
    const newVote = (currentlyUpvoted || currentlyDownvoted) ? 'neutral' : voteType;
    dispatch(voteThread(thread.id, newVote));
  };

  const commentsCount = thread.comments ? thread.comments.length : 0;
  const ownerName = thread.owner ? thread.owner.name : 'Unknown';
  const ownerAvatar = thread.owner ? thread.owner.avatar : '';

  return (
    <div className="thread-detail-page">
      <Link to="/" className="thread-detail__back">
        ← Kembali
      </Link>

      <article className="thread-detail">
        <div className="thread-detail__header">
          {thread.category && (
            <span className="thread-detail__category">
              #
              {thread.category}
            </span>
          )}
          <h1 className="thread-detail__title">{thread.title}</h1>

          <div className="thread-detail__meta">
            <img
              src={ownerAvatar}
              alt={ownerName}
              className="thread-detail__avatar"
            />
            <span className="thread-detail__author">{ownerName}</span>
            <span className="thread-detail__dot">·</span>
            <time className="thread-detail__time">{timeAgo(thread.createdAt)}</time>
          </div>
        </div>

        <div
          className="thread-detail__body"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: thread.body }}
        />

        <div className="thread-detail__votes">
          <VoteButton
            count={thread.upVotesBy.length}
            isActive={isUpvoted}
            onClick={() => handleVote('up')}
            type="up"
            disabled={!token}
          />
          <VoteButton
            count={thread.downVotesBy.length}
            isActive={isDownvoted}
            onClick={() => handleVote('down')}
            type="down"
            disabled={!token}
          />
        </div>
      </article>

      <section className="thread-detail__comments-section">
        <h2 className="thread-detail__comments-title">
          Komentar
          {' '}
          <span className="thread-detail__comment-count">
            (
            {commentsCount}
            )
          </span>
        </h2>

        <div className="thread-detail__comment-form">
          <CommentForm threadId={thread.id} />
        </div>

        <div className="thread-detail__comments-list">
          {thread.comments && thread.comments.map((comment) => (
            <CommentItem key={comment.id} comment={comment} threadId={thread.id} />
          ))}
        </div>

        {commentsCount === 0 && (
          <p className="thread-detail__no-comments">
            Belum ada komentar. Jadilah yang pertama!
          </p>
        )}
      </section>
    </div>
  );
}

export default ThreadDetailPage;
