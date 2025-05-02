import React from "react";
import {
  TextField,
  MenuItem,
  Button,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  FormHelperText,
} from "@mui/material";
import { visuallyHidden } from '@mui/utils';

export const FormField = ({
  type = "text",
  label,
  name,
  value,
  onChange,
  options = [],
  rows = 4,
  required = false,
  accept = "",
  selectedFile = null,
  onFileChange = null,
  sx = {},
  error = null,
  helperText = "",
  disabled = false,
  ...props
}) => {
  const fieldId = `${name}-field`;
  const labelId = `${name}-label`;
  const helperTextId = `${name}-helper`;

  if (type === "select") {
    return (
      <FormControl 
        fullWidth 
        margin="normal" 
        required={required}
        error={Boolean(error)}
        disabled={disabled}
        sx={sx}
        {...props}
      >
        <InputLabel id={labelId}>{label}</InputLabel>
        <Select
          labelId={labelId}
          id={fieldId}
          name={name}
          value={value}
          label={label}
          onChange={onChange}
          aria-labelledby={labelId}
          aria-describedby={helperText ? helperTextId : undefined}
          aria-invalid={Boolean(error)}
        >
          {options.map((option) => (
            <MenuItem 
              key={option.value} 
              value={option.value}
              aria-selected={value === option.value}
            >
              {option.label}
            </MenuItem>
          ))}
        </Select>
        {helperText && (
          <FormHelperText id={helperTextId}>
            {helperText}
          </FormHelperText>
        )}
      </FormControl>
    );
  }

  if (type === "file") {
    return (
      <Box mt={2} mb={3} sx={sx}>
        <input
          accept={accept}
          id={`${name}-upload`}
          name={name}
          type="file"
          onChange={onFileChange}
          style={{ display: "none" }}
          disabled={disabled}
          aria-describedby={helperText ? helperTextId : undefined}
          {...props}
        />
        <label htmlFor={`${name}-upload`}>
          <Button 
            variant="outlined" 
            component="span"
            disabled={disabled}
            aria-labelledby={`${name}-upload-label`}
          >
            <span id={`${name}-upload-label`} style={visuallyHidden}>
              {label}
            </span>
            {selectedFile ? "Change File" : "Select File"}
          </Button>
        </label>
        {selectedFile && (
          <Typography 
            variant="body2" 
            sx={{ mt: 1 }}
            id={`${name}-filename`}
          >
            Selected: {selectedFile.name}
          </Typography>
        )}
        {helperText && (
          <FormHelperText id={helperTextId}>
            {helperText}
          </FormHelperText>
        )}
      </Box>
    );
  }

  return (
    <TextField
      fullWidth
      margin="normal"
      label={label}
      name={name}
      id={fieldId}
      value={value}
      onChange={onChange}
      required={required}
      multiline={type === "multiline"}
      rows={type === "multiline" ? rows : undefined}
      sx={sx}
      error={Boolean(error)}
      helperText={helperText}
      disabled={disabled}
      aria-labelledby={labelId}
      aria-describedby={helperText ? helperTextId : undefined}
      aria-invalid={Boolean(error)}
      {...props}
    />
  );
};