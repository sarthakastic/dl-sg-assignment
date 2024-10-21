import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Toaster from './index';
import { hideToaster } from '../../redux/slices/toasterSlice';

const mockStore = configureStore([]);

const renderToaster = (initialState: any) => {
  const store = mockStore(initialState);
  render(
    <Provider store={store}>
      <Toaster />
    </Provider>
  );
};

describe('Toaster Component', () => {
  test('renders toaster when show is true', () => {
    const initialState = {
      toast: {
        show: true,
        type: 'success',
        message: 'This is a success message',
      },
    };

    renderToaster(initialState);

    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByText('This is a success message')).toBeInTheDocument();
  });

  test('does not render toaster when show is false', () => {
    const initialState = {
      toast: {
        show: false,
        type: 'success',
        message: 'This message should not be displayed',
      },
    };

    renderToaster(initialState);

    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  test('hides toaster after 5 seconds', () => {
    jest.useFakeTimers();
    const initialState = {
      toast: {
        show: true,
        type: 'success',
        message: 'This is a success message',
      },
    };

    const store = mockStore(initialState);
    render(
      <Provider store={store}>
        <Toaster />
      </Provider>
    );

    expect(screen.getByRole('alert')).toBeInTheDocument();

    jest.advanceTimersByTime(5000);

    const actions = store.getActions();
    expect(actions).toContainEqual(hideToaster());
    jest.useRealTimers();
  });

  test('hides toaster when close button is clicked', () => {
    const initialState = {
      toast: {
        show: true,
        type: 'success',
        message: 'This is a success message',
      },
    };

    const store = mockStore(initialState);
    render(
      <Provider store={store}>
        <Toaster />
      </Provider>
    );

    const closeButton = screen.getByLabelText('Close toaster');
    fireEvent.click(closeButton);

    const actions = store.getActions();
    expect(actions).toContainEqual(hideToaster());
  });
});
