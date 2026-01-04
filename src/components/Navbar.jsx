import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex gap-6">
          <Link to="/" className="hover:underline">Dashboard</Link>
          <Link to="/owners" className="hover:underline">Propriétaires</Link>
          <Link to="/animals" className="hover:underline">Animaux</Link>
          <Link to="/consultations" className="hover:underline">Consultations</Link>
        </div>
        <button
          onClick={handleLogout}
          className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
        >
          Déconnexion
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
