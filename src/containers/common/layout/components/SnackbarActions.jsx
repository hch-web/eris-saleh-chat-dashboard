import React, { useCallback } from 'react';
import { Button, Stack } from '@mui/material';
import propTypes from 'prop-types';

function SnackbarActions({ roomId, room }) {
  const handleView = useCallback(() => {
    window.location.replace(`/human-agent?i=${roomId}&rid=${room}`);
  }, [roomId]);

  return (
    <Stack direction="row" spacing={2}>
      <Button variant="contained" color="info" size="small" onClick={handleView}>
        View
      </Button>

      {/* <Button variant="contained" color="warning" size="small">
        Dismiss
      </Button> */}
    </Stack>
  );
}

SnackbarActions.propTypes = {
  roomId: propTypes.string.isRequired,
  room: propTypes.string.isRequired,
};

export default SnackbarActions;
