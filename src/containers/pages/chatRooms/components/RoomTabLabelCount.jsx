import React, { memo } from 'react';
import { Box, Stack, Typography, useTheme } from '@mui/material';
import propTypes from 'prop-types';

function RoomTabLabelCount({ label, count, isActive }) {
  const { palette } = useTheme();
  const primary = palette.secondary.main;

  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <Typography fontWeight={isActive ? 600 : undefined} variant="caption">
        {label}
      </Typography>

      {!!count && (
        <Box
          bgcolor={primary}
          sx={{ minWidth: '20px', height: '20px', fontSize: '9px' }}
          className="d-flex align-items-center justify-content-center rounded-circle px-1 "
        >
          <Typography fontWeight={500} color="white" fontSize={12} variant="caption">
            {count}
          </Typography>
        </Box>
      )}
    </Stack>
  );
}

RoomTabLabelCount.propTypes = {
  label: propTypes.string.isRequired,
  count: propTypes.number,
  isActive: propTypes.bool,
};

RoomTabLabelCount.defaultProps = {
  count: null,
  isActive: false,
};

export default memo(RoomTabLabelCount);
