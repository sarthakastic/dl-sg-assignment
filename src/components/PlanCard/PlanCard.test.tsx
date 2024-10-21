import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import PlanCard from './index';

describe('PlanCard Component', () => {
  const mockSelect = jest.fn();

  const planInfo = {
    id: 1,
    title: 'Premium Plan',
    description: [
      { icon: 'icon1.png', text: 'Access to all features' },
      { icon: 'icon2.png', text: 'Priority support' },
    ],
    price: 10,
  };

  const renderComponent = (isSelected = false) =>
    render(
      <PlanCard
        planInfo={planInfo}
        isSelected={isSelected}
        onSelect={mockSelect}
      />
    );

  test('renders PlanCard with correct content', () => {
    renderComponent();

    expect(screen.getByText('Premium Plan')).toBeInTheDocument();
    expect(screen.getByText('Access to all features')).toBeInTheDocument();
    expect(screen.getByText('Priority support')).toBeInTheDocument();
    expect(screen.getByText('$10')).toBeInTheDocument();
    expect(screen.getByText('/month')).toBeInTheDocument();
  });

  test('calls onSelect when clicked', () => {
    renderComponent();

    const card = screen.getByRole('button');
    fireEvent.click(card);

    expect(mockSelect).toHaveBeenCalledTimes(1);
  });

  test('applies selected style when isSelected is true', () => {
    renderComponent(true);

    const card = screen.getByRole('button');
    expect(card).toHaveClass('selected');
  });

  test('does not apply selected style when isSelected is false', () => {
    renderComponent(false);

    const card = screen.getByRole('button');
    expect(card).not.toHaveClass('selected');
  });
});
