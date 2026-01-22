import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Calendar, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext'; // Import your auth hook

const Home = () => {
  const { isAuthenticated, isOwner } = useAuth();
  const navigate = useNavigate();

  // --- REDIRECT LOGIC ---
  // If the user is already logged in, don't show the landing page.
  // Send them to their specific area immediately.
  useEffect(() => {
    if (isAuthenticated) {
      if (isOwner) {
        navigate('/dashboard');
      } else {
        navigate('/shops');
      }
    }
  }, [isAuthenticated, isOwner, navigate]);

  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <div className="text-center max-w-3xl mx-auto py-16 px-4">
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight mb-6">
          Your one-stop destination for <span className="text-indigo-600">appointments</span> & <span className="text-indigo-600">shopping</span>.
        </h1>
        <p className="text-xl text-gray-600 mb-10 leading-relaxed">
          Connect with local shops, book services instantly, and shop for premium products. Everything you need, all in one place.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/shops"
            className="inline-flex items-center justify-center px-8 py-4 text-base font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 md:text-lg shadow-lg transition-transform hover:-translate-y-1"
          >
            Explore Marketplace <ArrowRight className="ml-2" size={20} />
          </Link>
          <Link
            to="/register"
            className="inline-flex items-center justify-center px-8 py-4 text-base font-medium rounded-lg text-indigo-600 bg-indigo-50 hover:bg-indigo-100 md:text-lg border border-indigo-200 transition-transform hover:-translate-y-1"
          >
            Join as Partner
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto px-4 py-12 w-full">
        <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-100 hover:shadow-xl transition-shadow group">
          <div className="bg-indigo-100 w-14 h-14 rounded-xl flex items-center justify-center mb-6 text-indigo-600 group-hover:scale-110 transition-transform">
            <ShoppingBag size={28} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">For Customers</h2>
          <ul className="space-y-3 text-gray-600 mb-6">
            <li className="flex items-center gap-2">✓ Browse shops by category</li>
            <li className="flex items-center gap-2">✓ Real-time appointment booking</li>
            <li className="flex items-center gap-2">✓ Chat with shop staff</li>
            <li className="flex items-center gap-2">✓ Purchase products directly</li>
          </ul>
          <Link
            to="/shops"
            className="text-indigo-600 font-semibold hover:text-indigo-800 flex items-center gap-1"
          >
            Start Browsing <ArrowRight size={16} />
          </Link>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-100 hover:shadow-xl transition-shadow group">
          <div className="bg-purple-100 w-14 h-14 rounded-xl flex items-center justify-center mb-6 text-purple-600 group-hover:scale-110 transition-transform">
            <Calendar size={28} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">For Business Owners</h2>
          <ul className="space-y-3 text-gray-600 mb-6">
            <li className="flex items-center gap-2">✓ Create your digital storefront</li>
            <li className="flex items-center gap-2">✓ Manage appointments & staff</li>
            <li className="flex items-center gap-2">✓ Sell products & track inventory</li>
            <li className="flex items-center gap-2">✓ Powerful analytics dashboard</li>
          </ul>
          <Link
            to="/register"
            className="text-purple-600 font-semibold hover:text-purple-800 flex items-center gap-1"
          >
            Get Started <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;