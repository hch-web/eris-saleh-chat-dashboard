import React, { useMemo } from 'react';
import {
  Box,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import propTypes from 'prop-types';
import { useField } from 'formik';

function FormikSelectField({ label, options, name, disabled, variant }) {
  const [field, meta] = useField(name || '');
  const { value, onChange, onBlur } = field;
  const { error, touched } = meta;

  const isError = useMemo(() => !!(error && touched), [error, touched]);

  return (
    <Box sx={{ minWidth: 180 }}>
      <FormControl variant={variant} disabled={disabled} fullWidth size="small">
        <InputLabel>{label}</InputLabel>

        <Select
          label={label}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          error={isError}
        >
          {options?.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option?.label}
            </MenuItem>
          ))}
        </Select>

        {isError && <FormHelperText error={isError}>{error}</FormHelperText>}
      </FormControl>
    </Box>
  );
}

FormikSelectField.propTypes = {
  name: propTypes.string.isRequired,
  label: propTypes.string.isRequired,
  variant: propTypes.string,
  disabled: propTypes.bool,
  options: propTypes.arrayOf(
    propTypes.shape({
      value: propTypes.oneOfType([propTypes.string, propTypes.number]),
      label: propTypes.string,
    })
  ).isRequired,
};

FormikSelectField.defaultProps = {
  disabled: false,
  variant: 'standard',
};

export default FormikSelectField;
