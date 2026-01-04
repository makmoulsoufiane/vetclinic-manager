import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ownersAPI } from '../../api/owners.api';
import Card from '../../components/Card';
import Button from '../../components/Button';
import Table from '../../components/Table';
import Loading from '../../components/Loading';

const OwnersList = () => {
  const [owners, setOwners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchOwners();
  }, []);

  const fetchOwners = async () => {
    try {
      const response = await ownersAPI.getAll();
      setOwners(response.data);
    } catch (error) {
      console.error('Error fetching owners:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce propriétaire ?')) {
      try {
        await ownersAPI.delete(id);
        fetchOwners();
      } catch (error) {
        console.error('Error deleting owner:', error);
      }
    }
  };

  const filteredOwners = owners.filter(owner =>
    `${owner.firstName} ${owner.lastName}`.toLowerCase().includes(search.toLowerCase()) ||
    owner.phone.includes(search)
  );

  const columns = [
    { header: 'Nom', field: 'lastName' },
    { header: 'Prénom', field: 'firstName' },
    { header: 'Téléphone', field: 'phone' },
    { header: 'Email', field: 'email' },
  ];

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Propriétaires</h1>
        <Link to="/owners/new">
          <Button>+ Ajouter</Button>
        </Link>
      </div>

      <Card className="mb-6">
        <input
          type="text"
          placeholder="Rechercher par nom ou téléphone..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </Card>

      <Card>
        {loading ? (
          <Loading />
        ) : (
          <Table
            columns={columns}
            data={filteredOwners}
            actions={(owner) => (
              <>
                <Button
                  variant="secondary"
                  onClick={() => navigate(`/owners/edit/${owner.id}`)}
                  className="text-sm"
                >
                  Modifier
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleDelete(owner.id)}
                  className="text-sm"
                >
                  Supprimer
                </Button>
              </>
            )}
          />
        )}
      </Card>
    </div>
  );
};

export default OwnersList;
