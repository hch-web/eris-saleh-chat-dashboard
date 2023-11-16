import React from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@mui/material';
import moment from 'moment';

import { useGetTicketsQuery } from 'services/public/ticketAndSupport';
import { Link } from 'react-router-dom';
import TicketAndSupportTableHead from './TicketAndSupportTableHead';

function TicketAndSupportTable() {
  const { data } = useGetTicketsQuery();

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: '800px' }}>
        <TicketAndSupportTableHead />

        <TableBody>
          {data?.results?.map(item => (
            <TableRow key={item.id}>
              <TableCell>
                <Link to={`/ticket-and-support/${item.id}`}>{item.id}</Link>
              </TableCell>

              <TableCell>{item?.company_name}</TableCell>

              <TableCell>{item?.generated_by}</TableCell>

              <TableCell>{item?.assigned_to_email || '-'}</TableCell>

              <TableCell>{item?.ticket_title}</TableCell>

              <TableCell>{item?.ticket_status}</TableCell>

              <TableCell>{moment(item?.created_at).format('YYYY-MM-DD')}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TicketAndSupportTable;
