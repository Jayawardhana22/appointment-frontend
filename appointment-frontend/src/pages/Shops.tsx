import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getShops } from '../services/api';
import { Link } from 'react-router-dom';
import { Shop } from '../types';
import { MapPin, Clock, Star } from 'lucide-react';

const Shops = () => {
  const { data: shops, isLoading, error } = useQuery<Shop[]>({
    queryKey: ['shops'],
    queryFn: getShops,
  });

  if (isLoading) return <div className="text-center py-20"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div></div>;
  if (error) return <div className="text-center py-20 text-red-500">Error loading shops</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Marketplace</h1>
        <div className="flex gap-2">
          <select className="border rounded-md px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
            <option>All Categories</option>
            <option>Salon</option>
            <option>Automotive</option>
            <option>Health</option>
          </select>
        </div>
      </div>
      
      {shops && shops.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {shops.map((shop) => (
            <div key={shop.id} className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group">
              <div className="h-48 overflow-hidden relative">
                <img 
                  src={shop.bannerUrl || 'https://via.placeholder.com/800x300'} 
                  alt={shop.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold text-indigo-700 shadow-sm">
                  {shop.categoryName}
                </div>
              </div>
              
              <div className="p-6 relative">
                 <div className="absolute -top-10 left-6">
                    <img 
                      src={shop.logoUrl || 'https://via.placeholder.com/100'} 
                      alt="Logo" 
                      className="w-16 h-16 rounded-full border-4 border-white shadow-md bg-white object-cover" 
                    />
                 </div>
                 
                 <div className="mt-6">
                   <div className="flex justify-between items-start mb-2">
                     <h2 className="text-xl font-bold text-gray-900 line-clamp-1">{shop.name}</h2>
                     <div className="flex items-center bg-yellow-50 px-2 py-1 rounded text-xs text-yellow-700 font-bold gap-1">
                        <Star size={12} fill="currentColor" /> {shop.rating || 'New'}
                     </div>
                   </div>
                   
                   <p className="text-gray-600 text-sm mb-4 line-clamp-2">{shop.description}</p>
                   
                   <div className="space-y-2 text-sm text-gray-500 mb-6">
                     <div className="flex items-center gap-2">
                       <MapPin size={16} className="text-gray-400 shrink-0" />
                       <span className="truncate">{shop.location}</span>
                     </div>
                     <div className="flex items-center gap-2">
                       <Clock size={16} className="text-gray-400 shrink-0" />
                       <span className="truncate">{shop.openingHours}</span>
                     </div>
                   </div>
                   
                   <Link
                     to={`/shops/${shop.id}`}
                     className="block w-full text-center bg-gray-50 text-indigo-600 font-semibold py-3 rounded-lg hover:bg-indigo-600 hover:text-white transition-colors border border-indigo-100"
                   >
                     View Details
                   </Link>
                 </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-lg border border-dashed border-gray-300">
           <p className="text-gray-500 text-lg">No shops found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default Shops;