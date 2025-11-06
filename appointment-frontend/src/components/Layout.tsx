import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isOwner, logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex">
              <Link to="/" className="flex-shrink-0 flex items-center">
                <span className="text-xl font-bold text-indigo-600">AppointmentBook</span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/shops" className="text-gray-500 hover:text-gray-700">
                Shops
              </Link>
              {isAuthenticated ? (
                <>
                  {isOwner && (
                    <>
                      <Link to="/dashboard" className="text-gray-500 hover:text-gray-700">
                        Dashboard
                      </Link>
                      <Link to="/create-shop" className="text-gray-500 hover:text-gray-700">
                        Create Shop
                      </Link>
                    </>
                  )}
                  <span className="text-gray-700 font-medium">Hi, {user?.fullName.split(' ')[0]}</span>
                  <button
                    onClick={handleLogout}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="text-gray-500 hover:text-gray-700">
                    Login
                  </Link>
                  <Link to="/register" className="text-gray-500 hover:text-gray-700">
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
};

export default Layout;