import axios from 'axios';
import { Appointment, Product, Shop, User, Category, AnalyticsData } from '../types';

const API_URL = 'http://localhost:5274/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    console.log('Request interceptor - Token:', token ? 'Present' : 'Not found');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('Authorization header set:', config.headers.Authorization);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error('401 Unauthorized - Token may be invalid or expired');
    }
    return Promise.reject(error);
  }
);

// Auth
export const login = async (email: string, password: string): Promise<{ token: string }> => {
  try {
    const response = await api.post('/auth/login', { email, password });
    console.log('Login response:', response.data);
    console.log('Token from response:', response.data.token); // lowercase token
    console.log('Full response object:', JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    console.error('Login API error:', error);
    throw error;
  }
};

export const register = async (email: string, password: string, fullName: string, role: string): Promise<{ token: string }> => {
  const response = await api.post('/auth/register', { email, password, fullName, role });
  return response.data;
};

export const getCurrentUser = async (token?: string): Promise<User> => {
  // If token is provided explicitly, use it. Otherwise rely on interceptor
  const headers = token ? { Authorization: `Bearer ${token}` } : undefined;
  const response = await api.get('/auth/me', { headers });
  // Backend returns Id, Email, Role (PascalCase) but we need id, email, role (camelCase)
  return {
    id: response.data.Id || response.data.id,
    email: response.data.Email || response.data.email,
    role: response.data.Role || response.data.role,
    fullName: response.data.FullName || response.data.fullName || '',
  };
};

// Shops
export const getShops = async (): Promise<Shop[]> => {
  const response = await api.get('/shops');
  // Enhance with mock images for the "Marketplace" feel
  return response.data.map((shop: Shop, index: number) => ({
    ...shop,
    bannerUrl: `https://picsum.photos/800/300?random=${index}`,
    logoUrl: `https://picsum.photos/100/100?random=${index + 100}`,
    rating: (4 + (index % 10) / 10).toFixed(1)
  }));
};

export const getShopById = async (id: number): Promise<Shop> => {
  const response = await api.get(`/shops/${id}`);
  return {
    ...response.data,
    bannerUrl: `https://picsum.photos/800/300?random=${id}`,
    logoUrl: `https://picsum.photos/100/100?random=${id + 100}`,
    rating: 4.8
  };
};

export const createShop = async (shopData: any): Promise<Shop> => {
  const response = await api.post('/shops', shopData);
  return response.data;
};

// Categories
export const getCategories = async (): Promise<Category[]> => {
  const response = await api.get('/categories');
  return response.data;
};

// Appointments
export const getAppointmentsForShop = async (shopId: number): Promise<Appointment[]> => {
  try {
    const response = await api.get(`/appointments/shop/${shopId}`);
    return response.data;
  } catch (e) {
    console.warn("Endpoint /appointments/shop/:id might be missing in backend");
    return [];
  }
};

// Explicitly export createAppointment with the signature expected by BookingModal
export const createAppointment = async (data: { shopId: number; startAt: string; endAt: string; notes: string }): Promise<Appointment> => {
  const response = await api.post('/appointments', data);
  return response.data;
};

// Products
export const getShopProducts = async (shopId: number): Promise<Product[]> => {
  // Simulate API call for products
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          shopId,
          name: 'Premium Service Pack',
          price: 49.99,
          description: 'A complete package for your needs.',
          imageUrl: `https://picsum.photos/200/200?random=${shopId}1`,
          stock: 10
        },
        {
          id: 2,
          shopId,
          name: 'Maintenance Kit',
          price: 29.99,
          description: 'Do it yourself maintenance kit.',
          imageUrl: `https://picsum.photos/200/200?random=${shopId}2`,
          stock: 5
        }
      ]);
    }, 500);
  });
};

export const getShopAnalytics = async (shopId: number): Promise<AnalyticsData[]> => {
   return [
     { month: 'Jan', count: 12 },
     { month: 'Feb', count: 19 },
     { month: 'Mar', count: 3 },
     { month: 'Apr', count: 5 },
     { month: 'May', count: 2 },
     { month: 'Jun', count: 3 },
   ];
};

export default api;