import React from 'react';
import { Grid, Paper, Typography } from '@mui/material';

function UnselectedChatbox() {
  return (
    <Grid item xs={6} lg={8} xl={9} order={1}>
      <Paper
        sx={{ height: '100%' }}
        className="d-flex align-items-center justify-content-center"
      >
        <Typography variant="body2" fontWeight={500} className="text-center p-2">
          Click chat to view message and feedback
        </Typography>
      </Paper>
    </Grid>
  );
}

export default UnselectedChatbox;
