import { privateAPI } from '.';

export const chatRoomsAPI = privateAPI.injectEndpoints({
  endpoints: build => ({
    getChatList: build.query({
      query: () => ({
        url: '/chat-list/',
        params: { archived: false },
      }),
      providesTags: ['GetChatList'],
    }),

    getArchivedChatList: build.query({
      query: () => ({
        url: '/chat-list/',
        params: { archived: true },
      }),
      providesTags: ['GetArchivedChatList'],
    }),

    markChatArchive: build.mutation({
      query: id => ({
        url: `/mark-chat-arhieve/${id}/`,
        method: 'POST',
        body: { is_archived: true },
      }),
      invalidatesTags: ['GetChatList', 'GetArchivedChatList'],
    }),

    markChatUnArchive: build.mutation({
      query: id => ({
        url: `/mark-chat-arhieve/${id}/`,
        method: 'POST',
        body: { is_archived: false },
      }),
      invalidatesTags: ['GetChatList', 'GetArchivedChatList'],
    }),

    getChatDetils: build.query({
      query: id => `/chat-detail/${id}/`,
      providesTags: ['GetChatDetils'],
    }),
  }),
});

export const {
  useGetChatListQuery,
  useGetChatDetilsQuery,
  useGetArchivedChatListQuery,
  useMarkChatArchiveMutation,
  useMarkChatUnArchiveMutation,
} = chatRoomsAPI;
