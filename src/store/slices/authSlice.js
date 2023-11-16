import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    onLoggedIn: (state, action) => {
      const userDetails = { ...action.payload };
      delete userDetails.token;

      localStorage.setItem('token', action.payload.token);

      return { ...state, isAuthenticated: true, user: userDetails };
    },
    getUserDetail: (state, action) => ({
      ...state,
      isAuthenticated: true,
      user: action.payload,
    }),
    onLoggedOut: () => {
      localStorage.removeItem('token');

      return { ...initialState };
    },
  },
});

export const { onLoggedIn, getUserDetail, onLoggedOut } = authSlice.actions;
export default authSlice.reducer;
