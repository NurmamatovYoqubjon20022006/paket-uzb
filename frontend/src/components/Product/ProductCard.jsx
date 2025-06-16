import React from 'react';

const SimpleProductCard = ({ product, onAddToCart }) => {
  const handleAddToCart = () => {
    console.log('Adding to cart:', product);
    onAddToCart(product);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden p-4">
      {/* Product Image */}
      <img
        src={product.images?.[0] || 'https://via.placeholder.com/300x200/3B82F6/FFFFFF?text=Mahsulot'}
        alt={product.name}
        className="w-full h-48 object-cover rounded-lg mb-4"
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