import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { animalsAPI } from '../../api/animals.api';
import { ownersAPI } from '../../api/owners.api';
import Card from '../../components/Card';
import Button from '../../components/Button';
import Table from '../../components/Table';
import Loading from '../../components/Loading';

const AnimalsList = () => {
  const [animals, setAnimals] = useState([]);
  const [owners, setOwners] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [animalsResponse, ownersResponse] = await Promise.all([
        animalsAPI.getAll(),
        ownersAPI.getAll()
      ]);
      setAnimals(animalsResponse.data);
      setOwners(ownersResponse.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet animal ?')) {
      try {
        await animalsAPI.delete(id);
        fetchData();
      } catch (error) {
        console.error('Error deleting animal:', error);
      }
    }
  };

  const getOwnerName = (ownerId) => {
    const owner = owners.find(o => o.id === parseInt(ownerId));
    return owner ? `${owner.firstName} ${owner.lastName}` : 'N/A';
  };

  const columns = [
    { header: 'Nom', field: 'name' },
    { header: 'Espèce', field: 'species' },
    { header: 'Race', field: 'breed' },
    { header: 'Date de naissance', field: 'birthDate' },
    {
      header: 'Propriétaire',
      render: (animal) => getOwnerName(animal.ownerId)
    },
  ];

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Animaux</h1>
        <Link to="/animals/new">
          <Button>+ Ajouter</Button>
        </Link>
      </div>



      <Card>
        {loading ? (
          <Loading />
        ) : (
          <Table
            columns={columns}
            data={animals}
            actions={(animal) => (
              <>
                <Button
                  variant="secondary"
                  onClick={() => navigate(`/animals/${animal.id}`)}
                  className="text-sm"
                >
                  Détails
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => navigate(`/animals/edit/${animal.id}`)}
                  className="text-sm"
                >
                  Modifier
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleDelete(animal.id)}
                  className="text-sm"
                >
                  Supprimer
                </Button>
              </>
            )}
          />
        )}
      </Card>
      <div className="flex justify-end mt-6">
        <Link to="/">
          <Button>+ Return into Dashboard</Button>
        </Link>
      </div>
    </div>
  );
};

export default AnimalsList;
