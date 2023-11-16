import React from 'react';
import { Backdrop, CircularProgress } from '@mui/material';
import propTypes from 'prop-types';

function BackdropLoader({ open }) {
  return (
    <Backdrop open={open} sx={{ zIndex: '99999999' }}>
      <CircularProgress color="whiteColor" size={100} />
    </Backdrop>
  );
}

BackdropLoader.propTypes = {
  open: propTypes.bool,
};

BackdropLoader.defaultProps = {
  open: false,
};

export default BackdropLoader;
