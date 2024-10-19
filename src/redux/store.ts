// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session';
import routeStatusReducer from './slices/routeStatusSlice';
import planReducer from './slices/planSlice';
import { combineReducers } from 'redux';

// Persist configuration
const persistConfig = {
  key: 'root',
  storage: storageSession,
};

// Combine the reducers
const rootReducer = combineReducers({
  routeStatus: routeStatusReducer,
  plan: planReducer,
});

// Wrap the combined reducer in persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the Redux store with the persisted reducer
export const store = configureStore({
  reducer: persistedReducer,
});

// Export the store's types for TypeScript (optional)
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Create the persistor
export const persistor = persistStore(store);
