import { useEffect, useState } from 'react';

const useGetTicketDetails = data => {
  const [ticketData, setTicketData] = useState([]);

  useEffect(() => {
    if (data) {
      const modifiedData = [
        {
          label: 'Ticket No',
          value: data.id,
        },
        {
          label: 'Status',
          value: data.ticket_status,
        },
        {
          label: 'Title',
          value: data.ticket_title,
        },
        {
          label: 'Description',
          value: data.ticket_description,
        },
      ];

      setTicketData(modifiedData);
    }
  }, [data]);

  return ticketData;
};

export default useGetTicketDetails;
