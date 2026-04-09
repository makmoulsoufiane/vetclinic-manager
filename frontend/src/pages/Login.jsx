import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PetsRoundedIcon from '@mui/icons-material/PetsRounded';
import MedicalServicesRoundedIcon from '@mui/icons-material/MedicalServicesRounded';
import EventNoteRoundedIcon from '@mui/icons-material/EventNoteRounded';
import { authAPI } from '../api/auth.api';
import Input from '../components/Input';
import Button from '../components/Button';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await authAPI.login({ email, password });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      navigate('/');
    } catch {
      setError('Email ou mot de passe incorrect');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(108,183,203,0.18),_transparent_28%),linear-gradient(180deg,_#edf5fc_0%,_#dfeeff_100%)] px-4 py-10">
      <div className="w-full max-w-xl overflow-hidden rounded-[28px] border border-white/70 bg-white/95 shadow-[0_28px_70px_rgba(31,60,104,0.18)]">
        <div className="relative overflow-hidden border-b border-slate-100 bg-[linear-gradient(135deg,_#173f76_0%,_#225d94_55%,_#80ddd2_100%)] px-8 pb-7 pt-8 text-white">
          <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute -left-12 bottom-0 h-32 w-32 rounded-full bg-white/10 blur-2xl" />

          <div className="relative flex items-start gap-4">
            <div className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-white/18 shadow-[0_14px_30px_rgba(9,24,48,0.18)] backdrop-blur">
              <PetsRoundedIcon sx={{ fontSize: 34 }} />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/70">Vet Platform</p>
              <h1 className="mt-1 text-4xl font-semibold tracking-[-0.05em]">VetClinic Manager</h1>
              <p className="mt-2 text-lg text-white/82">Connectez-vous à votre compte</p>
            </div>
          </div>

          <div className="relative mt-6 grid grid-cols-3 gap-3">
            <div className="rounded-2xl border border-white/16 bg-white/10 px-4 py-3 backdrop-blur">
              <MedicalServicesRoundedIcon sx={{ fontSize: 22 }} />
              <p className="mt-2 text-sm font-medium">Gestion clinique</p>
            </div>
            <div className="rounded-2xl border border-white/16 bg-white/10 px-4 py-3 backdrop-blur">
              <PetsRoundedIcon sx={{ fontSize: 22 }} />
              <p className="mt-2 text-sm font-medium">Suivi des patients</p>
            </div>
            <div className="rounded-2xl border border-white/16 bg-white/10 px-4 py-3 backdrop-blur">
              <EventNoteRoundedIcon sx={{ fontSize: 22 }} />
              <p className="mt-2 text-sm font-medium">Rendez-vous</p>
            </div>
          </div>
        </div>

        <div className="p-8">
        {error && (
          <div className="mb-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="votre@email.com"
            required
          />

          <Input
            label="Mot de passe"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
          />

          <Button type="submit" disabled={loading} className="mt-3 !w-full !rounded-2xl !bg-[#1f5fce] !py-4 !text-base !font-semibold !shadow-[0_10px_24px_rgba(31,95,206,0.28)] hover:!bg-[#194faf]">
            {loading ? 'Connexion...' : 'Se connecter'}
          </Button>
        </form>

        <div className="mt-6 rounded-2xl bg-[#edf5ff] p-5 text-sm text-slate-700">
          <p className="mb-2 text-base font-semibold text-slate-900">Comptes de test :</p>
          <p><strong>Admin:</strong> admin@vetclinic.com / password</p>
          <p><strong>Vétérinaire:</strong> doctor@vetclinic.com / password</p>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
