import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PetsRoundedIcon from '@mui/icons-material/PetsRounded';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
import EventNoteRoundedIcon from '@mui/icons-material/EventNoteRounded';
import PaymentsRoundedIcon from '@mui/icons-material/PaymentsRounded';
import NorthEastRoundedIcon from '@mui/icons-material/NorthEastRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import PendingRoundedIcon from '@mui/icons-material/PendingRounded';
import NotificationsActiveRoundedIcon from '@mui/icons-material/NotificationsActiveRounded';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import ArrowDownwardRoundedIcon from '@mui/icons-material/ArrowDownwardRounded';
import { animalsAPI } from '../api/animals.api';
import { consultationsAPI } from '../api/consultations.api';
import { ownersAPI } from '../api/owners.api';
import Loading from '../components/Loading';

const Dashboard = () => {
  const [stats, setStats] = useState({
    owners: 0,
    animals: 0,
    consultations: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const [ownersResponse, animalsResponse, consultationsResponse] = await Promise.all([
          ownersAPI.getAll(),
          animalsAPI.getAll(),
          consultationsAPI.getAll(),
        ]);

        setStats({
          owners: ownersResponse.data.length,
          animals: animalsResponse.data.length,
          consultations: consultationsResponse.data.length,
        });
      } catch (error) {
        console.error('Error loading dashboard stats:', error);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  if (loading) return <Loading message="Loading clinic dashboard..." />;

  const currentUser = JSON.parse(localStorage.getItem('user') || 'null');
  const revenueEstimate = (stats.consultations * 125).toLocaleString();

  const statCards = [
    {
      label: 'Total Owners',
      value: stats.owners.toLocaleString(),
      icon: PeopleAltRoundedIcon,
      iconClass: 'bg-[#cbeeff] text-[#123766]',
      accentClass: 'from-[#d9f3ff] to-[#b9e5ff]',
      borderClass: 'before:bg-[#c3ebff]',
    },
    {
      label: 'Total Pets',
      value: stats.animals.toLocaleString(),
      icon: PetsRoundedIcon,
      iconClass: 'bg-[#1ea8a1] text-white',
      accentClass: 'from-[#d3faf3] to-[#bdf4ec]',
      borderClass: 'before:bg-[#1ea8a1]',
    },
    {
      label: 'Appointments Today',
      value: stats.consultations.toLocaleString(),
      icon: EventNoteRoundedIcon,
      iconClass: 'bg-[#e9edf4] text-[#324766]',
      accentClass: 'from-[#f3f7fb] to-[#e7edf5]',
      borderClass: 'before:bg-[#dbe2ec]',
    },
    {
      label: 'Revenue (Est.)',
      value: `$${revenueEstimate}`,
      icon: PaymentsRoundedIcon,
      iconClass: 'bg-[#163867] text-white',
      accentClass: 'from-[#d9e7ff] to-[#c7dbff]',
      borderClass: 'before:bg-[#163867]',
    },
  ];

  const appointmentRows = [
    {
      time: '10:00 AM',
      patient: `${stats.animals} active pet records`,
      owner: `${stats.owners} registered owners`,
      type: 'Overview',
      status: 'Confirmed',
    },
    {
      time: '11:30 AM',
      patient: `${stats.consultations} consultations tracked`,
      owner: currentUser?.fullName || 'Clinic staff',
      type: 'Schedule',
      status: 'Pending',
    },
    {
      time: '02:00 PM',
      patient: 'Manage owner registrations',
      owner: currentUser?.role || 'team',
      type: 'Workflow',
      status: 'Confirmed',
    },
    {
      time: '04:15 PM',
      patient: 'Review daily clinic activity',
      owner: 'VetClinic Manager',
      type: 'Admin',
      status: 'Pending',
    },
  ];

  const activityItems = [
    `${currentUser?.fullName || 'A team member'} accessed the dashboard.`,
    `${stats.owners} owners are available in the system.`,
    `${stats.animals} pets and ${stats.consultations} consultations are synced.`,
  ];

  const quickActions = [
    { label: 'New Appointment', to: '/consultations/new' },
    { label: 'Add Patient', to: '/animals/new' },
    { label: 'Register Owner', to: '/owners/new' },
  ];

  return (
    <main className="min-h-[calc(100vh-92px)] bg-[radial-gradient(circle_at_top,_rgba(103,189,208,0.18),_transparent_30%),linear-gradient(180deg,_#f6fbff_0%,_#eef5fb_40%,_#f8fbff_100%)] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1400px]">
        <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {statCards.map(({ label, value, icon: Icon, iconClass, accentClass, borderClass }) => (
            <article
              key={label}
              className={`relative overflow-hidden rounded-[26px] border border-slate-200/80 bg-white/90 p-6 shadow-[0_18px_45px_rgba(26,55,90,0.1)] backdrop-blur before:absolute before:inset-x-0 before:bottom-0 before:h-1.5 ${borderClass}`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${accentClass} opacity-35`} />
              <div className="relative flex items-center gap-4">
                <div className={`grid h-14 w-14 place-items-center rounded-2xl shadow-[0_12px_28px_rgba(17,24,39,0.08)] ${iconClass}`}>
                  <Icon sx={{ fontSize: 28 }} />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500">{label}</p>
                  <p className="text-[2.2rem] font-semibold tracking-[-0.05em] text-slate-900">{value}</p>
                </div>
              </div>
            </article>
          ))}
        </section>

        <section className="mt-6 grid gap-5 xl:grid-cols-[minmax(0,2.1fr)_320px]">
          <article className="overflow-hidden rounded-[28px] border border-slate-200/80 bg-white/92 shadow-[0_24px_60px_rgba(16,43,79,0.12)]">
            <div className="flex flex-col gap-4 border-b border-slate-200/80 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-[2rem] font-semibold tracking-[-0.05em] text-slate-900">Upcoming Appointments</h1>
                <p className="text-sm text-slate-500">A redesigned clinic overview using your live Laravel-powered totals.</p>
              </div>
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 shadow-[0_8px_20px_rgba(15,23,42,0.06)]"
              >
                <span>All trackers</span>
                <KeyboardArrowDownRoundedIcon sx={{ fontSize: 18 }} />
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full text-left">
                <thead className="bg-[linear-gradient(180deg,_#f9fbfe_0%,_#f0f6fb_100%)] text-sm text-slate-600">
                  <tr>
                    <th className="px-5 py-4 font-semibold">
                      <span className="inline-flex items-center gap-2">
                        Time
                        <ArrowDownwardRoundedIcon sx={{ fontSize: 16 }} />
                      </span>
                    </th>
                    <th className="px-5 py-4 font-semibold">Patient</th>
                    <th className="px-5 py-4 font-semibold">Owner</th>
                    <th className="px-5 py-4 font-semibold">Type</th>
                    <th className="px-5 py-4 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {appointmentRows.map((row, index) => {
                    const confirmed = row.status === 'Confirmed';

                    return (
                      <tr key={`${row.time}-${index}`} className="border-t border-slate-200/80 text-[15px] text-slate-700">
                        <td className="px-5 py-4 font-medium text-slate-900">{row.time}</td>
                        <td className="px-5 py-4">{row.patient}</td>
                        <td className="px-5 py-4">{row.owner}</td>
                        <td className="px-5 py-4">{row.type}</td>
                        <td className="px-5 py-4">
                          <span
                            className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium ${
                              confirmed
                                ? 'bg-[#d7f5df] text-[#24633a]'
                                : 'bg-[#fff1bf] text-[#8a6b00]'
                            }`}
                          >
                            {confirmed ? <CheckCircleRoundedIcon sx={{ fontSize: 16 }} /> : <PendingRoundedIcon sx={{ fontSize: 16 }} />}
                            {row.status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </article>

          <div className="space-y-5">
            <aside className="rounded-[28px] border border-slate-200/80 bg-white/92 p-5 shadow-[0_24px_60px_rgba(16,43,79,0.12)]">
              <h2 className="text-[1.65rem] font-semibold tracking-[-0.05em] text-slate-900">Recent Activity</h2>
              <div className="mt-5 space-y-5">
                {activityItems.map((item, index) => (
                  <div key={item} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className="grid h-10 w-10 place-items-center rounded-full bg-[#dff3ff] text-[#123766]">
                        <NotificationsActiveRoundedIcon sx={{ fontSize: 20 }} />
                      </div>
                      {index !== activityItems.length - 1 && <div className="mt-2 h-full w-px bg-slate-200" />}
                    </div>
                    <p className="pt-1 text-[15px] leading-7 text-slate-700">{item}</p>
                  </div>
                ))}
              </div>
            </aside>

            <aside className="rounded-[28px] border border-slate-200/80 bg-white/92 p-5 shadow-[0_24px_60px_rgba(16,43,79,0.12)]">
              <h2 className="text-[1.65rem] font-semibold tracking-[-0.05em] text-slate-900">Quick Actions</h2>
              <div className="mt-5 space-y-3">
                {quickActions.map((action) => (
                  <Link
                    key={action.to}
                    to={action.to}
                    className="flex items-center justify-center gap-2 rounded-2xl bg-[linear-gradient(90deg,_#173d70_0%,_#173d70_70%,_#1d4e87_100%)] px-4 py-4 text-sm font-medium text-white shadow-[0_14px_28px_rgba(17,47,90,0.2)] transition hover:-translate-y-0.5"
                  >
                    <span>{action.label}</span>
                    <NorthEastRoundedIcon sx={{ fontSize: 18 }} />
                  </Link>
                ))}
              </div>
            </aside>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Dashboard;
