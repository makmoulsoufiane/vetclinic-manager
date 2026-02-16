import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { animalsAPI } from '../../api/animals.api';
import { ownersAPI } from '../../api/owners.api';
import Card from '../../components/Card';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Loading from '../../components/Loading';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

const AnimalsForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [owners, setOwners] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    species: '',
    breed: '',
    birthDate: '',
    sex: 'male',
    identificationNumber: '',
    ownerId: '',
  });

  useEffect(() => {
    fetchOwners();
    if (id) {
      fetchAnimal();
    }
  }, [id]);

  const fetchOwners = async () => {
    try {
      const response = await ownersAPI.getAll();
      setOwners(response.data);
    } catch (error) {
      console.error('Error fetching owners:', error);
    }
  };

  const fetchAnimal = async () => {
    try {
      setLoading(true);
      const response = await animalsAPI.getById(id);
      setFormData(response.data);
    } catch (error) {
      console.error('Error fetching animal:', error);
      alert('Erreur lors du chargement');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (id) {
        await animalsAPI.update(id, formData);
      } else {
        await animalsAPI.create(formData);
      }
      navigate('/animals');
    } catch (error) {
      console.error('Error saving animal:', error);
      alert('Erreur lors de la sauvegarde');
    } finally {
      setLoading(false);
    }
  };

  if (loading && id) {
    return <Loading />;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        {id ? 'Modifier l\'Animal' : 'Nouvel Animal'}
      </h1>

      <Card>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Propriétaire <span className="text-red-500">*</span>
            </label>
            <TextField
              select
              fullWidth
              margin="normal"
              label="Propriétaire"
              name="ownerId"
              value={formData.ownerId}
              onChange={handleChange}
              required
            >
              <MenuItem value="">Sélectionner un propriétaire</MenuItem>
              {owners.map(owner => (
                <MenuItem key={owner.id} value={owner.id}>
                  {owner.firstName} {owner.lastName} - {owner.phone}
                </MenuItem>
              ))}
            </TextField>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Nom de l'animal"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Max"
              required
            />

            <Input
              label="Espèce"
              type="text"
              name="species"
              value={formData.species}
              onChange={handleChange}
              placeholder="Chien, Chat, etc."
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Race"
              type="text"
              name="breed"
              value={formData.breed}
              onChange={handleChange}
              placeholder="Labrador"
              required
            />

            <Input
              label="Date de naissance"
              type="date"
              name="birthDate"
              value={formData.birthDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TextField
              select
              fullWidth
              margin="normal"
              label="Sexe"
              name="sex"
              value={formData.sex}
              onChange={handleChange}
              required
            >
              <MenuItem value="male">Mâle</MenuItem>
              <MenuItem value="female">Femelle</MenuItem>
            </TextField>

            <Input
              label="N° d'identification"
              type="text"
              name="identificationNumber"
              value={formData.identificationNumber}
              onChange={handleChange}
              placeholder="Ex: 250269500123456"
            />
          </div>

          <div className="flex gap-4 mt-6">
            <Button type="submit" disabled={loading}>
              {loading ? 'Enregistrement...' : 'Enregistrer'}
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => navigate('/animals')}
            >
              Annuler
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default AnimalsForm;
