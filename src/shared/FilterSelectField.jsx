import React, { useCallback, useEffect, useState } from 'react';
import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import propTypes from 'prop-types';
import { useSearchParams } from 'react-router-dom';

function FilterSelectField({ label, options, name }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [innerValue, setInnerValue] = useState('');

  useEffect(() => {
    if (searchParams.size === 0) {
      setInnerValue('');
    }
  }, [searchParams]);

  useEffect(() => {
    const value = searchParams.get(name);

    if (innerValue !== '') {
      setSearchParams({ ...searchParams, [name]: innerValue });
    } else if (value !== null && value !== undefined) {
      setSearchParams({ ...searchParams, [name]: value });
      setInnerValue(value);
    }
  }, [innerValue]);

  const handleChange = useCallback(
    e => {
      const { value } = e.target;

      setInnerValue(value);
    },
    [searchParams]
  );

  return (
    <Box sx={{ minWidth: 180 }}>
      <FormControl fullWidth size="small">
        <InputLabel>{label}</InputLabel>

        <Select label={label} name={name} value={innerValue} onChange={handleChange}>
          {options?.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option?.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}

FilterSelectField.propTypes = {
  name: propTypes.string.isRequired,
  label: propTypes.string.isRequired,
  options: propTypes.arrayOf(
    propTypes.shape({
      value: propTypes.oneOfType([propTypes.string, propTypes.number]),
      label: propTypes.string,
    })
  ).isRequired,
};

export default FilterSelectField;
