export interface User {
  id: number;
  email: string;
  fullName: string;
  role: string; // 'Customer' | 'Owner' | 'Employee'
}

export interface Category {
  id: number;
  name: string;
}

export interface Shop {
  id: number;
  ownerId: number;
  ownerName: string;
  categoryId: number;
  categoryName: string;
  name: string;
  description: string;
  location: string;
  openingHours: string;
  // Advanced fields
  bannerUrl?: string;
  logoUrl?: string;
  rating?: number;
}

export interface Appointment {
  id: number;
  shopId: number;
  shopName: string;
  customerId: number;
  customerName: string;
  startAt: string;
  endAt: string;
  status: string;
  notes: string;
}

export interface Product {
  id: number;
  shopId: number;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  stock: number;
}

export interface ChatMessage {
  id: string;
  senderId: number;
  senderName: string;
  text: string;
  timestamp: Date;
  isSelf: boolean;
}

export interface AnalyticsData {
  month: string;
  count: number;
}