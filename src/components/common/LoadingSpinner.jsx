import React from 'react';
import PropTypes from 'prop-types';
import './LoadingSpinner.css';

function LoadingSpinner({ fullPage }) {
  if (fullPage) {
    return (
      <div className="loading-fullpage">
        <div className="spinner" />
      </div>
    );
  }
  return <div className="spinner spinner--small" />;
}

LoadingSpinner.propTypes = {
  fullPage: PropTypes.bool,
};

LoadingSpinner.defaultProps = {
  fullPage: false,
};

export default LoadingSpinner;
