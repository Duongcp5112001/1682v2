import { createSlice, PayloadAction, SliceCaseReducers } from '@reduxjs/toolkit';

export interface RefetchApiState {
  stateRefetchUser: boolean;
}

export const RefetchApiSlice = createSlice<RefetchApiState, SliceCaseReducers<RefetchApiState>>({
  name: 'RefetchApiSlice',
  initialState: {
    stateRefetchUser: false,
  },
  reducers: {
    setStateRefetchUser: (state: RefetchApiState, action: PayloadAction<boolean>) =>{
      const stateRefetchUser = action.payload;
      return {
        ...state,
        stateRefetchUser
      };
    },
  }
});

export const {
  setStateRefetchUser,
  } = RefetchApiSlice.actions;

export default RefetchApiSlice.reducer;
