import { useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { createShop } from '../api/shops';
import { getCategories } from '../api/categories';
import { useNavigate } from 'react-router-dom';
import { Category } from '../types';

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
    // Updated this to match the corrected API function
    mutationFn: (newShop: Omit<typeof shopData, 'categoryId'> & { categoryId: number }) => {
      // The API expects categoryId to be a number, not part of the Omit
      return createShop({ ...newShop, categoryId: Number(newShop.categoryId) });
    },
    onSuccess: () => {
      navigate('/dashboard');
    },
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

  if (isCategoriesLoading) return <div className="text-center py-8">Loading categories...</div>;

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Create New Shop</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Shop Name
          </label>
          <input
            type="text"
            id="name"
            value={shopData.name}
            onChange={(e) => setShopData({ ...shopData, name: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            id="description"
            value={shopData.description}
            onChange={(e) => setShopData({ ...shopData, description: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            rows={4}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
            Location
          </label>
          <input
            type="text"
            id="location"
            value={shopData.location}
            onChange={(e) => setShopData({ ...shopData, location: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="openingHours" className="block text-sm font-medium text-gray-700 mb-1">
            Opening Hours
          </label>
          <input
            type="text"
            id="openingHours"
            value={shopData.openingHours}
            onChange={(e) => setShopData({ ...shopData, openingHours: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="e.g., Mon-Fri: 9AM-6PM, Sat: 10AM-4PM"
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            id="category"
            value={shopData.categoryId}
            onChange={(e) => setShopData({ ...shopData, categoryId: Number(e.target.value) })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          >
            <option value="0" disabled>Select a category</option>
            {categories?.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? 'Creating...' : 'Create Shop'}
        </button>
      </form>
    </div>
  );
};

export default CreateShop;