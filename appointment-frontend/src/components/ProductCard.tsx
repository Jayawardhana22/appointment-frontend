import React from 'react';
import { Product } from '../types';
import { ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow group">
      <div className="aspect-square w-full overflow-hidden bg-gray-100 relative">
        <img 
          src={product.imageUrl} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
        />
        <button className="absolute bottom-2 right-2 bg-white p-2 rounded-full shadow-lg text-indigo-600 hover:bg-indigo-600 hover:text-white transition-colors">
          <ShoppingCart size={20} />
        </button>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-1">
          <h3 className="font-semibold text-gray-900 line-clamp-1">{product.name}</h3>
          <span className="font-bold text-indigo-600">${product.price}</span>
        </div>
        <p className="text-sm text-gray-500 line-clamp-2 mb-3">{product.description}</p>
        <div className="text-xs text-gray-400">
          {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;