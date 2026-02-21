import { useEffect, useMemo, useState } from 'react';
import Card from '../../components/Card';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Table from '../../components/Table';
import Loading from '../../components/Loading';
import { veterinariansAPI } from '../../api/veterinarians.api';

const initialForm = {
  fullName: '',
  email: '',
  password: '',
  password_confirmation: '',
};

const VeterinariansPage = () => {
  const [veterinarians, setVeterinarians] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState('');
  const [formData, setFormData] = useState(initialForm);

  const isEditing = Boolean(editingId);

  const loadVeterinarians = async () => {
    try {
      const response = await veterinariansAPI.getAll();
      setVeterinarians(response.data);
    } catch (error) {
      console.error('Error loading veterinarians:', error);
      alert('Erreur lors du chargement des vétérinaires');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadVeterinarians();
  }, []);

  const resetForm = () => {
    setEditingId(null);
    setFormData(initialForm);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      if (isEditing) {
        const payload = {
          fullName: formData.fullName,
          email: formData.email,
        };

        if (formData.password) {
          payload.password = formData.password;
          payload.password_confirmation = formData.password_confirmation;
        }

        await veterinariansAPI.update(editingId, payload);
      } else {
        await veterinariansAPI.create(formData);
      }

      resetForm();
      await loadVeterinarians();
    } catch (error) {
      console.error('Error saving veterinarian:', error);
      alert(error?.response?.data?.message || 'Erreur lors de la sauvegarde');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (vet) => {
    setEditingId(vet.id);
    setFormData({
      fullName: vet.fullName,
      email: vet.email,
      password: '',
      password_confirmation: '',
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Supprimer ce vétérinaire ?')) {
      return;
    }

    try {
      await veterinariansAPI.delete(id);
      await loadVeterinarians();
    } catch (error) {
      console.error('Error deleting veterinarian:', error);
      alert(error?.response?.data?.message || 'Impossible de supprimer ce vétérinaire');
    }
  };

  const filteredVeterinarians = useMemo(() => {
    const term = search.trim().toLowerCase();

    if (!term) return veterinarians;

    return veterinarians.filter((vet) =>
      `${vet.fullName} ${vet.email}`.toLowerCase().includes(term)
    );
  }, [veterinarians, search]);

  const columns = [
    { header: 'Nom complet', field: 'fullName' },
    { header: 'Email', field: 'email' },
    { header: 'Rôle', field: 'role' },
  ];

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Gestion des Vétérinaires</h1>

      <Card className="mb-6">
        <form onSubmit={handleSubmit}>
          <h2 className="text-xl font-semibold mb-4">
            {isEditing ? 'Modifier un vétérinaire' : 'Ajouter un vétérinaire'}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Nom complet"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
            <Input
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label={isEditing ? 'Nouveau mot de passe (optionnel)' : 'Mot de passe'}
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required={!isEditing}
            />
            <Input
              label={isEditing ? 'Confirmer le nouveau mot de passe' : 'Confirmer le mot de passe'}
              type="password"
              name="password_confirmation"
              value={formData.password_confirmation}
              onChange={handleChange}
              required={!isEditing || !!formData.password}
            />
          </div>

          <div className="flex gap-3 mt-4">
            <Button type="submit" disabled={saving}>
              {saving ? 'Enregistrement...' : isEditing ? 'Mettre à jour' : 'Créer'}
            </Button>
            {isEditing && (
              <Button type="button" variant="secondary" onClick={resetForm}>
                Annuler
              </Button>
            )}
          </div>
        </form>
      </Card>

      <Card>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Rechercher par nom ou email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {loading ? (
          <Loading />
        ) : (
          <Table
            columns={columns}
            data={filteredVeterinarians}
            actions={(vet) => (
              <>
                <Button variant="secondary" onClick={() => handleEdit(vet)}>
                  Modifier
                </Button>
                <Button variant="danger" onClick={() => handleDelete(vet.id)}>
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

export default VeterinariansPage;
