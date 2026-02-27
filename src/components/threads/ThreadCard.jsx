import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { voteThread } from '../../store/thunks/threadsThunks';
import { timeAgo, truncateText } from '../../utils/helpers';
import VoteButton from '../common/VoteButton';
import './ThreadCard.css';

function ThreadCard({ thread, users }) {
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.auth);

  const owner = users.find((u) => u.id === thread.ownerId) || {
    name: thread.owner ? thread.owner.name : 'Unknown',
    avatar: thread.owner ? thread.owner.avatar : '',
  };

  const isUpvoted = Boolean(user && thread.upVotesBy.includes(user.id));
  const isDownvoted = Boolean(user && thread.downVotesBy.includes(user.id));

  const handleVote = (voteType) => {
    if (!token) return;
    const currentlyUpvoted = voteType === 'up' && isUpvoted;
    const currentlyDownvoted = voteType === 'down' && isDownvoted;
    const newVote = (currentlyUpvoted || currentlyDownvoted) ? 'neutral' : voteType;
    dispatch(voteThread(thread.id, newVote));
  };

  return (
    <article className="thread-card">
      <div className="thread-card__header">
        <div className="thread-card__meta">
          <img src={owner.avatar} alt={owner.name} className="thread-card__avatar" />
          <span className="thread-card__author">{owner.name}</span>
          <span className="thread-card__dot">·</span>
          <time className="thread-card__time">{timeAgo(thread.createdAt)}</time>
        </div>
        {thread.category && (
          <span className="thread-card__category">
            #
            {thread.category}
          </span>
        )}
      </div>

      <Link to={`/threads/${thread.id}`} className="thread-card__title-link">
        <h2 className="thread-card__title">{thread.title}</h2>
      </Link>

      <p className="thread-card__body">
        {truncateText(thread.body, 160)}
      </p>

      <div className="thread-card__footer">
        <div className="thread-card__votes">
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
        <Link to={`/threads/${thread.id}`} className="thread-card__comments">
          <span>💬</span>
          <span>{thread.totalComments}</span>
          <span>komentar</span>
        </Link>
      </div>
    </article>
  );
}

ThreadCard.propTypes = {
  thread: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    category: PropTypes.string,
    createdAt: PropTypes.string.isRequired,
    ownerId: PropTypes.string,
    owner: PropTypes.shape({
      name: PropTypes.string,
      avatar: PropTypes.string,
    }),
    upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
    downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
    totalComments: PropTypes.number,
  }).isRequired,
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      avatar: PropTypes.string,
    }),
  ).isRequired,
};

export default ThreadCard;
