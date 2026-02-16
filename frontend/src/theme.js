import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0b57d0',
    },
    secondary: {
      main: '#0f766e',
    },
    background: {
      default: '#f5f7fb',
      paper: '#ffffff',
    },
  },
  shape: {
    borderRadius: 10,
  },
  typography: {
    fontFamily: 'Outfit, sans-serif',
    h3: {
      fontWeight: 700,
    },
  },
});

export default theme;
