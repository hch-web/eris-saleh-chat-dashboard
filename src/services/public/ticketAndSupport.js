import { COMPANY_ID, HELP_AND_SUPPORT_URL } from 'utilities/constants';
import { publicAPI } from '.';

export const ticketAndSupport = publicAPI.injectEndpoints({
  endpoints: build => ({
    getTickets: build.query({
      query: () => `${HELP_AND_SUPPORT_URL}/help-and-support/tickets/?company_id=${COMPANY_ID}`,
      providesTags: ['GetTickets'],
    }),

    getTicketChat: build.query({
      query: id => `${HELP_AND_SUPPORT_URL}/help-and-support/ticket-messages/?ticket_id=${id}`,
      providesTags: ['GetTicketChat'],
    }),

    generateTicket: build.mutation({
      query: body => ({
        url: `${HELP_AND_SUPPORT_URL}/help-and-support/tickets/`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['GetTickets'],
    }),

    getTicketById: build.query({
      query: ticketId => `${HELP_AND_SUPPORT_URL}/help-and-support/tickets/${ticketId}/?company_id=${COMPANY_ID}`,
    }),

    sendTicketMessage: build.mutation({
      query: body => ({
        url: `${HELP_AND_SUPPORT_URL}/help-and-support/ticket-messages/`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['GetTicketChat'],
    }),

    uploadFile: build.mutation({
      query: file => {
        const formData = new FormData();
        formData.append('image', file);

        return {
          url: `${HELP_AND_SUPPORT_URL}/help-and-support/ticket-message-images/`,
          method: 'POST',
          body: formData,
        };
      },
    }),

    deleteFile: build.mutation({
      query: id => ({
        url: `${HELP_AND_SUPPORT_URL}/help-and-support/ticket-message-images/${id}/`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGenerateTicketMutation,
  useGetTicketsQuery,
  useGetTicketByIdQuery,
  useSendTicketMessageMutation,
  useDeleteFileMutation,
  useUploadFileMutation,
  useGetTicketChatQuery,
} = ticketAndSupport;
