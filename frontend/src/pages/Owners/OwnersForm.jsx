import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ownersAPI } from '../../api/owners.api';
import Card from '../../components/Card';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Loading from '../../components/Loading';
import TextField from '@mui/material/TextField';

const OwnersForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    address: '',
    city: '',
  });

  useEffect(() => {
    if (id) {
      fetchOwner();
    }
  }, [id]);

  const fetchOwner = async () => {
    try {
      setLoading(true);
      const response = await ownersAPI.getById(id);
      setFormData(response.data);
    } catch (error) {
      console.error('Error fetching owner:', error);
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
        await ownersAPI.update(id, formData);
      } else {
        await ownersAPI.create(formData);
      }
      navigate('/owners');
    } catch (error) {
      console.error('Error saving owner:', error);
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
        {id ? 'Modifier le Propriétaire' : 'Nouveau Propriétaire'}
      </h1>

      <Card>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Prénom"
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Jean"
              required
            />

            <Input
              label="Nom"
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Dupont"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Téléphone"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="0612345678"
              required
            />

            <Input
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="jean.dupont@email.com"
              required
            />
          </div>

          <div className="mb-4">
            <TextField
              fullWidth
              multiline
              rows={3}
              label="Adresse"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              placeholder="123 Rue de Paris, 75001 Paris"
            />
          </div>

          <Input
            label="Ville"
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="Paris"
            required
            />

          <div className="flex gap-4 mt-6">
            <Button type="submit" disabled={loading}>
              {loading ? 'Enregistrement...' : 'Enregistrer'}
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => navigate('/owners')}
            >
              Annuler
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default OwnersForm;
