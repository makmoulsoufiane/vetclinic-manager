import { useEffect, useState } from 'react';
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

  if (loading) return <Loading />;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-blue-100 p-6 rounded">
          <h2 className="text-xl font-semibold">Propriétaires</h2>
          <p className="text-3xl">{stats.owners}</p>
        </div>
        <div className="bg-green-100 p-6 rounded">
          <h2 className="text-xl font-semibold">Animaux</h2>
          <p className="text-3xl">{stats.animals}</p>
        </div>
        <div className="bg-yellow-100 p-6 rounded">
          <h2 className="text-xl font-semibold">Consultations</h2>
          <p className="text-3xl">{stats.consultations}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
