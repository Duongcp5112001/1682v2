import {
  createSlice,
  PayloadAction,
  SliceCaseReducers,
} from "@reduxjs/toolkit";
import { UserInfoState } from "~/types/index";

export const initialStateValue = "";

export interface UserSliceState {
  userInfo: any;
  userData: any;
  userSecurityQuestion: any;
  messages: Array<any>;
}

export const userSlice = createSlice<
  UserSliceState,
  SliceCaseReducers<UserSliceState>
>({
  name: "userSlice",
  initialState: {
    userData: undefined,
    userInfo: undefined,
    userSecurityQuestion: {},
    messages: [],
  },
  reducers: {
    setUserInfo: (
      state: UserSliceState,
      action: PayloadAction<UserSliceState>
    ) => {
      const userData = action.payload;
      return {
        ...state,
        userData,
      };
    },

    setUserMessages: (
      state: UserSliceState,
      action: PayloadAction<Array<any>>
    ) => {
      return {
        ...state,
        messages: action.payload,
      };
    },
    setUserSecurityQuestion: (
      state: UserSliceState,
      action: PayloadAction<UserSliceState>
    ) => {
      const userSecurityQuestion = action.payload;
      return {
        ...state,
        userSecurityQuestion,
      };
    },
  },
});

export const { setUserInfo, setUserMessages, setUserSecurityQuestion } = userSlice.actions;

export default userSlice.reducer;
