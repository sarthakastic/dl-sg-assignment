import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Header from './index';
import '@testing-library/jest-dom'; 

describe('Header Component', () => {
  const renderHeader = () =>
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    
  it('closes sidebar when clicking outside the hamburger button', () => {
    renderHeader();

    const hamburgerButton = screen.getByRole('button', { name: /open menu/i });

    fireEvent.click(hamburgerButton);
    expect(hamburgerButton).toHaveAttribute('aria-expanded', 'true');

    fireEvent.mouseDown(document);
    expect(hamburgerButton).toHaveAttribute('aria-expanded', 'false');
  });

  it('maintains aria-labels and aria-controls for accessibility', () => {
    renderHeader();

    const hamburgerButton = screen.getByRole('button', { name: /open menu/i });

    expect(hamburgerButton).toHaveAttribute('aria-controls', 'navLinks');
    expect(hamburgerButton).toHaveAttribute('aria-expanded', 'false');
  });
});
