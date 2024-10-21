import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import DynamicSection from './index';
import '@testing-library/jest-dom';

const renderWithRouter = (ui: React.ReactNode, initialRoute: string) => {
  return render(
    <MemoryRouter initialEntries={[initialRoute]}>
      <Routes>
        <Route path="*" element={ui} />
      </Routes>
    </MemoryRouter>
  );
};

describe('DynamicSection Component', () => {
  const mockProps = {
    heading: 'Sample Heading',
    subheading: 'Sample Subheading',
    sections: [
      { content: 'Section 1 Content' },
      { content: 'Section 2 Content' },
    ],
  };

  it('renders the heading, subheading, and sections correctly', () => {
    renderWithRouter(<DynamicSection {...mockProps} />, '/');

    expect(screen.getByText('Sample Heading')).toBeInTheDocument();
    expect(screen.getByText('Sample Subheading')).toBeInTheDocument();
    expect(screen.getByText('Section 1 Content')).toBeInTheDocument();
    expect(screen.getByText('Section 2 Content')).toBeInTheDocument();
  });

  it('applies correct padding for /subscription path', () => {
    renderWithRouter(<DynamicSection {...mockProps} />, '/subscription');

    const sectionContent = screen.getAllByText(/Section [0-9] Content/i);
    sectionContent.forEach((element) => {
      expect(element).toHaveStyle('padding: 1.25rem 0');
    });
  });

  it('applies correct padding for /device path', () => {
    renderWithRouter(<DynamicSection {...mockProps} />, '/device');

    const sectionContent = screen.getAllByText(/Section [0-9] Content/i);
    sectionContent.forEach((element) => {
      expect(element).toHaveStyle('padding: 1.875rem 0');
    });
  });

  it('applies default padding for other paths', () => {
    renderWithRouter(<DynamicSection {...mockProps} />, '/about');

    const sectionContent = screen.getAllByText(/Section [0-9] Content/i);
    sectionContent.forEach((element) => {
      expect(element).toHaveStyle('padding: 0');
    });
  });
});
