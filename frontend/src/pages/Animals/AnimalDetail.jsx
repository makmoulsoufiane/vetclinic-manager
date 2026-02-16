import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { animalsAPI } from '../../api/animals.api';
import { ownersAPI } from '../../api/owners.api';
import { consultationsAPI } from '../../api/consultations.api';
import Card from '../../components/Card';
import Button from '../../components/Button';
import Table from '../../components/Table';
import Loading from '../../components/Loading';

const AnimalDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [animal, setAnimal] = useState(null);
  const [owner, setOwner] = useState(null);
  const [consultations, setConsultations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnimalDetails();
  }, [id]);

  const fetchAnimalDetails = async () => {
    try {
      const animalResponse = await animalsAPI.getById(id);
      const animalData = animalResponse.data;
      setAnimal(animalData);

      const ownerResponse = await ownersAPI.getById(animalData.ownerId);
      setOwner(ownerResponse.data);

      const consultationsResponse = await consultationsAPI.getByAnimal(id);
      setConsultations(consultationsResponse.data);
    } catch (error) {
      console.error('Error fetching animal details:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateAge = (birthDate) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  const columns = [
    { header: 'Date', field: 'date' },
    { header: 'Motif', field: 'reason' },
    { header: 'Diagnostic', field: 'diagnosis' },
  ];

  if (loading) {
    return <Loading />;
  }

  if (!animal) {
    return (
      <div className="container mx-auto p-6">
        <Card>
          <p className="text-center text-gray-600">Animal non trouvé</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Détails de l'Animal</h1>
        <div className="flex gap-2">
          <Button
            variant="secondary"
            onClick={() => navigate(`/animals/edit/${id}`)}
          >
            Modifier
          </Button>
          <Button
            variant="secondary"
            onClick={() => navigate('/animals')}
          >
            Retour
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card className="lg:col-span-2">
          <h2 className="text-xl font-semibold mb-4 text-blue-600">Informations de l'Animal</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Nom</p>
              <p className="font-semibold">{animal.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Espèce</p>
              <p className="font-semibold">{animal.species}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Race</p>
              <p className="font-semibold">{animal.breed}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Date de naissance</p>
              <p className="font-semibold">{animal.birthDate} ({calculateAge(animal.birthDate)} ans)</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Sexe</p>
              <p className="font-semibold">{animal.sex === 'female' ? 'Femelle' : 'Mâle'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">N° d'identification</p>
              <p className="font-semibold">{animal.identificationNumber || 'Non renseigné'}</p>
            </div>
          </div>
        </Card>

        <Card>
          <h2 className="text-xl font-semibold mb-4 text-blue-600">Propriétaire</h2>
          {owner && (
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-600">Nom complet</p>
                <p className="font-semibold">{owner.firstName} {owner.lastName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Téléphone</p>
                <p className="font-semibold">{owner.phone}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-semibold">{owner.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Adresse</p>
                <p className="font-semibold">{owner.address}</p>
              </div>
            </div>
          )}
        </Card>
      </div>

      <Card>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-blue-600">
            Historique des Consultations ({consultations.length})
          </h2>
          <Link to={`/consultations/new/${id}`}>
            <Button>+ Nouvelle Consultation</Button>
          </Link>
        </div>

        {consultations.length === 0 ? (
          <p className="text-center text-gray-600 py-4">Aucune consultation enregistrée</p>
        ) : (
          <Table
            columns={columns}
            data={consultations}
            actions={(consultation) => (
              <Button
                variant="secondary"
                onClick={() => navigate(`/consultations/edit/${consultation.id}`)}
                className="text-sm"
              >
                Modifier
              </Button>
            )}
          />
        )}
      </Card>
    </div>
  );
};

export default AnimalDetail;
