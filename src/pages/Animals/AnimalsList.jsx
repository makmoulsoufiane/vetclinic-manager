import { Link } from 'react-router-dom';

const AnimalsList = () => {
  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Animaux</h1>
        <Link to="/animals/new" className="bg-blue-600 text-white px-4 py-2 rounded">
          Ajouter
        </Link>
      </div>
      <div className="bg-white rounded shadow p-4">
        <p>Liste des animaux à implémenter</p>
      </div>
    </div>
  );
};

export default AnimalsList;
