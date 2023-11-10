import {
  PayloadAction,
  SliceCaseReducers,
  createSlice,
} from "@reduxjs/toolkit";

export const initialState = {
  allNotifications: [
    {
      _id: '1',
      content: 'Notification 1 ádasdasdasdasdasdasdasdasdasd',
      createdAt: '1231231'
    },
    {
      _id: '2',
      content: 'Notification 2 ádasdasdasdasdasdasdasdasdasd',
      createdAt: '1231231'
    }, 
    {
      _id: '3',
      content: 'Notification 3',
      createdAt: '1231231'
    },
    {
      _id: '4',
      content: 'Notification 4',
      createdAt: '1231231'
    }
  ],
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
      action: PayloadAction<Array<Notification>>
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
