import { render, screen, fireEvent } from '@testing-library/react';
import DeviceCard from './index';

describe('DeviceCard', () => {
  const deviceNumber = 1;

  beforeEach(() => {
    render(<DeviceCard deviceNumber={deviceNumber} />);
  });

  beforeAll(() => {
    global.URL.createObjectURL = jest.fn();
  });

  it('renders the device title', () => {
    const title = screen.getByRole('heading', { name: /Device 1/i });
    expect(title).toBeInTheDocument();
  });

  it('allows entering the device type', () => {
    const deviceTypeInput = screen.getByLabelText(
      /Device type/i
    ) as HTMLInputElement;
    fireEvent.change(deviceTypeInput, { target: { value: 'Laptop' } });
    expect(deviceTypeInput.value).toBe('Laptop');
  });

  it('toggles BYOD option', () => {
    const toggleCheckbox = screen.getByLabelText(
      /Toggle if bringing your own device for Device 1/i
    );

    expect(toggleCheckbox).not.toBeChecked();

    fireEvent.click(toggleCheckbox);
    expect(toggleCheckbox).toBeChecked();

    fireEvent.click(toggleCheckbox);
    expect(toggleCheckbox).not.toBeChecked();
  });

  it('renders the serial number input when BYOD is toggled on', () => {
    const toggleCheckbox = screen.getByLabelText(
      /Toggle if bringing your own device for Device 1/i
    );
    fireEvent.click(toggleCheckbox);

    const serialNumberInput = screen.getByLabelText(/Serial number/i);
    expect(serialNumberInput).toBeInTheDocument();
  });

  it('allows entering the serial number when BYOD is enabled', () => {
    const toggleCheckbox = screen.getByLabelText(
      /Toggle if bringing your own device for Device 1/i
    );
    fireEvent.click(toggleCheckbox);

    const serialNumberInput = screen.getByLabelText(
      /Serial number/i
    ) as HTMLInputElement;
    fireEvent.change(serialNumberInput, { target: { value: '12345' } });
    expect(serialNumberInput.value).toBe('12345');
  });
});
