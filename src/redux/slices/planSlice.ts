import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PlanState {
  myPlan: string;
  selectedAddOns: string;
}

const initialState: PlanState = {
  myPlan: '',
  selectedAddOns: '',
};

const planSlice = createSlice({
  name: 'plan',
  initialState,
  reducers: {
    updateMyPlan: (state, action: PayloadAction<string>) => {
      state.myPlan = action.payload;
    },
    updateSelectedAddOns: (state, action: PayloadAction<string>) => {
      state.selectedAddOns = action.payload;
    },
  },
});

export const { updateMyPlan, updateSelectedAddOns } = planSlice.actions;
export default planSlice.reducer;
