import React, { useCallback, useState } from 'react';
import {
  Button,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { Link } from 'react-router-dom';

// COMPONENTS
import { useDeleteUserMutation, useGetUsersListQuery } from 'services/private/user';
import DialogBox from 'containers/common/components/DialogBox';
import useHandleApiResponse from 'customHooks/useHandleApiResponse';
import UsersTableHead from './components/UsersTableHead';

function Users() {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const { data } = useGetUsersListQuery();
  const [deleteUser, { error, isSuccess }] = useDeleteUserMutation();
  useHandleApiResponse(error, isSuccess, 'User deleted successfully!');

  const handleOpenDialog = useCallback(id => {
    setSelectedId(id);
    setDialogOpen(true);
  }, []);

  const handleCloseDialog = useCallback(() => {
    setDialogOpen(false);
  }, []);

  const handleDelete = useCallback(async () => {
    await deleteUser(selectedId);
    setDialogOpen(false);
  }, [selectedId]);

  return (
    <Paper className="p-3" sx={{ minHeight: '80vh' }}>
      <DialogBox
        isOpen={isDialogOpen}
        title="Are you sure to delete this user?"
        handleConfirm={handleDelete}
        handleClose={handleCloseDialog}
      />

      <Stack direction="row" justifyContent="flex-end" mb={3}>
        <Link to="/user/add">
          <Button color="primary" variant="contained">
            Add User
          </Button>
        </Link>
      </Stack>

      <TableContainer component={Paper}>
        <Table>
          <UsersTableHead />

          <TableBody>
            {data?.map((user, index) => (
              <TableRow key={user.id} hover>
                <TableCell>{index + 1}</TableCell>

                <TableCell>{user?.first_name ?? 'NA'}</TableCell>

                <TableCell>{user?.last_name ?? 'NA'}</TableCell>

                <TableCell>{user?.username ?? 'NA'}</TableCell>

                <TableCell>{user?.email ?? 'NA'}</TableCell>

                <TableCell>{user?.role ?? 'NA'}</TableCell>

                <TableCell>
                  <Stack direction="row" justifyContent="center" spacing={1}>
                    <Link to={`/profile/${user?.id}/`}>
                      <IconButton color="info">
                        <Edit />
                      </IconButton>
                    </Link>

                    <IconButton color="error" onClick={() => handleOpenDialog(user.id)}>
                      <Delete />
                    </IconButton>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

export default Users;
