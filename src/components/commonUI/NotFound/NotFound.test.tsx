
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; 
import NotFound from './index'; 

describe('NotFound Component', () => {
  test('renders text and subtext', () => {
    render(
      <MemoryRouter>
        <NotFound text="Page Not Found" subtext="The page you are looking for does not exist." />
      </MemoryRouter>
    );

    const textElement = screen.getByText(/Page Not Found/i);
    const subtextElement = screen.getByText(/The page you are looking for does not exist./i);

    expect(textElement).toBeInTheDocument();
    expect(subtextElement).toBeInTheDocument();
  });

});
