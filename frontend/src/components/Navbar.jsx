import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import { authAPI } from '../api/auth.api';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  const isAdmin = user?.role === 'admin';

  const handleLogout = async () => {
    try {
      await authAPI.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      navigate('/login');
    }
  };

  const links = [
    { to: '/', label: 'Dashboard' },
    { to: '/owners', label: 'Propriétaires' },
    { to: '/animals', label: 'Animaux' },
    { to: '/consultations', label: 'Consultations' },
    ...(isAdmin ? [{ to: '/admin/veterinarians', label: 'Vétérinaires' }] : []),
  ];

  return (
    <AppBar position="static" elevation={1}>
      <Toolbar sx={{ minHeight: 72 }}>
        <Typography variant="h6" sx={{ mr: 4, fontWeight: 700 }}>
          VetClinic Manager
        </Typography>
        <Stack direction="row" spacing={1} sx={{ flexGrow: 1 }}>
          {links.map((link) => (
            <Chip
              key={link.to}
              component={RouterLink}
              to={link.to}
              label={link.label}
              clickable
              color={location.pathname.startsWith(link.to) && !(link.to === '/' && location.pathname !== '/')
                ? 'secondary'
                : 'default'}
              variant={location.pathname === link.to || (link.to !== '/' && location.pathname.startsWith(link.to))
                ? 'filled'
                : 'outlined'}
              sx={{ color: 'white', borderColor: 'rgba(255,255,255,0.3)' }}
            />
          ))}
        </Stack>
        <Box>
          <Button color="inherit" variant="outlined" onClick={handleLogout}>
            Déconnexion
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
