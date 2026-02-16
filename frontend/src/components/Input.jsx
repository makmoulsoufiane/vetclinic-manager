import TextField from '@mui/material/TextField';

const Input = ({
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  required = false,
  error,
  ...props
}) => {
  return (
    <TextField
      fullWidth
      margin="normal"
      label={label}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      error={Boolean(error)}
      helperText={error || ' '}
      {...props}
    />
  );
};

export default Input;
