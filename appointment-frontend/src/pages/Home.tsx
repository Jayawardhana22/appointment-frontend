const Home = () => {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">Welcome to AppointmentBook</h1>
      <p className="text-xl text-gray-600 mb-8">
        Book appointments with your favorite shops easily
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">For Customers</h2>
          <p className="text-gray-600 mb-4">
            Browse shops by category, view shop details, and book appointments with just a few clicks.
          </p>
          <a
            href="/shops"
            className="inline-block bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
          >
            Browse Shops
          </a>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">For Shop Owners</h2>
          <p className="text-gray-600 mb-4">
            Create your shop profile, manage appointments, and view analytics to grow your business.
          </p>
          <a
            href="/register"
            className="inline-block bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
          >
            Register as Owner
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;