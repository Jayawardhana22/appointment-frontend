import React from 'react';
import { Link, useNavigate, useLocation, Outlet } from 'react-router-dom'; // Added Outlet
import { useAuth } from '../context/AuthContext';
import { LogOut, LayoutDashboard, Menu, X, Calendar } from 'lucide-react';

// We no longer need LayoutProps or children because we use <Outlet />
const Layout: React.FC = () => {
  const { isAuthenticated, isOwner, logout, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path: string) => 
    location.pathname === path ? "text-indigo-600 font-semibold" : "text-gray-500 hover:text-gray-900";

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* --- NAVBAR SECTION --- */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <Link to="/" className="flex-shrink-0 flex items-center gap-2">
                <Calendar className="h-8 w-8 text-indigo-600" />
                <span className="text-xl font-bold text-gray-900 tracking-tight">
                  Appt<span className="text-indigo-600">Book</span>
                </span>
              </Link>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8 items-center">
                <Link to="/shops" className={isActive('/shops')}>Marketplace</Link>
                {isAuthenticated && (
                  <Link to="/my-appointments" className={isActive('/my-appointments')}>My Bookings</Link>
                )}
              </div>
            </div>

            <div className="hidden sm:flex sm:items-center sm:space-x-4">
              {isAuthenticated ? (
                <>
                  {isOwner && (
                    <Link to="/dashboard" className="px-3 py-2 rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 flex items-center gap-2">
                      <LayoutDashboard size={16} /> Manager Dashboard
                    </Link>
                  )}
                  <div className="flex items-center gap-2 border-l pl-4 ml-2">
                    <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold">
                      {user?.fullName?.charAt(0) || 'U'}
                    </div>
                    <span className="text-sm font-medium text-gray-700 hidden md:block">
                      {user?.fullName?.split(' ')[0] || 'User'}
                    </span>
                  </div>
                  <button onClick={handleLogout} className="text-gray-400 hover:text-red-500 transition-colors">
                    <LogOut size={20} />
                  </button>
                </>
              ) : (
                <div className="flex items-center gap-4">
                  <Link to="/login" className="text-gray-500 hover:text-indigo-600 font-medium">Login</Link>
                  <Link to="/register" className="bg-gray-900 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-800 transition">Get Started</Link>
                </div>
              )}
            </div>

            <div className="-mr-2 flex items-center sm:hidden">
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 rounded-md text-gray-400">
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* --- CONTENT SECTION --- */}
      <main className="flex-grow max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 w-full">
        <Outlet /> {/* <-- THIS IS THE KEY: Routes nested inside Layout will render here */}
      </main>

      {/* --- FOOTER SECTION --- */}
      <footer className="bg-white border-t mt-auto">
        <div className="max-w-7xl mx-auto py-6 px-4 text-center text-sm text-gray-400">
          &copy; 2024 AppointmentBook Pro. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Layout;