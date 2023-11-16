import React from 'react';
import { Grid, Typography } from '@mui/material';
import propTypes from 'prop-types';

function GridLabelValuePair({ label, value, mb }) {
  return (
    <Grid container mb={mb}>
      <Grid item xs={12} md={4}>
        <Typography variant="body1" fontWeight={500}>
          {label}:
        </Typography>
      </Grid>

      <Grid item xs={12} md={8}>
        <Typography variant="body1">{value}</Typography>
      </Grid>
    </Grid>
  );
}

GridLabelValuePair.propTypes = {
  label: propTypes.string.isRequired,
  value: propTypes.string.isRequired,
  mb: propTypes.number,
};

GridLabelValuePair.defaultProps = {
  mb: 2,
};

export default GridLabelValuePair;
