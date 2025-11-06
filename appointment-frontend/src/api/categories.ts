import api from '../utils/axios';
import { Category } from '../types';

export const getCategories = async (): Promise<Category[]> => {
  const response = await api.get('/categories');
  return response.data;
};