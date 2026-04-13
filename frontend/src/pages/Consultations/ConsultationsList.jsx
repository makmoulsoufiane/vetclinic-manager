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
  const [search, setSearch] = useState('');
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


  const filteredConsultations = consultations.filter(consultation =>
    consultation.date?.toLowerCase().includes(search.toLowerCase()) ||
    consultation.reason?.toLowerCase().includes(search.toLowerCase())
  )


  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Consultations</h1>
        <Link to="/consultations/new">
          <Button>+ Ajouter</Button>
        </Link>
      </div>


      <Card className="mb-6">
        <input
          type="text"
          placeholder="Rechercher Date..."
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
            data={filteredConsultations}
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

      <div className="flex justify-end mt-6">
        <Link to="/">
          <Button>+ Return</Button>
        </Link>
      </div>
    </div>
  );
};

export default ConsultationsList;
