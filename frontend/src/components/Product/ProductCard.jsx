import React, { useState } from 'react';
// import { motion } from 'framer-motion'; // Hozircha ishlatilmaydi
import { useCart } from '../../App';
import { useLanguage } from '../../contexts/LanguageContext';

// Icons - hozircha ishlatilmaydi, lekin keyinchalik kerak bo'lishi mumkin
// eslint-disable-next-line no-unused-vars
const HeartIcon = ({ filled = false }) => (
  <svg className="h-6 w-6" fill={filled ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>
);

// eslint-disable-next-line no-unused-vars
const CartPlusIcon = () => (
  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
  </svg>
);

// eslint-disable-next-line no-unused-vars
const CheckIcon = () => (
  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

const SimpleProductCard = ({ product, onAddToCart }) => {
  const { addToCart } = useCart();
  const { currentLanguage } = useLanguage();
  // eslint-disable-next-line no-unused-vars
  const [isAdding, setIsAdding] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Safe text getter - hozircha ishlatilmaydi, lekin keyinchalik kerak
  // eslint-disable-next-line no-unused-vars
  const getText = (key) => {
    const texts = {
      addToCart: currentLanguage === 'uz' ? 'Savatga qo\'shish' :
                 currentLanguage === 'ru' ? 'В корзину' :
                 'Add to Cart',
      added: currentLanguage === 'uz' ? 'Qo\'shildi' :
             currentLanguage === 'ru' ? 'Добавлено' :
             'Added',
      outOfStock: currentLanguage === 'uz' ? 'Tugagan' :
                  currentLanguage === 'ru' ? 'Нет в наличии' :
                  'Out of Stock'
    };
    return texts[key] || key;
  };

  const handleAddToCart = async () => {
    try {
      setIsAdding(true);
      if (onAddToCart) {
        onAddToCart(product);
      } else {
        await addToCart(product, 1);
      }
      
      setTimeout(() => setIsAdding(false), 1500);
    } catch (error) {
      console.error('Error adding to cart:', error);
      setIsAdding(false);
    }
  };

  const handleImageError = () => {
    setImageError(true);
  };
  const getImageSrc = () => {
    if (imageError) {
      // Agar rasm yuklanmasa, go'zal placeholder ko'rsatamiz
      return `https://via.placeholder.com/400x300/3B82F6/FFFFFF?text=${encodeURIComponent(product.name || 'Mahsulot')}`;
    }
    
    // Avval mahsulot rasmini, keyin fallback ni ishlatamiz
    const productImage = product.images?.[0];
    if (productImage && productImage.startsWith('http')) {
      return productImage;
    }
    
    // Fallback - kategoriya bo'yicha rangli placeholder
    const categoryColors = {
      'Selofan': '4F46E5', // Indigo
      'Rulon': '059669',   // Emerald  
      'Plastik': 'DC2626', // Red
      'Qogoz': 'D97706'    // Amber
    };
    
    const color = categoryColors[product.category] || '3B82F6';
    return `https://via.placeholder.com/400x300/${color}/FFFFFF?text=${encodeURIComponent(product.name || 'Mahsulot')}`;
  };
  // Price formatter - hozircha ishlatilmaydi
  // eslint-disable-next-line no-unused-vars
  const formatPrice = (price) => {
    if (!price) return '0';
    return new Intl.NumberFormat('uz-UZ').format(price);
  };
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden p-4">
      {/* Product Image */}
      <img
        src={getImageSrc()}
        alt={product.name || 'Mahsulot'}
        className="w-full h-48 object-cover rounded-lg mb-4"
        onError={handleImageError}
        loading="lazy"
      />

      {/* Product Info */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          {product.name}
        </h3>
        
        <p className="text-sm text-gray-600 mb-2">
          O'lcham: {product.size}
        </p>
        
        <p className="text-xl font-bold text-blue-600 mb-4">
          {product.price?.toLocaleString()} so'm
        </p>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
        >
          🛒 Savatga Qo'shish
        </button>
      </div>
    </div>
  );
};

export default SimpleProductCard;