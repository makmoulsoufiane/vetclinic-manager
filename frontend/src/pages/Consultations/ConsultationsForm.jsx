import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { consultationsAPI } from '../../api/consultations.api';
import { animalsAPI } from '../../api/animals.api';
import { documentsAPI } from '../../api/documents.api';
import Card from '../../components/Card';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Table from '../../components/Table';
import Loading from '../../components/Loading';

const ConsultationsForm = () => {
  const navigate = useNavigate();
  const { animalId, id } = useParams();
  const [loading, setLoading] = useState(false);
  const [animals, setAnimals] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [uploadingFile, setUploadingFile] = useState(false);
  const [formData, setFormData] = useState({
    animalId: animalId || '',
    date: new Date().toISOString().split('T')[0],
    reason: '',
    diagnosis: '',
    treatment: '',
    notes: '',
  });

  useEffect(() => {
    fetchAnimals();
    if (id) {
      fetchConsultation();
      fetchDocuments();
    }
  }, [id]);

  const fetchAnimals = async () => {
    try {
      const response = await animalsAPI.getAll();
      setAnimals(response.data);
    } catch (error) {
      console.error('Error fetching animals:', error);
    }
  };

  const fetchConsultation = async () => {
    try {
      setLoading(true);
      const response = await consultationsAPI.getById(id);
      setFormData(response.data);
    } catch (error) {
      console.error('Error fetching consultation:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchDocuments = async () => {
    try {
      const response = await documentsAPI.getByConsultation(id);
      setDocuments(response.data);
    } catch (error) {
      console.error('Error fetching documents:', error);
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
        await consultationsAPI.update(id, formData);
      } else {
        await consultationsAPI.create(formData);
      }
      navigate('/consultations');
    } catch (error) {
      console.error('Error saving consultation:', error);
      alert('Erreur lors de la sauvegarde');
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const validTypes = ['application/pdf', 'image/jpeg', 'image/png'];
    if (!validTypes.includes(file.type)) {
      alert('Seuls les fichiers PDF et images sont acceptés');
      return;
    }

    setUploadingFile(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('consultationId', id);

    try {
      await documentsAPI.upload(id, formData);
      fetchDocuments();
      alert('Document ajouté avec succès');
    } catch (error) {
      console.error('Error uploading document:', error);
      alert('Erreur lors de l\'upload');
    } finally {
      setUploadingFile(false);
      e.target.value = '';
    }
  };

  const handleDeleteDocument = async (docId) => {
    if (window.confirm('Supprimer ce document ?')) {
      try {
        await documentsAPI.delete(docId);
        fetchDocuments();
      } catch (error) {
        console.error('Error deleting document:', error);
      }
    }
  };

  const handleDownloadDocument = async (doc) => {
    try {
      window.open(doc.url, '_blank');
    } catch (error) {
      console.error('Error downloading document:', error);
    }
  };

  if (loading && id) {
    return <Loading />;
  }

  const documentColumns = [
    { header: 'Nom', field: 'name' },
    { header: 'Type', field: 'type' },
    { header: 'Date', field: 'uploadDate' },
  ];

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        {id ? 'Modifier la Consultation' : 'Nouvelle Consultation'}
      </h1>

      <Card className="mb-6">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Animal <span className="text-red-500">*</span>
            </label>
            <select
              name="animalId"
              value={formData.animalId}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Sélectionner un animal</option>
              {animals.map(animal => (
                <option key={animal.id} value={animal.id}>
                  {animal.name} - {animal.species} ({animal.breed})
                </option>
              ))}
            </select>
          </div>

          <Input
            label="Date"
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />

          <Input
            label="Motif de la consultation"
            type="text"
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            placeholder="Ex: Vaccination, contrôle, urgence..."
            required
          />

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Diagnostic <span className="text-red-500">*</span>
            </label>
            <textarea
              name="diagnosis"
              value={formData.diagnosis}
              onChange={handleChange}
              required
              rows="3"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Diagnostic détaillé..."
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Traitement <span className="text-red-500">*</span>
            </label>
            <textarea
              name="treatment"
              value={formData.treatment}
              onChange={handleChange}
              required
              rows="3"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Traitement prescrit..."
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Notes additionnelles
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows="3"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Notes supplémentaires..."
            />
          </div>

          <div className="flex gap-4 mt-6">
            <Button type="submit" disabled={loading}>
              {loading ? 'Enregistrement...' : 'Enregistrer'}
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => navigate('/consultations')}
            >
              Annuler
            </Button>
          </div>
        </form>
      </Card>

      {id && (
        <Card>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-blue-600">
              Documents ({documents.length})
            </h2>
            <div>
              <input
                type="file"
                onChange={handleFileUpload}
                accept=".pdf,.jpg,.jpeg,.png"
                disabled={uploadingFile}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload">
                <div className={`inline-block px-4 py-2 rounded font-medium transition-colors cursor-pointer ${
                  uploadingFile
                    ? 'bg-blue-400 text-white cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}>
                  {uploadingFile ? 'Upload...' : '+ Ajouter Document'}
                </div>
              </label>
            </div>
          </div>

          {documents.length === 0 ? (
            <p className="text-center text-gray-600 py-4">Aucun document</p>
          ) : (
            <Table
              columns={documentColumns}
              data={documents}
              actions={(doc) => (
                <>
                  <Button
                    variant="secondary"
                    onClick={() => handleDownloadDocument(doc)}
                    className="text-sm"
                  >
                    Télécharger
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDeleteDocument(doc.id)}
                    className="text-sm"
                  >
                    Supprimer
                  </Button>
                </>
              )}
            />
          )}
        </Card>
      )}
    </div>
  );
};

export default ConsultationsForm;
