import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { formatPrice } from '../../services/api';

// Icons
const CartIcon = () => (
  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5H6m1 0V13m0 0h3" />
  </svg>
);

const EyeIcon = () => (
  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

const HeartIcon = () => (
  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>
);

const StarIcon = ({ filled = false }) => (
  <svg className={`h-4 w-4 ${filled ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

const ProductCard = ({ product, onAddToCart, variant = 'default' }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isLoading) return;
    
    setIsLoading(true);
    try {
      await onAddToCart(product);
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLike = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  const getStockBadge = () => {
    if (!product.inventory?.inStock) {
      return (
        <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
          Tugagan
        </span>
      );
    }
    
    if (product.inventory?.quantity <= 10) {
      return (
        <span className="absolute top-3 left-3 bg-orange-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
          Kam qoldi
        </span>
      );
    }
    
    if (product.isNew) {
      return (
        <span className="absolute top-3 left-3 bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
          Yangi
        </span>
      );
    }
    
    return null;
  };

  const getDiscountBadge = () => {
    if (product.discountPercentage > 0) {
      return (
        <span className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
          -{product.discountPercentage}%
        </span>
      );
    }
    return null;
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    
    for (let i = 0; i < 5; i++) {
      stars.push(
        <StarIcon key={i} filled={i < fullStars} />
      );
    }
    
    return stars;
  };

  const cardContent = (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className={`bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group ${
        variant === 'compact' ? 'h-auto' : 'h-full'
      }`}
    >
      {/* Product Image */}
      <div className="relative overflow-hidden bg-gray-100">
        <img
          src={imageError ? '/images/placeholder.jpg' : (product.images?.[0] || '/images/placeholder.jpg')}
          alt={product.name}
          className={`w-full object-cover transition-transform duration-500 group-hover:scale-110 ${
            variant === 'compact' ? 'h-48' : 'h-64'
          }`}
          onError={() => setImageError(true)}
        />
        
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <div className="flex space-x-2">
            <Link
              to={`/products/${product._id}`}
              className="p-2 bg-white rounded-full text-gray-800 hover:bg-blue-600 hover:text-white transition-colors"
              title="Ko'rish"
            >
              <EyeIcon />
            </Link>
            <button
              onClick={handleLike}
              className={`p-2 bg-white rounded-full transition-colors ${
                isLiked 
                  ? 'text-red-500 hover:text-red-600' 
                  : 'text-gray-800 hover:bg-red-500 hover:text-white'
              }`}
              title="Sevimli"
            >
              <HeartIcon />
            </button>
          </div>
        </div>

        {/* Badges */}
        {getStockBadge()}
        {getDiscountBadge()}
      </div>

      {/* Product Info */}
      <div className="p-4 flex flex-col h-full">
        {/* Category */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
            {product.category}
          </span>
          {product.ratings?.count > 0 && (
            <div className="flex items-center space-x-1">
              <div className="flex">
                {renderStars(product.ratings.average)}
              </div>
              <span className="text-xs text-gray-500">({product.ratings.count})</span>
            </div>
          )}
        </div>

        {/* Product Name */}
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 flex-grow">
          {product.name}
        </h3>

        {/* Product Size */}
        <p className="text-sm text-gray-600 mb-3">
          <span className="font-medium">O'lcham:</span> {product.size}
        </p>

        {/* Features */}
        {product.features && product.features.length > 0 && (
          <div className="mb-3">
            <div className="flex flex-wrap gap-1">
              {product.features.slice(0, 2).map((feature, index) => (
                <span
                  key={index}
                  className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
                >
                  {feature}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Stock Info */}
        {product.inventory?.inStock && product.inventory?.quantity <= 10 && (
          <p className="text-xs text-orange-600 mb-2">
            Faqat {product.inventory.quantity} ta qoldi!
          </p>
        )}

        {/* Price */}
        <div className="mb-4">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold text-gray-900">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-sm text-gray-500 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
          {product.inventory?.inStock && (
            <p className="text-xs text-gray-500 mt-1">
              Mavjud: {product.inventory.quantity} ta
            </p>
          )}
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={!product.inventory?.inStock || isLoading}
          className={`w-full py-3 px-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${
            !product.inventory?.inStock
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : isLoading
              ? 'bg-blue-400 text-white cursor-wait'
              : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg transform hover:-translate-y-0.5'
          }`}
        >
          {isLoading ? (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
          ) : !product.inventory?.inStock ? (
            <span>Tugagan</span>
          ) : (
            <>
              <CartIcon />
              <span>Savatga Qo'shish</span>
            </>
          )}
        </button>
      </div>
    </motion.div>
  );

  // If variant is link, wrap in Link, otherwise return as is
  if (variant === 'link') {
    return (
      <Link to={`/products/${product._id}`} className="block h-full">
        {cardContent}
      </Link>
    );
  }

  return cardContent;
};

export default ProductCard;