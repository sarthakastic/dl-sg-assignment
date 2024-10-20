import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session';
import routeStatusReducer from './slices/routeStatusSlice';
import planReducer from './slices/planSlice';
import toastReducer from './slices/toasterSlice'
import { combineReducers } from 'redux';

const persistConfig = {
  key: 'root',
  storage: storageSession,
};

const rootReducer = combineReducers({
  routeStatus: routeStatusReducer,
  plan: planReducer,
  toast: toastReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
