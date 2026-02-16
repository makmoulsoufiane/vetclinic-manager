import MuiButton from '@mui/material/Button';

const Button = ({
  children,
  variant = 'primary',
  type = 'button',
  onClick,
  disabled,
  className = '',
}) => {
  const variantMap = {
    primary: { color: 'primary', variant: 'contained' },
    secondary: { color: 'secondary', variant: 'outlined' },
    danger: { color: 'error', variant: 'contained' },
    success: { color: 'success', variant: 'contained' },
  };

  const mapped = variantMap[variant] || variantMap.primary;

  return (
    <MuiButton
      type={type}
      onClick={onClick}
      disabled={disabled}
      color={mapped.color}
      variant={mapped.variant}
      className={className}
    >
      {children}
    </MuiButton>
  );
};

export default Button;
