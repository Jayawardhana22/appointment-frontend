import { Link } from 'react-router-dom';
import { Shop } from '../types';

interface ShopCardProps {
  shop: Shop;
}

const ShopCard = ({ shop }: ShopCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-shadow duration-300 hover:shadow-lg">
      <div className="p-6">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-bold text-gray-900">{shop.name}</h2>
          <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-semibold">
            {shop.categoryName}
          </span>
        </div>
        <p className="text-gray-600 mb-4">{shop.description}</p>
        <div className="mb-4">
          <p className="text-sm text-gray-700">
            <strong>Location:</strong> {shop.location}
          </p>
          <p className="text-sm text-gray-700">
            <strong>Hours:</strong> {shop.openingHours}
          </p>
        </div>
        <Link
          to={`/shops/${shop.id}`}
          className="inline-block bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ShopCard;