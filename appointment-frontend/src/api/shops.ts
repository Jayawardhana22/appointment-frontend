import api from '../utils/axios';
import { Shop } from '../types';

export const getShops = async (): Promise<Shop[]> => {
  const response = await api.get('/shops');
  return response.data;
};

export const getShopById = async (id: number): Promise<Shop> => {
  const response = await api.get(`/shops/${id}`);
  return response.data;
};

// The Omit type was slightly incorrect in the notes for createShop
// The user doesn't provide ownerId, so it should be omitted too.
// The backend will get ownerId from the JWT token.
export const createShop = async (shopData: Omit<Shop, 'id' | 'ownerId' | 'ownerName' | 'categoryName'>): Promise<Shop> => {
  const response = await api.post('/shops', shopData);
  return response.data;
};