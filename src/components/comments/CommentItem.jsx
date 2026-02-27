import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { voteComment } from '../../store/thunks/threadsThunks';
import { timeAgo } from '../../utils/helpers';
import VoteButton from '../common/VoteButton';
import './CommentItem.css';

function CommentItem({ comment, threadId }) {
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.auth);

  const isUpvoted = Boolean(user && comment.upVotesBy.includes(user.id));
  const isDownvoted = Boolean(user && comment.downVotesBy.includes(user.id));

  const handleVote = (voteType) => {
    if (!token) return;
    const currentlyUpvoted = voteType === 'up' && isUpvoted;
    const currentlyDownvoted = voteType === 'down' && isDownvoted;
    const newVote = (currentlyUpvoted || currentlyDownvoted) ? 'neutral' : voteType;
    dispatch(voteComment(threadId, comment.id, newVote));
  };

  const ownerName = comment.owner ? comment.owner.name : 'Unknown';
  const ownerAvatar = comment.owner ? comment.owner.avatar : '';

  return (
    <div className="comment-item">
      <div className="comment-item__header">
        <img
          src={ownerAvatar}
          alt={ownerName}
          className="comment-item__avatar"
        />
        <div className="comment-item__info">
          <span className="comment-item__author">{ownerName}</span>
          <time className="comment-item__time">{timeAgo(comment.createdAt)}</time>
        </div>
      </div>
      <div
        className="comment-item__content"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: comment.content }}
      />
      <div className="comment-item__footer">
        <VoteButton
          count={comment.upVotesBy.length}
          isActive={isUpvoted}
          onClick={() => handleVote('up')}
          type="up"
          disabled={!token}
        />
        <VoteButton
          count={comment.downVotesBy.length}
          isActive={isDownvoted}
          onClick={() => handleVote('down')}
          type="down"
          disabled={!token}
        />
      </div>
    </div>
  );
}

CommentItem.propTypes = {
  comment: PropTypes.shape({
    id: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    owner: PropTypes.shape({
      name: PropTypes.string,
      avatar: PropTypes.string,
    }),
    upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
    downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  threadId: PropTypes.string.isRequired,
};

export default CommentItem;
