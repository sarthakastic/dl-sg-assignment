import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import PaymentCard from './index';

describe('PaymentCard Component', () => {
  const mockSubmit = jest.fn();
  const mockValidityChange = jest.fn();

  const initialValues = { cardNumber: '', expiryDate: '', cvc: '' };

  const renderComponent = async (disabled = false) => {
    await act(async () => {
      render(
        <PaymentCard
          onSubmit={mockSubmit}
          initialValues={initialValues}
          disabled={disabled}
          onValidityChange={mockValidityChange}
        />
      );
    });
  };

  test('renders all input fields correctly', async () => {
    await renderComponent();

    expect(
      screen.getByPlaceholderText('1234 5678 1234 5678')
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText('MM/YY')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('CVC')).toBeInTheDocument();
  });

  test('formats card number as expected', async () => {
    await renderComponent();

    const cardNumberInput = screen.getByPlaceholderText('1234 5678 1234 5678');
    await act(async () => {
      fireEvent.change(cardNumberInput, {
        target: { value: '1234567812345678' },
      });
    });

    expect(cardNumberInput).toHaveValue('1234 5678 1234 5678');
  });

  test('formats expiry date correctly', async () => {
    await renderComponent();

    const expiryDateInput = screen.getByPlaceholderText('MM/YY');
    await act(async () => {
      fireEvent.change(expiryDateInput, { target: { value: '1125' } });
    });

    expect(expiryDateInput).toHaveValue('11/25');
  });

  test('limits CVC input to 3 digits', async () => {
    await renderComponent();

    const cvcInput = screen.getByPlaceholderText('CVC');
    await act(async () => {
      fireEvent.change(cvcInput, { target: { value: '1234' } });
    });

    expect(cvcInput).toHaveValue('123');
  });

  test('disables input fields when disabled prop is true', async () => {
    await renderComponent(true);

    expect(screen.getByPlaceholderText('1234 5678 1234 5678')).toBeDisabled();
    expect(screen.getByPlaceholderText('MM/YY')).toBeDisabled();
    expect(screen.getByPlaceholderText('CVC')).toBeDisabled();
  });

  test('calls onValidityChange when form validity changes', async () => {
    await renderComponent();

    const cardNumberInput = screen.getByPlaceholderText('1234 5678 1234 5678');
    await act(async () => {
      fireEvent.change(cardNumberInput, {
        target: { value: '1234 5678 1234 5678' },
      });
    });

    expect(mockValidityChange).toHaveBeenCalledWith(false);

    const expiryDateInput = screen.getByPlaceholderText('MM/YY');
    await act(async () => {
      fireEvent.change(expiryDateInput, { target: { value: '12/25' } });
    });

    const cvcInput = screen.getByPlaceholderText('CVC');
    await act(async () => {
      fireEvent.change(cvcInput, { target: { value: '123' } });
    });

    expect(mockValidityChange).toHaveBeenCalledWith(true);
  });

  test('displays validation errors when required fields are empty', async () => {
    await renderComponent();

    await act(async () => {
      fireEvent.submit(screen.getByRole('form'));
    });

    expect(
      await screen.findByText('Card number is required')
    ).toBeInTheDocument();
    expect(
      await screen.findByText('Expiry date is required')
    ).toBeInTheDocument();
    expect(await screen.findByText('CVC is required')).toBeInTheDocument();
  });

  test('renders PaymentCard', async () => {
    await act(async () => {
      renderComponent();
    });
  });
});
