import { useState } from 'react';
import { motion } from 'framer-motion';
import ProductCard from './ProductCard';

const Products = ({ products, addToCart }) => {
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 5000 });

  const filteredProducts = products.filter((product) => {
    const inCategory = categoryFilter === 'all' || product.category === categoryFilter;
    const inPriceRange = product.price >= priceRange.min && product.price <= priceRange.max;
    return inCategory && inPriceRange;
  });

  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    setPriceRange((prev) => ({ ...prev, [name]: Number(value) }));
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="py-12"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Barcha Mahsulotlar
        </h2>
        <div className="mb-8 flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-gray-700 font-semibold mb-1">Kategoriya</label>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value="all">Barchasi</option>
              <option value="Selofan">Selofan</option>
              <option value="Rulon">Rulon</option>
            </select>
          </div>
          <div className="flex-1">
            <label className="block text-gray-700 font-semibold mb-1">Narx oralig‘i</label>
            <div className="flex gap-4">
              <input
                type="number"
                name="min"
                value={priceRange.min}
                onChange={handlePriceChange}
                placeholder="Min narx"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <input
                type="number"
                name="max"
                value={priceRange.max}
                onChange={handlePriceChange}
                placeholder="Max narx"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} addToCart={addToCart} />
            ))
          ) : (
            <p className="text-center text-gray-600 col-span-full">Mahsulot topilmadi</p>
          )}
        </div>
      </div>
    </motion.section>
  );
};

export default Products;