import { TableCell, TableHead, TableRow } from '@mui/material';
import React from 'react';

function UsersTableHead() {
  return (
    <TableHead>
      <TableRow>
        <TableCell>#</TableCell>
        <TableCell className="noWrap">First Name</TableCell>
        <TableCell className="noWrap">Last Name</TableCell>
        <TableCell>Username</TableCell>
        <TableCell>Email</TableCell>
        <TableCell>Role</TableCell>
        <TableCell align="center">Actions</TableCell>
      </TableRow>
    </TableHead>
  );
}

export default UsersTableHead;
