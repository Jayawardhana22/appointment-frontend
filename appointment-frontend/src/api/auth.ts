import api from '../utils/axios';
import { User } from '../types';

export const login = async (email: string, password: string): Promise<{ token: string }> => {
  const response = await api.post('/auth/login', { email, password });
  return response.data;
};

export const register = async (
  email: string,
  password: string,
  fullName: string,
  role: string
): Promise<{ token: string }> => {
  const response = await api.post('/auth/register', { email, password, fullName, role });
  return response.data;
};

export const getCurrentUser = async (): Promise<User> => {
  const response = await api.get('/auth/me');
  return response.data;
};