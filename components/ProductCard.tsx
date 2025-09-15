'use client';

import React, { useState } from 'react';
import { Heart, Plus } from 'lucide-react';
import { Product } from '@/lib/data';
import Image from 'next/image';
import { useCart } from '@/stores/CartStore';
import { useTranslations } from 'next-intl';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const t = useTranslations('Shop.ProductCard');
  const tc = useTranslations('Shop.categories');
  const [isFavorite, setIsFavorite] = useState(false);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    if (product.stock > 0) {
      addToCart(product);
    }
  };

  return (
    <div className="w-full max-w-sm">
      <div className="group bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
        {/* Image Section with Gradient Background - Reduced height */}
        <div className="relative bg-gradient-to-br from-purple-400 via-purple-500 to-purple-600 h-56">
          {/* Heart Icon */}
          <button
            onClick={() => setIsFavorite(!isFavorite)}
            className="absolute top-4 right-4 w-10 h-10 bg-white bg-opacity-20 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 hover:bg-opacity-30 hover:scale-110"
          >
            <Heart
              className={`w-5 h-5 transition-all duration-300 ${
                isFavorite ? 'fill-white text-white' : 'text-white'
              }`}
            />
          </button>

          {/* Product Image - Updated to fill the entire section */}
          <div className="relative w-full h-full overflow-hidden">
            {product.images[0] ? (
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
              />
            ) : (
              <div className="bg-gray-200 flex items-center justify-center text-gray-500 w-full h-full">
                {t('noImage')}
              </div>
            )}
          </div>
        </div>
        {/* Content Section - Reduced padding */}
        <div className="p-6 bg-white">
          {/* Product Title */}
          <h2 className="text-xl font-bold text-gray-900 mb-3">
            {product.name}
          </h2>

          {/* Badges */}
          <div className="flex gap-2 mb-4">
            <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium border border-gray-200 uppercase">
              {tc(product.category)}
            </span>
            {product.stock > 0 ? (
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium border border-green-200">
                {t('inStock')}
              </span>
            ) : (
              <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium border border-red-200">
                {t('outOfStock')}
              </span>
            )}
          </div>

          {/* Description - Truncated for compact design */}
          <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-2">
            {product.description}
          </p>

          {/* Price and Add to Cart */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 font-medium mb-1">{t('priceLabel')}</p>
              <p className="text-2xl font-bold text-gray-900">
                ${product.price.toFixed(2)}
              </p>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className={`font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center gap-2 text-sm ${
                product.stock > 0
                  ? 'bg-gradient-to-r from-cyan-400 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white transition-all duration-300'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {t('addToCart')}
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;