import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [],
  unread: 0,
};

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    updateNotifications: (state, action) => ({
      ...state,
      ...action.payload,
      // data: action.payload,
    }),

    addNotification: (state, action) => ({
      ...state,
      data: [...state.data, action.payload],
      unread: state.unread + 1,
    }),
  },
});

export const { updateNotifications, addNotification } = notificationsSlice.actions;
export default notificationsSlice.reducer;
