import { privateAPI } from '.';

export const humanAgentAPI = privateAPI.injectEndpoints({
  endpoints: build => ({
    getHumanAgentChats: build.query({
      query: params => ({
        url: '/human-agent-chat-list/',
        method: 'GET',
        params: {
          page: params.page || undefined,
          limit: params.limit === 15 ? undefined : params.limit,
        },
      }),
    }),
    getSelectedChat: build.query({
      query: id => `/chat-detail/${id}/`,
    }),
  }),
});

export const { useGetHumanAgentChatsQuery, useGetSelectedChatQuery } = humanAgentAPI;
