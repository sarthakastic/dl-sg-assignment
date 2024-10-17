import { createSlice } from '@reduxjs/toolkit';

const initialState = {
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
};

const routeStatusSlice = createSlice({
  name: 'routeStatus',
  initialState,
  reducers: {
    updateCompletionStatus: (state, action) => {
      const { path, value } = action.payload;
      const route = state.routes.find((route) => route.path === path);
      if (route) {
        route.completionStatus = value;
      }
    },
  },
});

export const { updateCompletionStatus } = routeStatusSlice.actions;
export default routeStatusSlice.reducer;
