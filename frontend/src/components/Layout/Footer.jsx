import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';

// Icons
const PhoneIcon = () => (
  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);

const EmailIcon = () => (
  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const LocationIcon = () => (
  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const ClockIcon = () => (
  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const TelegramIcon = () => (
  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.621 5.367 11.988 11.988 11.988s11.988-5.367 11.988-11.988C24.005 5.367 18.638.001 12.017.001zM8.449 16.988c-1.297 0-2.348-1.051-2.348-2.348s1.051-2.348 2.348-2.348 2.348 1.051 2.348 2.348-1.051 2.348-2.348 2.348zm7.718 0c-1.297 0-2.348-1.051-2.348-2.348s1.051-2.348 2.348-2.348 2.348 1.051 2.348 2.348-1.051 2.348-2.348 2.348z"/>
  </svg>
);

const Footer = () => {
  const { currentLanguage } = useLanguage();
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { 
      label: currentLanguage === 'uz' ? 'Bosh Sahifa' :
              currentLanguage === 'ru' ? 'Главная' :
              'Home', 
      to: '/' 
    },
    { 
      label: currentLanguage === 'uz' ? 'Mahsulotlar' :
              currentLanguage === 'ru' ? 'Товары' :
              'Products', 
      to: '/products' 
    },
    { 
      label: currentLanguage === 'uz' ? 'Biz Haqimizda' :
              currentLanguage === 'ru' ? 'О нас' :
              'About Us', 
      to: '/about' 
    },
    { 
      label: currentLanguage === 'uz' ? 'Aloqa' :
              currentLanguage === 'ru' ? 'Контакты' :
              'Contact', 
      to: '/contact' 
    },
  ];

  const categories = [
    { 
      label: currentLanguage === 'uz' ? 'Selofan Paketlar' :
              currentLanguage === 'ru' ? 'Пакеты из целлофана' :
              'Cellophane Bags', 
      to: '/products?category=Selofan' 
    },
    { 
      label: currentLanguage === 'uz' ? 'Rulon Paketlar' :
              currentLanguage === 'ru' ? 'Рулонные пакеты' :
              'Roll Bags', 
      to: '/products?category=Rulon' 
    },
    { 
      label: currentLanguage === 'uz' ? 'Aksessuarlar' :
              currentLanguage === 'ru' ? 'Аксессуары' :
              'Accessories', 
      to: '/products?category=Aksessuarlar' 
    },
  ];

  const services = [
    currentLanguage === 'uz' ? 'Bepul yetkazib berish' :
    currentLanguage === 'ru' ? 'Бесплатная доставка' :
    'Free delivery',
    
    currentLanguage === 'uz' ? 'Sifat kafolati' :
    currentLanguage === 'ru' ? 'Гарантия качества' :
    'Quality guarantee',
    
    currentLanguage === 'uz' ? 'Tez yetkazib berish' :
    currentLanguage === 'ru' ? 'Быстрая доставка' :
    'Fast delivery',
    
    currentLanguage === 'uz' ? '24/7 qo\'llab-quvvatlash' :
    currentLanguage === 'ru' ? 'Поддержка 24/7' :
    '24/7 support',
  ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                P
              </div>
              <span className="text-2xl font-bold">Paket UZB</span>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Do'konlar, aptekalar va bizneslar uchun yuqori sifatli selofan va rulon paketlar. 
              Ishonchli hamkor va tez yetkazib berish xizmati.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              <a
                href="https://t.me/paketuzb"
                className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center hover:bg-blue-700 transition-colors"
                aria-label="Telegram"
              >
                <TelegramIcon />
              </a>
              <a
                href="https://instagram.com/paketuzb"
                className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center hover:from-purple-700 hover:to-pink-700 transition-colors"
                aria-label="Instagram"
              >
                <InstagramIcon />
              </a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold mb-4">Tez Havolalar</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-gray-400 hover:text-white transition-colors flex items-center group"
                  >
                    <span className="w-2 h-2 bg-blue-600 rounded-full mr-3 group-hover:bg-blue-400 transition-colors"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Categories */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold mb-4">Kategoriyalar</h3>
            <ul className="space-y-3">
              {categories.map((category) => (
                <li key={category.to}>
                  <Link
                    to={category.to}
                    className="text-gray-400 hover:text-white transition-colors flex items-center group"
                  >
                    <span className="w-2 h-2 bg-green-600 rounded-full mr-3 group-hover:bg-green-400 transition-colors"></span>
                    {category.label}
                  </Link>
                </li>
              ))}
            </ul>

            <h4 className="text-md font-semibold mt-6 mb-3">Xizmatlar</h4>
            <ul className="space-y-2">
              {services.map((service, index) => (
                <li key={index} className="text-gray-400 flex items-center">
                  <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full mr-3"></span>
                  <span className="text-sm">{service}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold mb-4">Aloqa Ma'lumotlari</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <PhoneIcon />
                <div>
                  <p className="font-medium">+998 90 123 45 67</p>
                  <p className="text-sm text-gray-400">Asosiy telefon</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <EmailIcon />
                <div>
                  <p className="font-medium">info@paketuzb.uz</p>
                  <p className="text-sm text-gray-400">Email manzil</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <LocationIcon />
                <div>
                  <p className="font-medium">Toshkent, O'zbekiston</p>
                  <p className="text-sm text-gray-400">Asosiy ofis</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <ClockIcon />
                <div>
                  <p className="font-medium">Dushanba - Juma</p>
                  <p className="text-sm text-gray-400">9:00 - 18:00</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h3 className="text-xl font-semibold mb-2">Yangiliklar va Chegirmalar</h3>
            <p className="text-gray-400 mb-6">
              Eng so'nggi mahsulotlar va maxsus takliflar haqida birinchi bo'lib xabar oling
            </p>
            <div className="max-w-md mx-auto flex">
              <input
                type="email"
                placeholder="Email manzilingizni kiriting"
                className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-white placeholder-gray-400"
              />
              <button className="px-6 py-3 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 transition-colors font-medium">
                Obuna
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="bg-gray-950 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © {currentYear} Paket UZB. Barcha huquqlar himoyalangan.
            </div>
            <div className="flex space-x-6 text-sm">
              <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">
                Maxfiylik Siyosati
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-white transition-colors">
                Foydalanish Shartlari
              </Link>
              <Link to="/shipping" className="text-gray-400 hover:text-white transition-colors">
                Yetkazib Berish
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;