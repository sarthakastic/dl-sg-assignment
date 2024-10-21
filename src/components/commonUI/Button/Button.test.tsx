import { render, screen, fireEvent } from '@testing-library/react';
import Button from './index';
import { ButtonInterface } from '../../../utils/types/Button.types';

jest.mock('./Button.module.css', () => ({
  button: 'mocked-button-class',
  outlined: 'mocked-outlined-class',
  link: 'mocked-link-class',
  error: 'mocked-error-class',
}));

describe('Button', () => {
  const defaultProps: ButtonInterface = {
    children: 'Click me',
  };

  it('renders with default props', () => {
    render(<Button {...defaultProps} />);
    const button = screen.getByRole('button', { name: 'Click me' });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('mocked-button-class');
  });

  it('renders outlined variant', () => {
    render(<Button {...defaultProps} variant="outlined" />);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('mocked-button-class mocked-outlined-class');
  });

  it('renders link variant', () => {
    render(<Button {...defaultProps} variant="link" />);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('mocked-button-class mocked-link-class');
  });

  it('renders error variant', () => {
    render(<Button {...defaultProps} variant="error" />);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('mocked-button-class mocked-error-class');
  });

  it('handles click events', () => {
    const handleClick = jest.fn();
    render(<Button {...defaultProps} onClick={handleClick} />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled when disabled prop is true', () => {
    render(<Button {...defaultProps} disabled />);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute('aria-disabled', 'true');
    expect(button).toHaveStyle({ cursor: 'not-allowed' });
  });

  it('applies disabledBackground when disabled', () => {
    render(<Button {...defaultProps} disabled disabledBackground="gray" />);
    const button = screen.getByRole('button');
    expect(button).toHaveStyle({ background: 'gray' });
  });

  it('does not call onClick when disabled', () => {
    const handleClick = jest.fn();
    render(<Button {...defaultProps} onClick={handleClick} disabled />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('applies correct tabIndex', () => {
    const { rerender } = render(<Button {...defaultProps} />);
    let button = screen.getByRole('button');
    expect(button).toHaveAttribute('tabIndex', '0');

    rerender(<Button {...defaultProps} disabled />);
    button = screen.getByRole('button');
    expect(button).toHaveAttribute('tabIndex', '-1');
  });

  it('wraps children in a span with correct aria attributes', () => {
    render(<Button {...defaultProps} />);
    const span = screen.getByText('Click me');
    expect(span.tagName).toBe('SPAN');
    expect(span).toHaveAttribute('aria-live', 'polite');
    expect(span).toHaveAttribute('aria-atomic', 'true');
  });
});
