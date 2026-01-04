import { useNavigate } from 'react-router-dom';

const OwnersForm = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement API call
    navigate('/owners');
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Nouveau Propriétaire</h1>
      <form onSubmit={handleSubmit} className="bg-white rounded shadow p-6">
        <p>Formulaire à implémenter</p>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded mt-4">
          Enregistrer
        </button>
      </form>
    </div>
  );
};

export default OwnersForm;
