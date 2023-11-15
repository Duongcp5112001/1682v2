import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import userInfoReducer from "./userInfo";
import refetchApiReducer from "./stateRefetchApi";
import chatMessages from "./chatMessages";
import notification from "./notification";
import fwordList from "./fwordList";

export const store = configureStore({
  reducer: {
    userInfo: userInfoReducer,
    refetchApi: refetchApiReducer,
    chatMessages: chatMessages,
    fwordList: fwordList,
    notification: notification,
    userSecurityQuestion: userInfoReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
