import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../i18n/translations';
import * as api from '../services/api';

const ContactPage = () => {
  const { currentLanguage } = useLanguage();
    // Safe translations with fallback
  // eslint-disable-next-line no-unused-vars
  const t = translations[currentLanguage] || translations.uz || {
    contact: {
      title: 'Biz bilan bog\'laning',
      subtitle: 'Har qanday savol va takliflaringiz uchun biz bilan bog\'laning',
      form: {
        name: 'Ism familiya',
        namePlaceholder: 'Ismingizni kiriting',
        phone: 'Telefon raqam',
        phonePlaceholder: '+998 xx xxx xx xx',
        email: 'Email manzil',
        emailPlaceholder: 'example@email.com',
        subject: 'Mavzu',
        subjectPlaceholder: 'Murojaat mavzusi',
        message: 'Xabar',
        messagePlaceholder: 'Xabaringizni yozing...',
        type: 'Murojaat turi',
        submit: 'Yuborish',
        submitting: 'Yuborilmoqda...'
      },
      types: {
        inquiry: 'Umumiy savol',
        order: 'Buyurtma berish',
        complaint: 'Shikoyat',
        suggestion: 'Taklif'
      }
    }
  };
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: '',
    type: 'inquiry'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
      try {
      await api.submitContact(formData);
      toast.success(currentLanguage === 'uz' ? 'Murojaat muvaffaqiyatli yuborildi!' :
                    currentLanguage === 'ru' ? 'Обращение успешно отправлено!' :
                    'Message sent successfully!');
      setFormData({
        name: '',
        phone: '',
        email: '',
        subject: '',
        message: '',
        type: 'inquiry'
      });
    } catch (error) {
      toast.error(currentLanguage === 'uz' ? 'Murojaat yuborishda xatolik!' :
                  currentLanguage === 'ru' ? 'Ошибка при отправке обращения!' :
                  'Error sending message!');
      console.error('Contact error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  const contactInfo = [
    {
      icon: '📞',
      title: currentLanguage === 'uz' ? 'Telefon' :
             currentLanguage === 'ru' ? 'Телефон' :
             'Phone',
      details: ['+998 90 123 45 67', '+998 71 123 45 67'],
      description: currentLanguage === 'uz' ? 'Dushanba-Juma: 9:00-18:00' :
                   currentLanguage === 'ru' ? 'Понедельник-Пятница: 9:00-18:00' :
                   'Monday-Friday: 9:00-18:00'
    },
    {
      icon: '📧',
      title: 'Email',
      details: ['info@paketuzb.uz', 'orders@paketuzb.uz'],
      description: currentLanguage === 'uz' ? '24/7 javob beramiz' :
                   currentLanguage === 'ru' ? 'Отвечаем 24/7' :
                   'We respond 24/7'
    },
    {
      icon: '📍',
      title: currentLanguage === 'uz' ? 'Manzil' :
             currentLanguage === 'ru' ? 'Адрес' :
             'Address',
      details: [
        currentLanguage === 'uz' ? 'Toshkent shahri' :
        currentLanguage === 'ru' ? 'г. Ташкент' :
        'Tashkent city',
        currentLanguage === 'uz' ? 'Chilonzor tumani' :
        currentLanguage === 'ru' ? 'Чиланзарский район' :
        'Chilanzar district'
      ],
      description: currentLanguage === 'uz' ? 'Asosiy ofis' :
                   currentLanguage === 'ru' ? 'Главный офис' :
                   'Main office'
    },
    {
      icon: '⏰',
      title: currentLanguage === 'uz' ? 'Ish vaqti' :
             currentLanguage === 'ru' ? 'Рабочее время' :
             'Working hours',
      details: [
        currentLanguage === 'uz' ? 'Dushanba - Juma: 9:00-18:00' :
        currentLanguage === 'ru' ? 'Понедельник - Пятница: 9:00-18:00' :
        'Monday - Friday: 9:00-18:00',
        currentLanguage === 'uz' ? 'Shanba: 9:00-15:00' :
        currentLanguage === 'ru' ? 'Суббота: 9:00-15:00' :
        'Saturday: 9:00-15:00'
      ],
      description: currentLanguage === 'uz' ? 'Yakshanba: Dam olish' :
                   currentLanguage === 'ru' ? 'Воскресенье: Выходной' :
                   'Sunday: Day off'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-4"          >
            {currentLanguage === 'uz' ? 'Biz bilan bog\'laning' :
             currentLanguage === 'ru' ? 'Свяжитесь с нами' :
             'Contact Us'}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl"
          >
            {currentLanguage === 'uz' ? 'Savollaringiz bo\'lsa, biz bilan bog\'laning. Sizga yordam berishdan mamnunmiz!' :
             currentLanguage === 'ru' ? 'Если у вас есть вопросы, свяжитесь с нами. Мы будем рады помочь вам!' :
             'If you have any questions, contact us. We will be happy to help you!'}
          </motion.p>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow"
              >
                <div className="text-4xl mb-4">{info.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{info.title}</h3>
                {info.details.map((detail, i) => (
                  <p key={i} className="text-gray-700 font-medium">{detail}</p>
                ))}
                <p className="text-gray-500 text-sm mt-2">{info.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Contact Form & Map */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-lg shadow-md"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {currentLanguage === 'uz' ? 'Murojaat qiling' :
                 currentLanguage === 'ru' ? 'Обратитесь к нам' :
                 'Contact Us'}
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {currentLanguage === 'uz' ? 'Ism *' :
                       currentLanguage === 'ru' ? 'Имя *' :
                       'Name *'}
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder={currentLanguage === 'uz' ? 'Ismingizni kiriting' :
                                   currentLanguage === 'ru' ? 'Введите ваше имя' :
                                   'Enter your name'}
                      required
                    />
                  </div>

                  <div>                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {currentLanguage === 'uz' ? 'Telefon *' :
                       currentLanguage === 'ru' ? 'Телефон *' :
                       'Phone *'}
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="+998 90 123 45 67"
                      required
                    />
                  </div>
                </div>

                <div>                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="email@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {currentLanguage === 'uz' ? 'Murojaat turi' :
                     currentLanguage === 'ru' ? 'Тип обращения' :
                     'Contact type'}
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({...formData, type: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="inquiry">
                      {currentLanguage === 'uz' ? 'Umumiy so\'rov' :
                       currentLanguage === 'ru' ? 'Общий запрос' :
                       'General inquiry'}
                    </option>
                    <option value="complaint">
                      {currentLanguage === 'uz' ? 'Shikoyat' :
                       currentLanguage === 'ru' ? 'Жалоба' :
                       'Complaint'}
                    </option>
                    <option value="suggestion">
                      {currentLanguage === 'uz' ? 'Taklif' :
                       currentLanguage === 'ru' ? 'Предложение' :
                       'Suggestion'}
                    </option>
                    <option value="support">
                      {currentLanguage === 'uz' ? 'Yordam' :
                       currentLanguage === 'ru' ? 'Помощь' :
                       'Support'}
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {currentLanguage === 'uz' ? 'Mavzu' :
                     currentLanguage === 'ru' ? 'Тема' :
                     'Subject'}
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"                    placeholder={currentLanguage === 'uz' ? 'Murojaat mavzusi' :
                                 currentLanguage === 'ru' ? 'Тема обращения' :
                                 'Subject of message'}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {currentLanguage === 'uz' ? 'Xabar *' :
                     currentLanguage === 'ru' ? 'Сообщение *' :
                     'Message *'}
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    rows={5}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder={currentLanguage === 'uz' ? 'Xabaringizni batafsil yozing...' :
                                 currentLanguage === 'ru' ? 'Напишите ваше сообщение подробно...' :
                                 'Write your message in detail...'}
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3 px-6 rounded-lg font-semibold transition-all ${
                    isSubmitting
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700 hover:shadow-lg transform hover:-translate-y-0.5'
                  } text-white`}
                >                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      {currentLanguage === 'uz' ? 'Yuborilmoqda...' :
                       currentLanguage === 'ru' ? 'Отправляется...' :
                       'Sending...'}
                    </div>
                  ) : (
                    currentLanguage === 'uz' ? 'Xabar Yuborish' :
                    currentLanguage === 'ru' ? 'Отправить сообщение' :
                    'Send Message'
                  )}
                </button>
              </form>
            </motion.div>

            {/* Map & Additional Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              {/* Map Placeholder */}
              <div className="bg-white p-6 rounded-lg shadow-md">                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {currentLanguage === 'uz' ? 'Bizning Joylashuv' :
                   currentLanguage === 'ru' ? 'Наше местоположение' :
                   'Our Location'}
                </h3>
                <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl mb-2">🗺️</div>
                    <p className="text-gray-600">
                      {currentLanguage === 'uz' ? 'Interaktiv xarita' :
                       currentLanguage === 'ru' ? 'Интерактивная карта' :
                       'Interactive map'}
                    </p>
                    <p className="text-sm text-gray-500">
                      {currentLanguage === 'uz' ? 'Toshkent, Chilonzor tumani' :
                       currentLanguage === 'ru' ? 'Ташкент, Чиланзарский район' :
                       'Tashkent, Chilanzar district'}
                    </p>
                  </div>
                </div>
              </div>

              {/* FAQ */}
              <div className="bg-white p-6 rounded-lg shadow-md">                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {currentLanguage === 'uz' ? 'Tez-tez beriladigan savollar' :
                   currentLanguage === 'ru' ? 'Часто задаваемые вопросы' :
                   'Frequently Asked Questions'}
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900">
                      {currentLanguage === 'uz' ? 'Yetkazib berish qancha vaqt oladi?' :
                       currentLanguage === 'ru' ? 'Сколько времени занимает доставка?' :
                       'How long does delivery take?'}
                    </h4>
                    <p className="text-gray-600 text-sm">
                      {currentLanguage === 'uz' ? 'O\'zbekiston bo\'ylab 1-3 ish kunida yetkazib beramiz.' :
                       currentLanguage === 'ru' ? 'Доставляем по Узбекистану в течение 1-3 рабочих дней.' :
                       'We deliver throughout Uzbekistan within 1-3 business days.'}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">
                      {currentLanguage === 'uz' ? 'Minimal buyurtma miqdori bormi?' :
                       currentLanguage === 'ru' ? 'Есть ли минимальный объем заказа?' :
                       'Is there a minimum order quantity?'}
                    </h4>
                    <p className="text-gray-600 text-sm">
                      {currentLanguage === 'uz' ? 'Ha, minimal buyurtma miqdori 100,000 so\'m.' :
                       currentLanguage === 'ru' ? 'Да, минимальный объем заказа 100,000 сум.' :
                       'Yes, the minimum order amount is 100,000 som.'}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">
                      {currentLanguage === 'uz' ? 'Chegirmalar bormi?' :
                       currentLanguage === 'ru' ? 'Есть ли скидки?' :
                       'Are there discounts?'}
                    </h4>
                    <p className="text-gray-600 text-sm">
                      {currentLanguage === 'uz' ? 'Katta hajmdagi buyurtmalarga maxsus chegirmalar beramiz.' :
                       currentLanguage === 'ru' ? 'Мы предоставляем специальные скидки на крупные заказы.' :
                       'We offer special discounts for large orders.'}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;