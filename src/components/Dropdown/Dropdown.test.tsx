import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import Dropdown from './index';
import configureStore from 'redux-mock-store';

const mockStore = configureStore([]);

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('Dropdown Component', () => {
  let store: any;

  beforeEach(() => {
    store = mockStore({
      routeStatus: {
        routes: [
          { id: 1, path: 'location', completionStatus: true },
          { id: 2, path: 'about', completionStatus: true },
          { id: 3, path: 'features', completionStatus: true },
          { id: 4, path: 'rules', completionStatus: true },
          { id: 5, path: 'pricing', completionStatus: true },
          { id: 6, path: 'promotion', completionStatus: true },
          { id: 7, path: 'pictures', completionStatus: true },
          { id: 8, path: 'insurance', completionStatus: true },
          { id: 9, path: 'subscription', completionStatus: false },
          { id: 10, path: 'device', completionStatus: false },
          { id: 11, path: 'early-access', completionStatus: false },
        ],
      },
    });
  });

  it('does not render when the path is invalid', () => {
    store = mockStore({
      routeStatus: {
        routes: [],
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/invalid-path']}>
          <Dropdown />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.queryByRole('combobox')).not.toBeInTheDocument();
  });
});
