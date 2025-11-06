import { useQuery } from '@tanstack/react-query';
import { getAppointmentsForShop, getShopAnalytics } from '../api/appointments';
// import { useAuth } from '../context/AuthContext'; // <-- REMOVED
import { Appointment, AnalyticsData } from '../types';
import dayjs from 'dayjs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
  // const { user } = useAuth(); // <-- REMOVED

  // In a real app, you would fetch the shop ID based on the owner
  // For simplicity, we'll use a mock shop ID
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
    return <div className="text-center py-8">Loading dashboard data...</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Recent Appointments</h2>
          {appointments && appointments.length > 0 ? (
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date & Time
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
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
                          {dayjs(appointment.startAt).format('MMM D, YYYY h:mm A')} -{' '}
                          {dayjs(appointment.endAt).format('h:mm A')}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            appointment.status === 'Confirmed'
                              ? 'bg-green-100 text-green-800'
                              : appointment.status === 'Cancelled'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {appointment.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-600">No appointments yet.</p>
          )}
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Appointment Analytics</h2>
          {analytics && analytics.length > 0 ? (
            <div className="bg-white rounded-lg shadow-md p-4 h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={analytics}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" fill="#3b82f6" name="Appointments" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-4 h-80 flex items-center justify-center">
              <p className="text-gray-600">No analytics data available</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;