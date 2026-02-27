import React from 'react';
import { render, screen } from '@testing-library/react';
import LoadingSpinner from '../../components/common/LoadingSpinner';

describe('LoadingSpinner component', () => {
  it('should render small spinner by default', () => {
    const { container } = render(<LoadingSpinner />);
    const spinner = container.querySelector('.spinner');
    expect(spinner).toBeInTheDocument();
    expect(spinner.className).toContain('spinner--small');
  });

  it('should render fullpage spinner when fullPage is true', () => {
    const { container } = render(<LoadingSpinner fullPage />);
    const fullpage = container.querySelector('.loading-fullpage');
    expect(fullpage).toBeInTheDocument();
  });

  it('should not render fullpage wrapper when fullPage is false', () => {
    const { container } = render(<LoadingSpinner fullPage={false} />);
    const fullpage = container.querySelector('.loading-fullpage');
    expect(fullpage).not.toBeInTheDocument();
  });

  it('should render spinner element inside fullpage wrapper', () => {
    const { container } = render(<LoadingSpinner fullPage />);
    const spinner = container.querySelector('.loading-fullpage .spinner');
    expect(spinner).toBeInTheDocument();
  });
});
