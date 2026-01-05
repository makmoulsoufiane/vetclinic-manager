import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { documentsAPI } from '../../api/documents.api';
import { consultationsAPI } from '../../api/consultations.api';
import Card from '../../components/Card';
import Button from '../../components/Button';
import Table from '../../components/Table';
import Loading from '../../components/Loading';

const DocumentsList = () => {
  const { consultationId } = useParams();
  const navigate = useNavigate();
  const [documents, setDocuments] = useState([]);
  const [consultation, setConsultation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [consultationId]);

  const fetchData = async () => {
    try {
      const [docsResponse, consultResponse] = await Promise.all([
        documentsAPI.getByConsultation(consultationId),
        consultationsAPI.getById(consultationId)
      ]);
      setDocuments(docsResponse.data);
      setConsultation(consultResponse.data);
    } catch (error) {
      console.error('Error fetching documents:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce document ?')) {
      try {
        await documentsAPI.delete(id);
        fetchData();
      } catch (error) {
        console.error('Error deleting document:', error);
      }
    }
  };

  const handleDownload = async (doc) => {
    try {
      const response = await documentsAPI.download(doc.id);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', doc.name);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Error downloading document:', error);
      alert('Erreur lors du téléchargement');
    }
  };

  const columns = [
    { header: 'Nom du fichier', field: 'name' },
    { header: 'Type', field: 'type' },
    { header: 'Date d\'upload', field: 'uploadDate' },
  ];

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Documents</h1>
          {consultation && (
            <p className="text-gray-600 mt-2">
              Consultation du {consultation.date} - {consultation.reason}
            </p>
          )}
        </div>
        <div className="flex gap-2">
          <Button
            variant="secondary"
            onClick={() => navigate(`/consultations/edit/${consultationId}`)}
          >
            Retour
          </Button>
        </div>
      </div>

      <Card>
        {documents.length === 0 ? (
          <p className="text-center text-gray-600 py-8">Aucun document pour cette consultation</p>
        ) : (
          <Table
            columns={columns}
            data={documents}
            actions={(document) => (
              <>
                <Button
                  variant="secondary"
                  onClick={() => handleDownload(document)}
                  className="text-sm"
                >
                  Télécharger
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleDelete(document.id)}
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

export default DocumentsList;
