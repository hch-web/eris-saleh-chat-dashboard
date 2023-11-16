const { publicAPI } = require('.');

export const authApi = publicAPI.injectEndpoints({
  endpoints: build => ({
    login: build.mutation({
      query: body => ({
        url: '/login/',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useLoginMutation } = authApi;
