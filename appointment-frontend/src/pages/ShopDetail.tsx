import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getShopById, getShopProducts } from '../services/api';
import { MapPin, Clock, Star, Phone, Mail, ShoppingBag, Calendar, Grid, Share2 } from 'lucide-react';
import BookingModal from '../components/BookingModal';
import ProductCard from '../components/ProductCard';
import ChatWidget from '../components/ChatWidget';
import { Product, Shop } from '../types';

const ShopDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<'services' | 'products'>('services');
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const { data: shop, isLoading: isShopLoading } = useQuery<Shop>({
    queryKey: ['shop', id],
    queryFn: () => getShopById(Number(id)),
  });

  const { data: products } = useQuery<Product[]>({
    queryKey: ['shop-products', id],
    queryFn: () => getShopProducts(Number(id)),
    enabled: !!shop // only fetch if shop exists
  });

  if (isShopLoading) return <div className="flex justify-center items-center h-96"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div></div>;
  if (!shop) return <div className="text-center py-20 text-xl font-semibold text-gray-500">Shop not found</div>;

  return (
    <div className="pb-20">
      {/* Hero Section */}
      <div className="relative h-64 md:h-80 w-full bg-gray-200">
        <img src={shop.bannerUrl} alt="Cover" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-4 right-4 flex gap-2">
           <button className="bg-white/20 backdrop-blur-md text-white px-3 py-1 rounded-full text-sm hover:bg-white/30 flex items-center gap-1">
             <Share2 size={14} /> Share
           </button>
        </div>
      </div>

      {/* Profile Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative -mt-16">
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 flex flex-col md:flex-row gap-6 items-start md:items-center">
          <img 
            src={shop.logoUrl} 
            alt="Logo" 
            className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white shadow-md bg-white object-cover -mt-16 md:-mt-0" 
          />
          
          <div className="flex-1 w-full">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{shop.name}</h1>
                <div className="flex items-center gap-2 mt-1">
                  <span className="bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wide">
                    {shop.categoryName}
                  </span>
                  <div className="flex items-center text-yellow-500 text-sm">
                    <Star size={16} fill="currentColor" />
                    <span className="ml-1 font-medium text-gray-700">{shop.rating} (120 reviews)</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 w-full md:w-auto">
                <button 
                  onClick={() => setIsBookingOpen(true)}
                  className="flex-1 md:flex-none bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 shadow-md transition-all hover:scale-105 flex items-center justify-center gap-2"
                >
                  <Calendar size={20} />
                  Book Now
                </button>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-600 text-sm">
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-gray-400" />
                {shop.location}
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-gray-400" />
                {shop.openingHours}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('services')}
              className={`pb-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                activeTab === 'services'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Grid size={18} /> Services & Info
            </button>
            <button
              onClick={() => setActiveTab('products')}
              className={`pb-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                activeTab === 'products'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <ShoppingBag size={18} /> Products ({products?.length || 0})
            </button>
          </nav>
        </div>

        <div className="mt-8">
          {activeTab === 'services' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <section>
                  <h2 className="text-xl font-bold text-gray-900 mb-4">About Us</h2>
                  <p className="text-gray-600 leading-relaxed bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
                    {shop.description}
                  </p>
                </section>
                
                <section>
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Our Services</h2>
                  <div className="bg-white rounded-lg border border-gray-100 shadow-sm divide-y">
                     <div className="p-4 flex justify-between items-center hover:bg-gray-50 cursor-pointer" onClick={() => setIsBookingOpen(true)}>
                        <div>
                           <h3 className="font-medium text-gray-900">Standard Consultation</h3>
                           <p className="text-sm text-gray-500">30 mins</p>
                        </div>
                        <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-xs font-semibold">Book</span>
                     </div>
                     <div className="p-4 flex justify-between items-center hover:bg-gray-50 cursor-pointer" onClick={() => setIsBookingOpen(true)}>
                        <div>
                           <h3 className="font-medium text-gray-900">Premium Service</h3>
                           <p className="text-sm text-gray-500">1 hour</p>
                        </div>
                        <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-xs font-semibold">Book</span>
                     </div>
                  </div>
                </section>
              </div>

              <div className="lg:col-span-1">
                 <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 sticky top-24">
                    <h3 className="font-bold text-gray-900 mb-4">Contact Info</h3>
                    <div className="space-y-4">
                       <div className="flex items-center gap-3 text-gray-600">
                          <Phone size={18} />
                          <span>+1 (555) 123-4567</span>
                       </div>
                       <div className="flex items-center gap-3 text-gray-600">
                          <Mail size={18} />
                          <span>contact@{shop.name.replace(/\s+/g, '').toLowerCase()}.com</span>
                       </div>
                    </div>
                    <button 
                       onClick={() => setIsBookingOpen(true)}
                       className="w-full mt-6 bg-indigo-600 text-white py-2 rounded-md font-medium hover:bg-indigo-700"
                    >
                       Book Appointment
                    </button>
                 </div>
              </div>
            </div>
          )}

          {activeTab === 'products' && (
             <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products?.map(product => (
                   <ProductCard key={product.id} product={product} />
                ))}
                {(!products || products.length === 0) && (
                   <div className="col-span-full text-center py-12 text-gray-500">
                      No products available yet.
                   </div>
                )}
             </div>
          )}
        </div>
      </div>

      {/* Modals & Widgets */}
      <BookingModal 
        shopId={shop.id} 
        shopName={shop.name}
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />
      <ChatWidget shopName={shop.name} />
    </div>
  );
};

export default ShopDetail;
