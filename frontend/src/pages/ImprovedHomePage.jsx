import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useProducts, useCart } from '../App';
import { useLanguage } from '../contexts/LanguageContext';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import ProductCard from '../components/Product/ProductCard';
import * as api from '../services/api';

// Modern Icons
const ShieldCheckIcon = () => (
  <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

const TruckFastIcon = () => (
  <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12l4 4 4-4m0 6H8a2 2 0 01-2-2V7a2 2 0 012-2h8a2 2 0 012 2v13a2 2 0 01-2 2z" />
  </svg>
);

const SupportHeartIcon = () => (
  <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>
);

const StarFilledIcon = () => (
  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
);

const QuoteIcon = () => (
  <svg className="h-8 w-8 text-blue-200" fill="currentColor" viewBox="0 0 32 32">
    <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z"/>
  </svg>
);

const ImprovedHomePage = () => {
  const { products, isLoading, fetchProducts } = useProducts();  
  const { addToCart } = useCart();
  const { t, currentLanguage, translations } = useLanguage();
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [heroIndex, setHeroIndex] = useState(0);

  // Xavfsizlik uchun translation funksiyasi
  const safeT = (key, fallback = key) => {
    try {
      if (!t || typeof t !== 'function') {
        return fallback;
      }
      const result = t(key);
      return result || fallback;
    } catch (error) {
      console.error('Translation error in HomePage:', error);
      return fallback;
    }
  };

  // Get current language safely
  const currentLang = currentLanguage || 'uz';
  const currentTranslations = translations?.[currentLang] || {};

  // Fetch products
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoadingProducts(true);
        const response = await api.getProducts({ limit: 6 });
        if (response.products) {
          setFeaturedProducts(response.products);
        }
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setLoadingProducts(false);
      }
    };

    loadProducts();
  }, []);  // Hero carousel - xavfsiz tarjimalar bilan
  const heroSlides = [
    {
      title: t('heroTitle'),
      subtitle: t('heroSubtitle'),
      image: '/images/hero/packaging1.jpg',
      gradient: 'from-blue-600 via-blue-700 to-blue-800'
    },
    {
      title: t('features.quality.title'),
      subtitle: t('features.quality.description'),
      image: '/images/hero/eco.jpg', 
      gradient: 'from-green-600 via-green-700 to-green-800'
    },
    {
      title: t('features.support.title'),
      subtitle: t('features.support.description'),
      image: '/images/hero/service.jpg',
      gradient: 'from-purple-600 via-purple-700 to-purple-800'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setHeroIndex((prevIndex) => (prevIndex + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);  const features = [
    {
      icon: <ShieldCheckIcon />,
      title: t('features.quality.title'),
      description: t('features.quality.description')
    },
    {
      icon: <TruckFastIcon />,
      title: t('features.delivery.title'),
      description: t('features.delivery.description')
    },
    {
      icon: <SupportHeartIcon />,
      title: t('features.support.title'),
      description: t('features.support.description')
    }
  ];
  const testimonials = [
    {
      name: t('testimonials.customer1.name'),
      role: t('testimonials.customer1.role'),
      content: t('testimonials.customer1.content'),
      rating: 5,
      avatar: '/images/avatars/user1.jpg'
    },
    {
      name: t('testimonials.customer2.name'),
      role: t('testimonials.customer2.role'),
      content: t('testimonials.customer2.content'),
      rating: 5,
      avatar: '/images/avatars/user2.jpg'
    },
    {
      name: t('testimonials.customer3.name'),
      role: t('testimonials.customer3.role'),
      content: t('testimonials.customer3.content'),
      rating: 5,
      avatar: '/images/avatars/user3.jpg'
    }  ];
  const stats = [
    {
      number: '5000+',
      label: t('stats.customers')
    },
    {
      number: '50+',
      label: t('stats.products')
    },
    {
      number: '99%',
      label: t('stats.quality')
    },
    {
      number: '24/7',
      label: t('stats.support')
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section with Carousel */}
      <section className="relative h-screen overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={heroIndex}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 1 }}
            className={`absolute inset-0 bg-gradient-to-br ${heroSlides[heroIndex].gradient}`}
          >
            {/* Background Pattern */}
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-black/20" />
              <div 
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpolygon points='50 0 60 40 100 50 60 60 50 100 40 60 0 50 40 40'/%3E%3C/g%3E%3C/svg%3E")`,
                }}
              />
            </div>

            {/* Hero Content */}
            <div className="relative z-10 h-full flex items-center">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-white text-center lg:text-left"
                  >
                    <motion.h1 
                      className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-8 leading-tight"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.4 }}
                    >
                      {heroSlides[heroIndex].title}
                    </motion.h1>
                    
                    <motion.p 
                      className="text-xl lg:text-2xl mb-12 text-white/90 leading-relaxed max-w-2xl"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.6 }}
                    >
                      {heroSlides[heroIndex].subtitle}
                    </motion.p>

                    <motion.div 
                      className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.8 }}
                    >
                      <Link
                        to="/products"
                        className="group inline-flex items-center justify-center px-8 py-4 bg-white text-gray-900 font-semibold rounded-2xl hover:bg-gray-100 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 hover:scale-105"
                      >                        {t('common.viewProducts')}
                        <ArrowRightIcon />
                      </Link>
                      
                      <Link
                        to="/contact"
                        className="group inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-semibold rounded-2xl hover:bg-white hover:text-gray-900 transition-all duration-300 transform hover:-translate-y-2"
                      >
                        {t('common.contact')}
                      </Link>
                    </motion.div>
                  </motion.div>

                  {/* Hero Visual/Stats */}
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="hidden lg:block"
                  >
                    <div className="grid grid-cols-2 gap-6">
                      {stats.map((stat, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                          className="bg-white/10 backdrop-blur-md rounded-3xl p-8 text-center border border-white/20"
                        >
                          <div className="text-4xl font-bold text-white mb-2">{stat.number}</div>
                          <div className="text-white/80 text-sm font-medium">{stat.label}</div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Hero Navigation Dots */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
              {heroSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setHeroIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === heroIndex ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/75'
                  }`}
                />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              {t('features.sectionTitle')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('features.sectionDescription')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 group"
              >
                <div className="text-blue-600 mb-6 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">              {t('products.featured.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('products.featured.description')}
            </p>
          </motion.div>

          {loadingProducts ? (
            <div className="flex justify-center items-center py-20">
              <LoadingSpinner />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProducts.map((product, index) => (
                <motion.div
                  key={product._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <Link
              to="/products"
              className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-2xl hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >              {t('common.allProducts')}
              <ArrowRightIcon />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              {t('testimonials.sectionTitle')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('testimonials.sectionDescription')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 relative"
              >
                <div className="absolute -top-4 -right-4 opacity-20">
                  <QuoteIcon />
                </div>
                
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div className="ml-4">
                    <h4 className="font-bold text-gray-900 text-lg">{testimonial.name}</h4>
                    <p className="text-gray-600">{testimonial.role}</p>
                  </div>
                </div>

                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <StarFilledIcon key={i} />
                  ))}
                </div>

                <p className="text-gray-700 leading-relaxed italic">
                  "{testimonial.content}"
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >            <h2 className="text-4xl lg:text-6xl font-bold mb-8">
              {t('cta.title')}
            </h2>
            <p className="text-xl lg:text-2xl mb-12 text-white/90 max-w-3xl mx-auto">
              {t('cta.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link
                to="/products"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-2xl hover:bg-gray-100 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:-translate-y-2"
              >
                {t('common.viewProducts')}
                <ArrowRightIcon />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-semibold rounded-2xl hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:-translate-y-2"
              >                {t('common.contact')}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ImprovedHomePage;
