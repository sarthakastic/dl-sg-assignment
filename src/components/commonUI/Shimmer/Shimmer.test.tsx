import { render, screen } from '@testing-library/react';
import Shimmer from './index';
import styles from './Shimmer.module.css';

describe('Shimmer Component', () => {
  test('renders with default width and height', () => {
    render(<Shimmer />);

    const shimmerWrapper = screen.getByRole('status');

    expect(shimmerWrapper).toBeInTheDocument();
    expect(shimmerWrapper).toHaveStyle({ width: '100%', height: '20px' });
    expect(shimmerWrapper).toHaveClass('shimmerWrapper');
  });

  test('renders with custom width and height', () => {
    const customWidth = '50%';
    const customHeight = '40px';

    render(<Shimmer width={customWidth} height={customHeight} />);

    const shimmerWrapper = screen.getByRole('status');

    expect(shimmerWrapper).toBeInTheDocument();
    expect(shimmerWrapper).toHaveStyle({
      width: customWidth,
      height: customHeight,
    });
    expect(shimmerWrapper).toHaveClass('shimmerWrapper');
  });

  test('contains the shimmer div', () => {
    render(<Shimmer />);

    const shimmerElement = screen
      .getByRole('status')
      .querySelector(`.${styles.shimmer}`);

    expect(shimmerElement).toBeInTheDocument();
    expect(shimmerElement).toHaveAttribute('aria-hidden', 'true');
  });
});
