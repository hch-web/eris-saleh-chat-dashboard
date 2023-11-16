import React, { useMemo } from 'react';
import { Button } from '@mui/material';
import { useSearchParams } from 'react-router-dom';

import { getSearchParamsObj } from 'utilities/helpers';

function FilterResetBtn() {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleResetFilters = () => {
    setSearchParams();
  };

  const hasParams = useMemo(
    () => Object.values(getSearchParamsObj(searchParams))?.length > 0,
    [searchParams]
  );

  return (
    hasParams && (
      <Button variant="contained" onClick={handleResetFilters} size="small">
        Reset
      </Button>
    )
  );
}

export default FilterResetBtn;
