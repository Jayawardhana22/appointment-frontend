import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Shops from './pages/Shops';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Routes>
      {/* --- PUBLIC PAGES WITH NO NAVBAR --- */}
      {/* These are outside the Layout route, so they won't show the nav/footer */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* --- PAGES WITH NAVBAR & FOOTER --- */}
      <Route element={<Layout />}>
        {/* This is the landing page visitors see first */}
        <Route path="/" element={<Home />} /> 
        
        <Route path="/shops" element={<Shops />} />
        
        {/* --- PROTECTED BUSINESS OWNER PAGES --- */}
        <Route element={<ProtectedRoute allowedRoles={['Owner']} />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>

        {/* --- PROTECTED CUSTOMER PAGES --- */}
        <Route element={<ProtectedRoute allowedRoles={['Customer', 'Owner']} />}>
          <Route path="/my-appointments" element={<div>My Appointments</div>} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;