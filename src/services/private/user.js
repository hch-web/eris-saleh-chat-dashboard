import { privateAPI } from '.';

export const userAPI = privateAPI.injectEndpoints({
  endpoints: build => ({
    getUserDetail: build.query({
      query: () => '/get-user-detail/',
      providesTags: ['GetUserDetails'],
    }),

    updateProfile: build.mutation({
      query: body => ({
        url: `/update-user/${body.id}/`,
        method: 'PUT',
        body: {
          ...body.payload,
          username: undefined,
          id: undefined,
          password: body.payload.password || undefined,
          confirmPassword: undefined,
        },
      }),
      invalidatesTags: ['GetUserDetails', 'GetUsersList'],
    }),

    getUserById: build.query({
      query: id => `/user-list/${id}/`,
    }),

    getUsersList: build.query({
      query: () => '/user-list/',
      providesTags: ['GetUsersList'],
    }),

    addUser: build.mutation({
      query: body => ({
        url: '/create-user/',
        method: 'POST',
        body: {
          ...body,
          confirmPassword: undefined,
        },
      }),
      invalidatesTags: ['GetUsersList'],
    }),

    deleteUser: build.mutation({
      query: id => ({
        url: `/user-list/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['GetUsersList'],
    }),
  }),
});

export const {
  useGetUserDetailQuery,
  useLazyGetUserDetailQuery,
  useUpdateProfileMutation,
  useGetUserByIdQuery,
  useGetUsersListQuery,
  useAddUserMutation,
  useDeleteUserMutation,
} = userAPI;
