import {
  PayloadAction,
  SliceCaseReducers,
  createSlice,
} from "@reduxjs/toolkit";

export const initialState = {
  fwordList: [],
};


export interface FwordSliceState {
  fwordList: Array<any>;
}

export const fwordSlice = createSlice<
  FwordSliceState,
  SliceCaseReducers<FwordSliceState>
>({
  name: "fword",
  initialState,
  reducers: {
    setFwordList: (
      state: FwordSliceState,
      action: PayloadAction<Array<any>>
    ) => {
      return {
        ...state,
        fwordList: action.payload,
      };
    },
  },
});

export const { setFwordList } = fwordSlice.actions;

export default fwordSlice.reducer;
