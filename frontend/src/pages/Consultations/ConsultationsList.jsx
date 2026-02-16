import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { consultationsAPI } from '../../api/consultations.api';
import Card from '../../components/Card';
import Button from '../../components/Button';
import Table from '../../components/Table';
import Loading from '../../components/Loading';

const ConsultationsList = () => {
  const [consultations, setConsultations] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchConsultations();
  }, []);

  const fetchConsultations = async () => {
    try {
      const response = await consultationsAPI.getAll();
      setConsultations(response.data);
    } catch (error) {
      console.error('Error fetching consultations:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette consultation ?')) {
      try {
        await consultationsAPI.delete(id);
        fetchConsultations();
      } catch (error) {
        console.error('Error deleting consultation:', error);
      }
    }
  };

  const columns = [
    { header: 'Date', field: 'date' },
    { header: 'Animal ID', field: 'animalId' },
    { header: 'Motif', field: 'reason' },
    { header: 'Diagnostic', field: 'diagnosis' },
  ];

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Consultations</h1>
        <Link to="/consultations/new">
          <Button>+ Ajouter</Button>
        </Link>
      </div>

      <Card>
        {loading ? (
          <Loading />
        ) : (
          <Table
            columns={columns}
            data={consultations}
            actions={(consultation) => (
              <>
                <Button
                  variant="secondary"
                  onClick={() => navigate(`/consultations/edit/${consultation.id}`)}
                  className="text-sm"
                >
                  Modifier
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleDelete(consultation.id)}
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

export default ConsultationsList;
