import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import LazyImage from './index';

describe('LazyImage Component', () => {
    test('renders the image with empty src initially', () => {
        render(<LazyImage src="image.jpg" alt="Lazy loaded image" width={300} height={200} />);
    
        const img = screen.getByAltText('Lazy loaded image');
        expect(img).toBeInTheDocument();
        expect(img).toHaveAttribute('src', '');
      });
    

  test('renders the image with an empty src initially', () => {
    render(<LazyImage src="image.jpg" alt="Lazy loaded image" width={300} height={200} />);

    const img = screen.getByAltText('Lazy loaded image');
    expect(img).toHaveAttribute('src', ''); 
  });

  test('cleans up on unmount', () => {
    const { unmount } = render(<LazyImage src="image.jpg" alt="Lazy loaded image" width={300} height={200} />);
    
    unmount();

  });
});
