import React from 'react';
import { Stack } from '@mui/material';

import { ratingSelectOptions } from 'utilities/selectOptions';
import FilterSelectField from 'shared/FilterSelectField';
import FilterResetBtn from 'shared/FilterResetBtn';

function Filters() {
  return (
    <Stack direction="row" justifyContent="flex-end" mb={2} spacing={2}>
      <FilterSelectField name="rating" label="Rating" options={ratingSelectOptions} />

      <FilterResetBtn />
    </Stack>
  );
}

export default Filters;
