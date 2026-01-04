import { useParams } from 'react-router-dom';

const AnimalDetail = () => {
  const { id } = useParams();

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Détail Animal #{id}</h1>
      <div className="bg-white rounded shadow p-6">
        <p>Détails et consultations à implémenter</p>
      </div>
    </div>
  );
};

export default AnimalDetail;
