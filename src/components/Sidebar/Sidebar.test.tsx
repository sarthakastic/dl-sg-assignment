import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Sidebar from './index';
import configureStore from 'redux-mock-store';
import { RootState } from '../../redux/store';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
  useLocation: () => ({ pathname: '/dashboard' }),
}));

const mockStore = configureStore<RootState>([]);

const renderSidebar = (initialState: Partial<RootState>) => {
  const store = mockStore({
    routeStatus: {
      routes: [
        { id: 1, path: 'dashboard', completionStatus: true },
        { id: 2, path: 'settings', completionStatus: false },
      ],
    },
    plan: {
        myPlan:'',
        selectedAddOns:''
    }, 
    toast: {
        message:'',
        show:false,
        type:'error'
    },
    _persist: { 
        version: -1,
        rehydrated: false,
      },
    ...initialState,
  });

  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/dashboard']}>
        <Routes>
          <Route path="*" element={<Sidebar />} />
        </Routes>
      </MemoryRouter>
    </Provider>
  );
};

describe('Sidebar Component', () => {
  test('renders Sidebar with valid routes', () => {
    renderSidebar({});

    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Settings')).toBeInTheDocument();
  });

  test('calls navigate on clicking a route', () => {
    renderSidebar({});

    fireEvent.click(screen.getByText('Dashboard'));
    expect(mockNavigate).toHaveBeenCalledWith('dashboard');

    fireEvent.click(screen.getByText('Settings'));
    expect(mockNavigate).toHaveBeenCalledWith('settings');
  });

  test('calls navigate on "Enter" key press', () => {
    renderSidebar({});

    const settingsTab = screen.getByText('Settings');
    fireEvent.keyDown(settingsTab, { key: 'Enter', code: 'Enter' });
    expect(mockNavigate).toHaveBeenCalledWith('settings');
  });

  test('calls navigate on "Space" key press', () => {
    renderSidebar({});

    const settingsTab = screen.getByText('Settings');
    fireEvent.keyDown(settingsTab, { key: ' ', code: 'Space' });
    expect(mockNavigate).toHaveBeenCalledWith('settings');
  });

  test('applies activeTab style to the active route', () => {
    renderSidebar({});
    
    const dashboardTab = screen.getByText('Dashboard');
    expect(dashboardTab).toHaveClass('activeTab');
  });

  test('applies grayTab style to incomplete routes', () => {
    renderSidebar({});
    
    const settingsTab = screen.getByText('Settings');
    expect(settingsTab).toHaveClass('grayTab');
  });

 
  test('does not render Sidebar for invalid path', () => {
    render(
      <Provider store={mockStore({ routeStatus: { routes: [] }, plan: {myPlan:'',selectedAddOns:''}, toast: {
        message:"",show:false
,type:'error'      },_persist: {
    version: -1,
    rehydrated: false,
  }, })}>
        <MemoryRouter initialEntries={['/unknown']}>
          <Routes>
            <Route path="*" element={<Sidebar />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.queryByRole('navigation')).not.toBeInTheDocument();
  });
});
