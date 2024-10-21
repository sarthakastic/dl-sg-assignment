import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session';
import AddOnCard from './index';
import planReducer from '../../redux/slices/planSlice';
import { AddOn } from '../../utils/constants/addOn';

const persistConfig = {
  key: 'root',
  storage: storageSession,
};

const rootReducer = combineReducers({
  plan: planReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer);

const renderWithProvider = (ui: React.ReactElement) => {
  return render(<Provider store={store}>{ui}</Provider>);
};

const mockAddOn: AddOn = {
  id: 1,
  title: 'Sample Add-On',
  price: 10,
  isActive: true,
  suggestion: [''],
};

describe('AddOnCard', () => {
  it('renders correctly with given add-on information', () => {
    renderWithProvider(
      <AddOnCard addOnInfo={mockAddOn} onSelect={jest.fn()} />
    );

    const label = screen.getByLabelText(
      /Select Sample Add-On for 10 per month/i
    );
    expect(label).toBeInTheDocument();
    expect(screen.getByText('Sample Add-On - $10/month')).toBeInTheDocument();
  });

  it('calls onSelect when clicked', () => {
    const handleSelect = jest.fn();
    renderWithProvider(
      <AddOnCard addOnInfo={mockAddOn} onSelect={handleSelect} />
    );

    const addOnCard = screen.getByRole('radio');
    fireEvent.click(addOnCard);

    expect(handleSelect).toHaveBeenCalledTimes(1);
  });

  it('does not call onSelect when clicked if disabled', () => {
    const handleSelect = jest.fn();

    const inactiveAddOn: AddOn = {
      id: 1,
      title: 'Sample Add-On',
      price: 10,
      suggestion: ['This is a suggestion.'],
      isActive: false,
    };

    renderWithProvider(
      <AddOnCard addOnInfo={inactiveAddOn} onSelect={handleSelect} />
    );

    const radioInput = screen.getByLabelText(
      /Select Sample Add-On for 10 per month/i
    );

    fireEvent.click(radioInput);

    expect(handleSelect).not.toHaveBeenCalled();
  });

  it('handles key press events', () => {
    const handleSelect = jest.fn();
    renderWithProvider(
      <AddOnCard addOnInfo={mockAddOn} onSelect={handleSelect} />
    );

    const radioInput = screen.getByLabelText(
      /Select Sample Add-On for 10 per month/i
    );

    fireEvent.keyDown(radioInput, { key: 'Enter' });
    expect(handleSelect).toHaveBeenCalledTimes(1);

    fireEvent.keyDown(radioInput, { key: ' ' });
    expect(handleSelect).toHaveBeenCalledTimes(2);
  });
});
