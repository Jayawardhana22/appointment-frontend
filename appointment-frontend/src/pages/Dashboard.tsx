import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getAppointmentsForShop, getShopAnalytics } from '../services/api';
import { Appointment, AnalyticsData } from '../types';
import dayjs from 'dayjs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Users, Settings, PlusCircle } from 'lucide-react';

const Dashboard = () => {
  // In a real app, fetch shop ID based on owner context
  const shopId = 1; 

  const { data: appointments, isLoading: isAppointmentsLoading } = useQuery<Appointment[]>({
    queryKey: ['dashboard-appointments', shopId],
    queryFn: () => getAppointmentsForShop(shopId),
  });

  const { data: analytics, isLoading: isAnalyticsLoading } = useQuery<AnalyticsData[]>({
    queryKey: ['dashboard-analytics', shopId],
    queryFn: () => getShopAnalytics(shopId),
  });

  if (isAppointmentsLoading || isAnalyticsLoading) {
    return <div className="flex justify-center items-center h-screen"><div className="text-lg text-gray-500">Loading dashboard...</div></div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Owner Dashboard</h1>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 text-sm font-medium">
             <Users size={16} /> Manage Staff
          </button>
          <button className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 text-sm font-medium">
             <Settings size={16} /> Shop Settings
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
           <h3 className="text-gray-500 text-sm font-medium">Total Bookings</h3>
           <p className="text-3xl font-bold text-gray-900 mt-2">{appointments?.length || 0}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
           <h3 className="text-gray-500 text-sm font-medium">Revenue (Est.)</h3>
           <p className="text-3xl font-bold text-green-600 mt-2">$1,240</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
           <h3 className="text-gray-500 text-sm font-medium">Pending Requests</h3>
           <p className="text-3xl font-bold text-yellow-600 mt-2">
              {appointments?.filter(a => a.status === 'Pending').length || 0}
           </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Appointments Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
             <h2 className="text-lg font-bold text-gray-900">Recent Appointments</h2>
          </div>
          {appointments && appointments.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {appointments.slice(0, 5).map((appointment) => (
                    <tr key={appointment.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{appointment.customerName}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {dayjs(appointment.startAt).format('MMM D, h:mm A')}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            appointment.status === 'Confirmed' ? 'bg-green-100 text-green-800' :
                            appointment.status === 'Cancelled' ? 'bg-red-100 text-red-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                          {appointment.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-6 text-center text-gray-500">No appointments yet.</div>
          )}
        </div>

        {/* Analytics Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-6">Performance</h2>
          {analytics && analytics.length > 0 ? (
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={analytics}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip cursor={{fill: '#f3f4f6'}} />
                  <Bar dataKey="count" fill="#4f46e5" radius={[4, 4, 0, 0]} barSize={30} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="flex h-64 items-center justify-center text-gray-500">No data available</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
