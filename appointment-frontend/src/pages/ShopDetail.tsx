// import { useState } from 'react'; // <-- REMOVED
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getShopById } from '../api/shops';
import { Shop } from '../types';
// import { useAuth } from '../context/AuthContext'; // <-- REMOVED

const ShopDetail = () => {
  const { id } = useParams<{ id: string }>();
  // const { user } = useAuth(); // <-- REMOVED

  const { data: shop, isLoading: isShopLoading } = useQuery<Shop>({
    queryKey: ['shop', id],
    queryFn: () => getShopById(Number(id)),
  });

  if (isShopLoading) return <div className="text-center py-8">Loading shop details...</div>;
  if (!shop) return <div className="text-center py-8 text-red-500">Shop not found</div>;

  return (
    <div>
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <div className="p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{shop.name}</h1>
          <div className="flex items-center text-gray-600 mb-4">
            <span className="mr-2">Category:</span>
            <span className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded text-sm">
              {shop.categoryName}
            </span>
          </div>
          <p className="text-gray-700 mb-4">{shop.description}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <h3 className="font-semibold text-gray-700">Location</h3>
              <p>{shop.location}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopDetail;