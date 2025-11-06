import api from '../utils/axios';
import { Appointment, AnalyticsData } from '../types';

export const getAppointmentsForShop = async (shopId: number): Promise<Appointment[]> => {
  const response = await api.get(`/appointments/shop/${shopId}`);
  return response.data;
};

export const getAppointmentsForCustomer = async (): Promise<Appointment[]> => {
  const response = await api.get('/appointments/customer');
  return response.data;
};

// The Omit type was slightly incorrect in the notes for createAppointment
// The user doesn't provide customerId, so it should be omitted too.
// The backend will get customerId from the JWT token.
export const createAppointment = async (appointmentData: Omit<Appointment, 'id' | 'shopName' | 'customerId' | 'customerName'>): Promise<Appointment> => {
  const response = await api.post('/appointments', appointmentData);
  return response.data;
};

export const updateAppointmentStatus = async (id: number, status: string): Promise<Appointment> => {
  const response = await api.put(`/appointments/${id}/status`, { status });
  return response.data;
};

export const getShopAnalytics = async (shopId: number): Promise<AnalyticsData[]> => {
  const response = await api.get(`/shops/${shopId}/analytics`);
  return response.data;
};