import {
  PayloadAction,
  SliceCaseReducers,
  createSlice,
} from "@reduxjs/toolkit";

export const initialState = {
  allNotifications: [],
};


// export interface Notification {
//   _id: string;
//   content: string;
//   read: boolean;
//   schema: NotificationSchema;
//   schemaId: string;
//   createdAt: Date;
//   updatedAt: Date;
// }

export interface NotificationSliceState {
  allNotifications: Array<any>;
}

export const notificationSlice = createSlice<
  NotificationSliceState,
  SliceCaseReducers<NotificationSliceState>
>({
  name: "notification",
  initialState,
  reducers: {
    setAllNotifications: (
      state: NotificationSliceState,
      action: PayloadAction<Array<any>>
    ) => {
      return {
        ...state,
        allNotifications: action.payload,
      };
    },
  },
});

export const { setAllNotifications } = notificationSlice.actions;

export default notificationSlice.reducer;
