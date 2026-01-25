import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { documentsAPI } from '../../api/documents.api';
import Card from '../../components/Card';
import Button from '../../components/Button';

const DocumentsForm = () => {
  const navigate = useNavigate();
  const { consultationId } = useParams();
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
      if (!validTypes.includes(file.type)) {
        setError('Seuls les fichiers PDF et images (JPG, PNG) sont acceptés');
        setSelectedFile(null);
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setError('La taille du fichier ne doit pas dépasser 5 Mo');
        setSelectedFile(null);
        return;
      }
      setError('');
      setSelectedFile(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      setError('Veuillez sélectionner un fichier');
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('consultationId', consultationId);

    try {
      await documentsAPI.upload(consultationId, formData);
      navigate(`/consultations/edit/${consultationId}`);
    } catch (error) {
      console.error('Error uploading document:', error);
      setError('Erreur lors de l\'upload du document');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Ajouter un Document</h1>

      <Card>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Fichier <span className="text-red-500">*</span>
            </label>
            <input
              type="file"
              onChange={handleFileChange}
              accept=".pdf,.jpg,.jpeg,.png"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-sm text-gray-500 mt-2">
              Formats acceptés : PDF, JPG, PNG (max 5 Mo)
            </p>
          </div>

          {selectedFile && (
            <div className="mb-4 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-gray-700">
                <strong>Fichier sélectionné :</strong> {selectedFile.name}
              </p>
              <p className="text-sm text-gray-600">
                Taille : {(selectedFile.size / 1024).toFixed(2)} Ko
              </p>
            </div>
          )}

          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          <div className="flex gap-4 mt-6">
            <Button type="submit" disabled={loading || !selectedFile}>
              {loading ? 'Upload en cours...' : 'Téléverser'}
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => navigate(`/consultations/edit/${consultationId}`)}
            >
              Annuler
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default DocumentsForm;
