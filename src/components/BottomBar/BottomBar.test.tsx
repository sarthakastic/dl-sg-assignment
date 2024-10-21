import { render, screen, fireEvent } from '@testing-library/react';
import BottomBar from './index';
import { ReactNode } from 'react';

jest.mock('../commonUI/Button', () => {
  return ({ children, onClick, disabled }:{ children:ReactNode, onClick:()=>void, disabled :boolean}) => (
    <button onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
});

describe('BottomBar', () => {

  it('renders the button with the correct label when not loading', () => {
    render(<BottomBar />);
    const button = screen.getByRole('button', { name: /Next/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Next');
  });


  it('renders the spinner when loading', () => {
    render(<BottomBar isLoading={true} />);
    const button = screen.getByRole('button'); 
    expect(button).toBeInTheDocument();
    expect(button).toContainHTML('<div class="spinner"'); 
  });


  it('calls onClick when the button is clicked and not disabled', () => {
    const handleClick = jest.fn();
    render(<BottomBar onClick={handleClick} disabled={false} />);
    const button = screen.getByRole('button', { name: /Next/i }); 

    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('does not call onClick when the button is disabled', () => {
    const handleClick = jest.fn();
    render(<BottomBar onClick={handleClick} disabled={true} />);
    const button = screen.getByRole('button', { name: /Next/i }); 

    fireEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });
});
