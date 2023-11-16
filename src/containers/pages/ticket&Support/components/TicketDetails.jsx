import React, { useMemo } from 'react';
import { Paper } from '@mui/material';
import { useParams } from 'react-router-dom';

import GridLabelValuePair from 'containers/common/components/GridLabelValuePair';
import { useGetTicketByIdQuery } from 'services/public/ticketAndSupport';
import useGetTicketDetails from '../customHooks/useGetTicketDetails';
import ChatBox from './ChatBox';
import { TicketSupportContext } from '../context/TicketSupportContext';

function TicketDetails() {
  const { id } = useParams();
  const { data } = useGetTicketByIdQuery(id);
  const ticketDetails = useGetTicketDetails(data);

  const contextValue = useMemo(
    () => ({
      ticketId: id,
      generatedBy: data?.generated_by,
      ticketDetails: data,
    }),
    [id, data]
  );

  return (
    <Paper className="p-3">
      {ticketDetails?.map(item => (
        <GridLabelValuePair key={item?.label} label={item?.label} value={item?.value} />
      ))}

      <TicketSupportContext.Provider value={contextValue}>
        <ChatBox />
      </TicketSupportContext.Provider>
    </Paper>
  );
}

export default TicketDetails;
