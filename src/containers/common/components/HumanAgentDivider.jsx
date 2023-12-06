import React from 'react';
import { Divider, Typography } from '@mui/material';
import propTypes from 'prop-types';

function HumanAgentDivider({ message }) {
  return (
    <Divider flexItem orientation="horizontal">
      <Typography variant="caption">{message}</Typography>
    </Divider>
  );
}

HumanAgentDivider.propTypes = {
  message: propTypes.string.isRequired,
};

export default HumanAgentDivider;
