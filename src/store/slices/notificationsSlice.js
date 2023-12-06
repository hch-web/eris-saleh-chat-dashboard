import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [],
};

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    updateNotifications: (state, action) => ({
      ...state,
      data: action.payload,
    }),

    addNotification: (state, action) => ({
      ...state,
      data: [...state.data, action.payload],
    }),
  },
});

export const { updateNotifications, addNotification } = notificationsSlice.actions;
export default notificationsSlice.reducer;
