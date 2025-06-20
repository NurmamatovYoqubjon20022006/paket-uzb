import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useProducts, useCart } from '../App';
import ProductCard from '../components/Product/ProductCard';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../i18n/translations';

const ProductsPage = () => {
  const { products, isLoading, error, fetchProducts } = useProducts();
  const { addToCart } = useCart();
  const { currentLanguage } = useLanguage();
  
  // Xavfsiz translations - har doim ishlaydi
  const getTranslation = () => {
    try {
      return translations?.[currentLanguage] || translations?.uz || {};
    } catch (error) {
      console.warn('Translation error:', error);
      return {};
    }
  };

  const t = getTranslation();
  
  // Fallback translations - agar asosiy translations ishlamasa
  const fallbackTexts = {
    title: 'Mahsulotlar',
    subtitle: 'Bizning sifatli paketlash materiallari',
    search: 'Qidirish',
    searchPlaceholder: 'Mahsulot nomi bo\'yicha qidirish...',
    category: 'Kategoriya',
    allCategories: 'Barcha kategoriyalar',
    priceRange: 'Narx oralig\'i',
    minPrice: 'Minimal narx',
    maxPrice: 'Maksimal narx',
    apply: 'Qo\'llash',
    clear: 'Tozalash',
    newest: 'Eng yangilari',
    priceAsc: 'Narxi: Arzondan qimmaga',
    priceDesc: 'Narxi: Qimmatdan arzonga',
    nameAsc: 'Nomi: A-Z',
    nameDesc: 'Nomi: Z-A',
    addToCart: 'Savatga qo\'shish',
    selofan: 'Selofan Paketlar',
    rulon: 'Rulon Paketlar',
    plastik: 'Plastik Paketlar',
    qogoz: 'Qog\'oz Paketlar'
  };

  // Safe getter function
  const getText = (path) => {
    try {
      const keys = path.split('.');
      let value = t;
      for (const key of keys) {
        value = value?.[key];
      }
      return value || fallbackTexts[keys[keys.length - 1]] || path;
    } catch (error) {
      const lastKey = path.split('.').pop();
      return fallbackTexts[lastKey] || path;
    }
  };
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 5000 });
  const [searchQuery, setSearchQuery] = useState('');
  useEffect(() => {
    fetchProducts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let filtered = products;

    // Category filter
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(product => product.category === categoryFilter);
    }

    // Price filter
    filtered = filtered.filter(product => 
      product.price >= priceRange.min && product.price <= priceRange.max
    );    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.nameRu && product.nameRu.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (product.nameEn && product.nameEn.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (product.descriptionRu && product.descriptionRu.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (product.descriptionEn && product.descriptionEn.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    setFilteredProducts(filtered);
  }, [products, categoryFilter, priceRange, searchQuery]);

  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    setPriceRange(prev => ({ ...prev, [name]: Number(value) }));
  };

  return (
    <div className="min-h-screen bg-gray-50">      {/* Header */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            {getText('productsPage.title')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl"
          >
            {getText('productsPage.subtitle')}
          </motion.p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4">          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">            {/* Search */}
            <div>
              <label className="block text-sm font-medium mb-2">{getText('search')}</label>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={getText('searchPlaceholder')}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium mb-2">{getText('category')}</label>              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">{getText('allCategories')}</option>
                <option value="Selofan">{getText('selofan')}</option>                <option value="Rulon">{getText('rulon')}</option>
                <option value="Plastik">{getText('plastik')}</option>
                <option value="Qogoz">{getText('qogoz')}</option>
              </select>
            </div>

            {/* Price Min */}
            <div>
              <label className="block text-sm font-medium mb-2">{getText('minPrice')}</label>
              <input
                type="number"
                name="min"
                value={priceRange.min}
                onChange={handlePriceChange}
                placeholder="0"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Price Max */}
            <div>
              <label className="block text-sm font-medium mb-2">{getText('maxPrice')}</label>
              <input
                type="number"
                name="max"
                value={priceRange.max}
                onChange={handlePriceChange}
                placeholder="5000"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">          {isLoading ? (
            <div className="flex justify-center">
              <LoadingSpinner />
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">⚠️</div>
              <h3 className="text-xl font-semibold text-red-600 mb-2">
                {error}
              </h3>
              <p className="text-gray-500 mb-6">
                Internet aloqasi yoki server bilan bog'lanishda muammo bo'lishi mumkin
              </p>
              <button
                onClick={() => fetchProducts()}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                🔄 Qayta urinish
              </button>
            </div>
          ) : filteredProducts.length > 0 ? (<>              <div className="mb-6">
                <p className="text-gray-600">
                  {filteredProducts.length} mahsulot topildi
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product._id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <ProductCard product={product} onAddToCart={addToCart} />
                  </motion.div>
                ))}
              </div>
            </>
          ) : (            <div className="text-center py-20">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                Mahsulot topilmadi
              </h3>
              <p className="text-gray-500 mb-6">
                Filtrlarni o'zgartiring yoki qidiruvni yangilang
              </p>
              <button
                onClick={() => {
                  setCategoryFilter('all');
                  setPriceRange({ min: 0, max: 5000 });
                  setSearchQuery('');
                }}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Filtrlarni tozalash
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ProductsPage;