import React, { useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { createShop, getCategories } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { Category } from '../types';
import { Store, MapPin, Clock, AlignLeft, Tag } from 'lucide-react';

const CreateShop = () => {
  const [shopData, setShopData] = useState({
    name: '',
    description: '',
    location: '',
    openingHours: '',
    categoryId: 0,
  });
  const navigate = useNavigate();

  const { data: categories, isLoading: isCategoriesLoading } = useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: getCategories,
  });

  const mutation = useMutation({
    mutationFn: (newShop: Omit<typeof shopData, 'categoryId'> & { categoryId: number }) => {
      return createShop({ ...newShop, categoryId: Number(newShop.categoryId) });
    },
    onSuccess: () => {
      navigate('/dashboard');
    },
    onError: (err) => {
      alert("Failed to create shop. Please try again.");
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if(shopData.categoryId === 0) {
      alert("Please select a category.");
      return;
    }
    mutation.mutate({
      ...shopData,
      categoryId: Number(shopData.categoryId)
    });
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100">
        <div className="flex items-center gap-3 mb-8 border-b pb-4">
          <div className="bg-indigo-100 p-2 rounded-lg text-indigo-600">
            <Store size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Create New Shop</h1>
            <p className="text-gray-500 text-sm">Launch your storefront on AppointmentBook</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
              <Store size={16} className="text-gray-400" /> Shop Name
            </label>
            <input
              type="text"
              id="name"
              value={shopData.name}
              onChange={(e) => setShopData({ ...shopData, name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="e.g. Elegant Cuts Salon"
              required
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
              <AlignLeft size={16} className="text-gray-400" /> Description
            </label>
            <textarea
              id="description"
              value={shopData.description}
              onChange={(e) => setShopData({ ...shopData, description: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              rows={4}
              placeholder="Tell customers what makes your shop special..."
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                <MapPin size={16} className="text-gray-400" /> Location
              </label>
              <input
                type="text"
                id="location"
                value={shopData.location}
                onChange={(e) => setShopData({ ...shopData, location: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="123 Main St, City"
                required
              />
            </div>

            <div>
              <label htmlFor="openingHours" className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                <Clock size={16} className="text-gray-400" /> Opening Hours
              </label>
              <input
                type="text"
                id="openingHours"
                value={shopData.openingHours}
                onChange={(e) => setShopData({ ...shopData, openingHours: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Mon-Fri: 9AM-6PM"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
              <Tag size={16} className="text-gray-400" /> Category
            </label>
            {isCategoriesLoading ? (
              <div className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-500">
                Loading categories...
              </div>
            ) : (
              <select
                id="category"
                value={shopData.categoryId}
                onChange={(e) => setShopData({ ...shopData, categoryId: Number(e.target.value) })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                required
              >
                <option value="0" disabled>Select a category</option>
                {categories?.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            )}
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-indigo-700 transition disabled:opacity-70 shadow-md"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? 'Creating Shop...' : 'Launch Shop'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateShop;