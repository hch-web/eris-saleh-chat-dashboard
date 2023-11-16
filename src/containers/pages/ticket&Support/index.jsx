import React, { useState } from 'react';
import { Button, Paper, Stack } from '@mui/material';

import TicketAndSupportTable from './components/TicketAndSupportTable';
import TicketDialog from './components/TicketDialog';

function TicketAndSupport() {
  const [isDialogOpen, setDialogOpen] = useState(false);

  const handleToggle = () => {
    setDialogOpen(prevState => !prevState);
  };

  return (
    <Paper className="p-3">
      <TicketDialog isOpen={isDialogOpen} handleClose={handleToggle} />

      <Stack direction="row" justifyContent="flex-end" alignItems="center" mb={4}>
        <Button size="small" variant="contained" color="primary" onClick={handleToggle}>
          Raise a Request
        </Button>
      </Stack>

      <TicketAndSupportTable />
    </Paper>
  );
}

export default TicketAndSupport;
