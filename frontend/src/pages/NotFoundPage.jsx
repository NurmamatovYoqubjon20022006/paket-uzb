import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

const NotFoundPage = () => {
  const { currentLanguage } = useLanguage();
  
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        {/* 404 Animation */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="mb-8"
        >
          <div className="text-9xl font-bold text-blue-600">404</div>
        </motion.div>

        {/* Error Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {currentLanguage === 'uz' ? 'Sahifa Topilmadi' :
             currentLanguage === 'ru' ? 'Страница не найдена' :
             'Page Not Found'}
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-md mx-auto">
            {currentLanguage === 'uz' ? 'Kechirasiz, siz qidirayotgan sahifa mavjud emas yoki o\'chirilgan bo\'lishi mumkin.' :
             currentLanguage === 'ru' ? 'Извините, страница, которую вы ищете, не существует или могла быть удалена.' :
             'Sorry, the page you are looking for does not exist or may have been deleted.'}
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center"
        >
          <Link
            to="/"
            className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>            {currentLanguage === 'uz' ? 'Bosh Sahifaga Qaytish' :
             currentLanguage === 'ru' ? 'Вернуться на главную' :
             'Return to Home'}
          </Link>
          
          <Link
            to="/products"
            className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            {currentLanguage === 'uz' ? 'Mahsulotlar' :
             currentLanguage === 'ru' ? 'Товары' :
             'Products'}
          </Link>
        </motion.div>

        {/* Contact Support */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-12 pt-8 border-t border-gray-200"
        >          <p className="text-gray-500 mb-4">
            {currentLanguage === 'uz' ? 'Yordam kerakmi? Biz bilan bog\'laning:' :
             currentLanguage === 'ru' ? 'Нужна помощь? Свяжитесь с нами:' :
             'Need help? Contact us:'}
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-6">
            <a
              href="tel:+998901234567"
              className="inline-flex items-center text-blue-600 hover:text-blue-700 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              +998 90 123 45 67
            </a>
            
            <Link
              to="/contact"
              className="inline-flex items-center text-blue-600 hover:text-blue-700 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              {currentLanguage === 'uz' ? 'Aloqa formi' :
               currentLanguage === 'ru' ? 'Форма обратной связи' :
               'Contact form'}
            </Link>
          </div>
        </motion.div>

        {/* Fun Element */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-8"
        >
          <div className="text-6xl mb-4">📦</div>
          <p className="text-gray-400 text-sm">
            {currentLanguage === 'uz' ? 'Bizning paketlar kabi, bu sahifa ham yo\'qolgan...' :
             currentLanguage === 'ru' ? 'Как и наши пакеты, эта страница тоже потерялась...' :
             'Like our packages, this page has also gone missing...'}
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;