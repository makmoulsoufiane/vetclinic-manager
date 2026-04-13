import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PetsRoundedIcon from '@mui/icons-material/PetsRounded';
import MedicalServicesRoundedIcon from '@mui/icons-material/MedicalServicesRounded';
import EventNoteRoundedIcon from '@mui/icons-material/EventNoteRounded';
import InsightsRoundedIcon from '@mui/icons-material/InsightsRounded';
import ShieldRoundedIcon from '@mui/icons-material/ShieldRounded';
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';
import { authAPI } from '../api/auth.api';
import Input from '../components/Input';
import Button from '../components/Button';
import './Login.css';

const featureCards = [
  {
    icon: MedicalServicesRoundedIcon,
    title: 'Consultations fluides',
    text: 'Centralisez les soins, prescriptions et historiques cliniques dans une seule interface.',
  },
  {
    icon: EventNoteRoundedIcon,
    title: 'Agenda intelligent',
    text: 'Organisez les rendez-vous, suivis et rappels sans perdre le rythme de la journée.',
  },
  {
    icon: InsightsRoundedIcon,
    title: 'Vue d ensemble rapide',
    text: 'Gardez un oeil sur les patients, les proprietaires et l activite du cabinet.',
  },
];

const trustItems = [
  'Acces securise pour l equipe',
  'Suivi des animaux et dossiers',
  'Experience claire sur mobile et desktop',
];

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
    <div className="login-page min-h-screen px-4 py-5 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-2.5rem)] w-full max-w-7xl flex-col overflow-hidden rounded-[32px] border border-white/60 bg-white/55 shadow-[0_30px_90px_rgba(16,40,78,0.18)] ">
        <header className="border-b border-slate-200/70 px-5 py-4 sm:px-8 lg:px-10">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#1d4f91] text-white shadow-[0_16px_32px_rgba(29,79,145,0.28)]">
                <PetsRoundedIcon sx={{ fontSize: 28 }} />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Vet Platform</p>
                <h1 className="text-xl font-semibold tracking-[-0.03em] text-slate-900">VetClinic Manager</h1>
              </div>
            </div>

            <nav className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <a href="#fonctionnalites" className="rounded-full px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-white/70 hover:text-slate-900">
                Fonctionnalites
              </a>
              <a href="#acces" className="rounded-full px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-white/70 hover:text-slate-900">
                Email & mot de passe
              </a>
              <a
                href="#acces"
                className="inline-flex items-center justify-center rounded-full bg-[#1f5fce] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_14px_30px_rgba(31,95,206,0.24)] transition hover:bg-[#194faf]"
              >
                Se connecter
              </a>
            </nav>
          </div>
        </header>

        <main className="flex-1 px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
            <section>
              <div className="landing-hero overflow-hidden rounded-[30px] p-6 text-white sm:p-8 lg:p-10">
                <div className="max-w-2xl">
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm">
                    <ShieldRoundedIcon sx={{ fontSize: 18 }} />
                    Espace securise pour votre clinique veterinaire
                  </div>
                  <h2 className="mt-5 text-4xl font-semibold leading-tight tracking-[-0.05em] sm:text-5xl">
                    Une landing page claire pour gerer votre cabinet et accueillir votre equipe.
                  </h2>
                  <p className="mt-5 max-w-xl text-base text-white/82 sm:text-lg">
                    Presentez votre plateforme, mettez en avant les points forts du cabinet, puis laissez vos utilisateurs se connecter rapidement avec leur email et mot de passe.
                  </p>

                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <a
                      href="#acces"
                      className="inline-flex items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#173f76] transition hover:bg-slate-100"
                    >
                      Se connecter
                      <KeyboardArrowRightRoundedIcon sx={{ fontSize: 20, marginLeft: '6px' }} />
                    </a>
                    <a
                      href="#fonctionnalites"
                      className="inline-flex items-center justify-center rounded-full border border-white/25 bg-white/10 px-5 py-3 text-sm font-semibold text-white  transition hover:bg-white/16"
                    >
                      Voir les cartes
                    </a>
                  </div>
                </div>

                <div className="mt-8 grid gap-4 sm:grid-cols-3">
                  {trustItems.map((item) => (
                    <div key={item} className="rounded-2xl border border-white/16 bg-white/10 px-4 py-4">
                      <p className="text-sm font-medium text-white">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <aside id="acces" className="login-panel rounded-[30px] p-6 sm:p-8">
              <div className="flex items-start gap-4">
                <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-[#1f5fce] text-white shadow-[0_16px_28px_rgba(31,95,206,0.22)]">
                  <PetsRoundedIcon sx={{ fontSize: 30 }} />
                </div>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Connexion</p>
                  <h2 className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-slate-900">Email et mot de passe</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Connectez-vous pour acceder au tableau de bord, aux consultations et au suivi des rendez-vous.
                  </p>
                </div>
              </div>

              {error && (
                <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-red-700">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="mt-6">
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

                <Button
                  type="submit"
                  disabled={loading}
                  className="mt-3 !w-full !rounded-2xl !bg-[#1f5fce] !py-4 !text-base !font-semibold !shadow-[0_12px_28px_rgba(31,95,206,0.26)] hover:!bg-[#194faf]"
                >
                  {loading ? 'Connexion...' : 'Se connecter'}
                </Button>
              </form>

              <div className="mt-6 rounded-[24px] bg-[#eef5ff] p-5 text-sm text-slate-700">
                <p className="text-base font-semibold text-slate-900">Comptes de test</p>
                <p className="mt-3"><strong>Admin:</strong> admin@vetclinic.com / password</p>
                <p className="mt-1"><strong>Veterinaire:</strong> doctor@vetclinic.com / password</p>
              </div>
            </aside>

            <section id="fonctionnalites" className="cards-grid mx-auto grid max-w-5xl gap-4 lg:col-span-2 md:grid-cols-3">
              {featureCards.map(({ icon: Icon, title, text }) => (
                <article key={title} className="landing-card rounded-[26px] p-6 text-center">
                  <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-[#e8f1ff] text-[#1f5fce]">
                    <Icon sx={{ fontSize: 24 }} />
                  </div>
                  <h3 className="mt-5 text-xl font-semibold tracking-[-0.03em] text-slate-900">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{text}</p>
                </article>
              ))}
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Login;
