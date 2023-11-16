import React from 'react';
import { TableCell, TableHead, TableRow } from '@mui/material';

function TicketAndSupportTableHead() {
  return (
    <TableHead>
      <TableRow>
        <TableCell className="noWrap">Ticket Id</TableCell>
        <TableCell className="noWrap">Company Name</TableCell>
        <TableCell className="noWrap">Generated By</TableCell>
        <TableCell className="noWrap">Assigned To</TableCell>
        <TableCell className="noWrap">Subject</TableCell>
        <TableCell className="noWrap">Status</TableCell>
        <TableCell className="noWrap">Created At</TableCell>
      </TableRow>
    </TableHead>
  );
}

export default TicketAndSupportTableHead;