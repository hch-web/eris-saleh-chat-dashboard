import React, { useCallback, useEffect, useState } from 'react';
import { TextField } from '@mui/material';
import propTypes from 'prop-types';
import { useSearchParams } from 'react-router-dom';

function FilterField({ name, label, disabled }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [innerValue, setInnerValue] = useState('');

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
  );
}

FilterField.propTypes = {
  name: propTypes.string.isRequired,
  label: propTypes.string,
  disabled: propTypes.bool,
};

FilterField.defaultProps = {
  label: '',
  disabled: false,
};

export default FilterField;
