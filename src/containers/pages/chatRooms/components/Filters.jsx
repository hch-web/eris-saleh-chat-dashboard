import React, { memo } from 'react';
import { Stack } from '@mui/material';

import FilterResetBtn from 'shared/FilterResetBtn';
import FilterSelectField from 'shared/FilterSelectField';
import { ratingSelectOptions } from 'utilities/selectOptions';
import FilterDateField from 'shared/FilterDateField';

function Filters() {
  return (
    <Stack direction="row" flexWrap={{ xs: 'wrap', md: 'nowrap' }} mb={2} columnGap={2} rowGap={2}>
      <FilterDateField name="start_date" label="Start Date" />

      <FilterDateField name="end_date" label="End Date" />

      <FilterSelectField name="rating" label="Rating" options={ratingSelectOptions} />

      <FilterResetBtn />
    </Stack>
  );
}

export default memo(Filters);
