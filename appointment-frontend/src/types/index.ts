export interface User {
  id: number;
  email: string;
  fullName: string;
  role: string;
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

export interface AnalyticsData {
  month: string;
  count: number;
}