import { privateAPI } from '.';

export const notificationsAPI = privateAPI.injectEndpoints({
  endpoints: build => ({
    listNotifications: build.query({
      query: () => '/notification-list/',
    }),
  }),
});

export const { useListNotificationsQuery } = notificationsAPI;
