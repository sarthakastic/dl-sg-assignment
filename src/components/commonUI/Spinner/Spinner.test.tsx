import { render, screen } from '@testing-library/react';
import Spinner from './index';

describe('Spinner Component', () => {
  test('renders with default size', () => {
    render(<Spinner size={50} />);

    const spinnerElement = screen.getByTestId('spinner');

    expect(spinnerElement).toBeInTheDocument();
    expect(spinnerElement).toHaveStyle({
      width: '50px',
      height: '50px',
      borderWidth: '5px',
    });
  });

  test('renders with custom size', () => {
    const customSize = 75;
    render(<Spinner size={customSize} />);

    const spinnerElement = screen.getByTestId('spinner');

    expect(spinnerElement).toBeInTheDocument();
    expect(spinnerElement).toHaveStyle({
      width: `${customSize}px`,
      height: `${customSize}px`,
      borderWidth: '5px',
    });
  });
});
