const Dashboard = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-blue-100 p-6 rounded">
          <h2 className="text-xl font-semibold">Propriétaires</h2>
          <p className="text-3xl">0</p>
        </div>
        <div className="bg-green-100 p-6 rounded">
          <h2 className="text-xl font-semibold">Animaux</h2>
          <p className="text-3xl">0</p>
        </div>
        <div className="bg-yellow-100 p-6 rounded">
          <h2 className="text-xl font-semibold">Consultations</h2>
          <p className="text-3xl">0</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
