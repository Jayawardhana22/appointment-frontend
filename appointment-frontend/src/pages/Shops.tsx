import { useQuery } from '@tanstack/react-query';
import { getShops } from '../api/shops';
import ShopCard from '../components/ShopCard';
import { Shop } from '../types';

const Shops = () => {
  const { data: shops, isLoading, error } = useQuery<Shop[]>({
    queryKey: ['shops'],
    queryFn: getShops,
  });

  if (isLoading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-center py-8 text-red-500">Error loading shops</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">All Shops</h1>
      {shops && shops.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {shops.map((shop) => (
            <ShopCard key={shop.id} shop={shop} />
          ))}
        </div>
      ) : (
        <p className="text-gray-600">No shops found.</p>
      )}
    </div>
  );
};

export default Shops;