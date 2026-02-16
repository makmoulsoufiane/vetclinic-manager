import { Box, CircularProgress, Typography } from '@mui/material';

const Loading = ({ message = 'Chargement...' }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 4, gap: 2 }}>
      <CircularProgress />
      <Typography color="text.secondary">{message}</Typography>
    </Box>
  );
};

export default Loading;
