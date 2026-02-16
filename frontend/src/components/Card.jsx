import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

const Card = ({ children, className = '' }) => {
  return (
    <Paper elevation={2} className={className}>
      <Box sx={{ p: 3 }}>{children}</Box>
    </Paper>
  );
};

export default Card;
