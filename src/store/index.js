import { configureStore } from '@reduxjs/toolkit';
import { serviceMiddlewares, serviceReducers } from 'services';
import authSlice from './slices/authSlice';
import notificationsSlice from './slices/notificationsSlice';

const store = configureStore({
  reducer: {
    auth: authSlice,
    notifications: notificationsSlice,
    ...serviceReducers,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(serviceMiddlewares),
});

export default store;
