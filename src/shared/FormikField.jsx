import React, { memo, useCallback, useMemo, useState } from 'react';
import { Box, FormLabel, IconButton, TextField } from '@mui/material';
import propTypes from 'prop-types';
import { useField, useFormikContext } from 'formik';
import { Visibility, VisibilityOff } from '@mui/icons-material';

function FormikField({
  variant,
  fieldLabel,
  name,
  disabled,
  type,
  className,
  multiline,
  maxRows,
  minRows,
  label,
  placeholder,
  size,
}) {
  const [isVisible, setVisible] = useState(false);
  const [field, meta] = useField(name || '');
  const { value, onChange, onBlur } = field;
  const { error, touched } = meta;
  const { handleSubmit } = useFormikContext();

  const toggleVisibility = () => {
    setVisible(prevState => !prevState);
  };

  const handleChange = useCallback(
    e => {
      onChange(e);
    },
    [onChange]
  );

  const handleKeyDown = useCallback(
    e => {
      const { key } = e;

      if (key === 'Enter' && multiline) {
        e.preventDefault();
        handleSubmit();
      }
    },
    [multiline]
  );

  const isError = useMemo(() => !!(error && touched), [error, touched]);
  const isPassword = useMemo(() => type === 'password', [type]);
  const passwordIcon = useMemo(() => {
    if (isPassword) {
      return (
        <IconButton onClick={toggleVisibility}>
          {isVisible ? <VisibilityOff /> : <Visibility />}
        </IconButton>
      );
    }

    return undefined;
  }, [isVisible, isPassword]);

  const inputType = useMemo(() => {
    if (isPassword) {
      if (isVisible) {
        return 'text';
      }

      return 'password';
    }

    return type;
  }, [isPassword, isVisible, type]);

  return (
    <Box className="w-100">
      {label && <FormLabel className="mb-2">{label}</FormLabel>}

      <TextField
        multiline={multiline}
        className={className}
        name={name}
        placeholder={placeholder}
        variant={variant}
        label={fieldLabel}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onBlur={onBlur}
        error={isError}
        disabled={disabled}
        helperText={isError ? error : ''}
        type={inputType}
        fullWidth
        InputProps={{ endAdornment: passwordIcon }}
        minRows={minRows}
        maxRows={maxRows}
        size={size}
      />
    </Box>
  );
}

FormikField.propTypes = {
  name: propTypes.string.isRequired,
  variant: propTypes.string,
  className: propTypes.string,
  fieldLabel: propTypes.string,
  disabled: propTypes.bool,
  type: propTypes.string,
  multiline: propTypes.bool,
  maxRows: propTypes.number,
  minRows: propTypes.number,
  label: propTypes.string,
  placeholder: propTypes.string,
  size: propTypes.oneOf(['small', 'medium']),
};

FormikField.defaultProps = {
  variant: 'standard',
  className: '',
  fieldLabel: undefined,
  disabled: false,
  type: 'text',
  multiline: false,
  maxRows: 4,
  minRows: 4,
  label: '',
  placeholder: '',
  size: 'small',
};

export default memo(FormikField);
