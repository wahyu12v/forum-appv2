import React from 'react';
import PropTypes from 'prop-types';
import './VoteButton.css';

function VoteButton({
  count, isActive, onClick, type, disabled,
}) {
  const icon = type === 'up' ? '▲' : '▼';
  const label = type === 'up' ? 'Upvote' : 'Downvote';

  return (
    <button
      type="button"
      className={`vote-btn vote-btn--${type} ${isActive ? 'vote-btn--active' : ''}`}
      onClick={onClick}
      disabled={disabled}
      aria-label={`${label}: ${count}`}
    >
      <span className="vote-btn__icon">{icon}</span>
      <span className="vote-btn__count">{count}</span>
    </button>
  );
}

VoteButton.propTypes = {
  count: PropTypes.number.isRequired,
  isActive: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  type: PropTypes.oneOf(['up', 'down']).isRequired,
  disabled: PropTypes.bool,
};

VoteButton.defaultProps = {
  disabled: false,
};

export default VoteButton;
