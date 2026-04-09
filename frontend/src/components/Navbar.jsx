import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import NotificationsNoneRoundedIcon from '@mui/icons-material/NotificationsNoneRounded';
import PetsRoundedIcon from '@mui/icons-material/PetsRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
import EventNoteRoundedIcon from '@mui/icons-material/EventNoteRounded';
import MedicalServicesRoundedIcon from '@mui/icons-material/MedicalServicesRounded';
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
    { to: '/', label: 'Dashboard', icon: DashboardRoundedIcon },
    { to: '/owners', label: 'Proprietaire', icon: PeopleAltRoundedIcon },
    { to: '/animals', label: 'Animals', icon: PetsRoundedIcon },
    { to: '/consultations', label: 'Consultaions', icon: EventNoteRoundedIcon },
    ...(isAdmin ? [{ to: '/admin/veterinarians', label: 'Vets', icon: MedicalServicesRoundedIcon }] : []),
  ];

  const isActive = (to) => (
    to === '/' ? location.pathname === '/' : location.pathname.startsWith(to)
  );

  const initials = user?.fullName
    ? user.fullName
      .split(' ')
      .map((part) => part[0])
      .join('')
      .slice(0, 2)
      .toUpperCase()
    : 'VC';

  return (
    <header className="relative z-20 border-b border-white/10 bg-[#123766] text-white shadow-[0_18px_50px_rgba(8,27,59,0.32)]">
      <div className="mx-auto flex max-w-[1600px] items-center gap-4 px-4 py-4 sm:px-6 lg:flex-nowrap lg:px-8">
        <div className="flex min-w-[260px] shrink-0 items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-[#8eb7ff] to-[#5fd0c7] text-[#123766] shadow-[0_10px_24px_rgba(89,194,204,0.3)]">
            <PetsRoundedIcon fontSize="medium" />
          </div>
          <div>
            <p className="text-[15px] font-semibold tracking-[0.08em] text-white/70 uppercase">VetClinic</p>
            <p className="text-[28px] font-semibold leading-none tracking-[-0.04em]">Manager</p>
          </div>
        </div>

        <div className="flex min-w-0 flex-1 items-center justify-center">
          <nav className="flex flex-nowrap items-center gap-3 overflow-x-auto pb-1">
            {links.map(({ to, label, icon: Icon }) => (
              <RouterLink
                key={to}
                to={to}
                className={`inline-flex h-14 shrink-0 items-center gap-2 rounded-full px-6 text-[15px] font-medium transition ${
                  isActive(to)
                    ? 'bg-white text-[#123766] shadow-[0_10px_24px_rgba(255,255,255,0.18)]'
                    : 'bg-white/8 text-white/78 hover:bg-white/14 hover:text-white'
                }`}
              >
                <Icon sx={{ fontSize: 18 }} />
                <span>{label}</span>
              </RouterLink>
            ))}
          </nav>
        </div>

        <div className="ml-auto flex shrink-0 items-center gap-3">
          <div className="hidden h-14 items-center gap-3 rounded-full border border-white/12 bg-white/8 px-3 pr-4 sm:flex">
            <div className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-[#dce8ff] to-[#88d6cf] text-sm font-semibold text-[#123766]">
              {initials}
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold">{user?.fullName || 'VetClinic User'}</p>
              <p className="text-xs uppercase tracking-[0.16em] text-white/60">{user?.role || 'member'}</p>
            </div>
          </div>

          <button
            type="button"
            className="grid h-14 w-14 shrink-0 place-items-center rounded-full border border-white/12 bg-white/8 text-white transition hover:bg-white/14"
            aria-label="Notifications"
          >
            <div className="relative">
              <NotificationsNoneRoundedIcon />
              <span className="absolute -right-0.5 top-0 h-2.5 w-2.5 rounded-full bg-[#ff7c7c]" />
            </div>
          </button>

          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex h-14 shrink-0 items-center gap-2 rounded-full border border-white/12 bg-white/8 px-6 text-sm font-medium text-white transition hover:bg-white/14"
          >
            <LogoutRoundedIcon sx={{ fontSize: 18 }} />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
