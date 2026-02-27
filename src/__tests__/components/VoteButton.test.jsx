import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import VoteButton from '../../components/common/VoteButton';

describe('VoteButton component', () => {
  const defaultProps = {
    count: 5,
    isActive: false,
    onClick: jest.fn(),
    type: 'up',
    disabled: false,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render upvote button with correct count', () => {
    render(<VoteButton {...defaultProps} />);
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('should render downvote button', () => {
    render(<VoteButton {...defaultProps} type="down" />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should call onClick when button is clicked', () => {
    render(<VoteButton {...defaultProps} />);
    fireEvent.click(screen.getByRole('button'));
    expect(defaultProps.onClick).toHaveBeenCalledTimes(1);
  });

  it('should not call onClick when button is disabled', () => {
    render(<VoteButton {...defaultProps} disabled />);
    fireEvent.click(screen.getByRole('button'));
    expect(defaultProps.onClick).not.toHaveBeenCalled();
  });

  it('should have active class when isActive is true', () => {
    render(<VoteButton {...defaultProps} isActive />);
    const button = screen.getByRole('button');
    expect(button.className).toContain('vote-btn--active');
  });

  it('should not have active class when isActive is false', () => {
    render(<VoteButton {...defaultProps} isActive={false} />);
    const button = screen.getByRole('button');
    expect(button.className).not.toContain('vote-btn--active');
  });

  it('should have correct aria-label for upvote', () => {
    render(<VoteButton {...defaultProps} count={10} type="up" />);
    expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Upvote: 10');
  });

  it('should have correct aria-label for downvote', () => {
    render(<VoteButton {...defaultProps} count={3} type="down" />);
    expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Downvote: 3');
  });
});
