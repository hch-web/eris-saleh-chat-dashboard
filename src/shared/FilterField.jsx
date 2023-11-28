import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Box, TextField } from '@mui/material';
import propTypes from 'prop-types';
import { useSearchParams } from 'react-router-dom';
import { useDebouncedCallback } from 'use-debounce';

function FilterField({ name, label, disabled, onChange }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [innerValue, setInnerValue] = useState('');
  const paramValue = useMemo(() => searchParams.get(name), [searchParams]);

  const handleDebounce = useDebouncedCallback(params => {
    setSearchParams(params);
  }, 500);

  useEffect(() => {
    if (paramValue !== null && paramValue !== undefined) {
      setInnerValue(paramValue);
    } else {
      setInnerValue('');
    }
  }, [paramValue]);

  const handleChange = useCallback(
    e => {
      const value = e.target?.value?.toLowerCase();

      if (value !== '') {
        handleDebounce({ ...searchParams, [name]: value, filters: true });
      } else {
        searchParams.delete(name);
        handleDebounce(searchParams);
      }

      if (onChange) onChange(value, name);
      setInnerValue(value);
    },
    [searchParams]
  );

  return (
    <Box sx={{ minWidth: 140, maxWidth: 160 }}>
      <TextField
        name={name}
        variant="outlined"
        label={label}
        value={innerValue}
        onChange={handleChange}
        disabled={disabled}
        type="text"
        size="small"
      />
    </Box>
  );
}

FilterField.propTypes = {
  name: propTypes.string.isRequired,
  label: propTypes.string,
  disabled: propTypes.bool,
  onChange: propTypes.func,
};

FilterField.defaultProps = {
  label: '',
  disabled: false,
  onChange: null,
};

export default FilterField;
