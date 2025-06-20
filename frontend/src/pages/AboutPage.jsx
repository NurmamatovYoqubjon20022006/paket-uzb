import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

const AboutPage = () => {
  const { t, currentLanguage } = useLanguage();
  
  const features = [
    {
      icon: '🏭',
      title: currentLanguage === 'uz' ? 'Zamonaviy Ishlab Chiqarish' :
             currentLanguage === 'ru' ? 'Современное производство' :
             'Modern Production',
      description: currentLanguage === 'uz' ? 'Eng so\'nggi texnologiyalar bilan jihozlangan zavodlarimiz' :
                   currentLanguage === 'ru' ? 'Наши заводы оснащены новейшими технологиями' :
                   'Our factories equipped with the latest technologies'
    },
    {
      icon: '✅',
      title: currentLanguage === 'uz' ? 'Sifat Nazorati' :
             currentLanguage === 'ru' ? 'Контроль качества' :
             'Quality Control',
      description: currentLanguage === 'uz' ? 'Har bir mahsulot sifat nazoratidan o\'tadi' :
                   currentLanguage === 'ru' ? 'Каждый продукт проходит контроль качества' :
                   'Every product undergoes quality control'
    },
    {
      icon: '🚚',
      title: currentLanguage === 'uz' ? 'Tez Yetkazib Berish' :
             currentLanguage === 'ru' ? 'Быстрая доставка' :
             'Fast Delivery',
      description: currentLanguage === 'uz' ? 'O\'zbekiston bo\'ylab 1-3 ish kunida yetkazib berish' :
                   currentLanguage === 'ru' ? 'Доставка по Узбекистану в течение 1-3 рабочих дней' :
                   'Delivery throughout Uzbekistan within 1-3 business days'
    },
    {
      icon: '💰',
      title: currentLanguage === 'uz' ? 'Maqul Narxlar' :
             currentLanguage === 'ru' ? 'Доступные цены' :
             'Affordable Prices',
      description: currentLanguage === 'uz' ? 'Ishlab chiqaruvchi kompaniya sifatida eng yaxshi narxlar' :
                   currentLanguage === 'ru' ? 'Лучшие цены как производителя' :
                   'Best prices as a manufacturer'
    }
  ];

  const stats = [
    { 
      number: '2018', 
      label: currentLanguage === 'uz' ? 'Tashkil etilgan yil' :
             currentLanguage === 'ru' ? 'Год основания' :
             'Founded in'
    },
    { 
      number: '10,000+', 
      label: currentLanguage === 'uz' ? 'Mamnun mijozlar' :
             currentLanguage === 'ru' ? 'Довольных клиентов' :
             'Happy customers'
    },
    { 
      number: '50+', 
      label: currentLanguage === 'uz' ? 'Xodimlar soni' :
             currentLanguage === 'ru' ? 'Количество сотрудников' :
             'Number of employees'
    },
    { 
      number: '99%', 
      label: currentLanguage === 'uz' ? 'Mijoz mamnunligi' :
             currentLanguage === 'ru' ? 'Удовлетворенность клиентов' :
             'Customer satisfaction'
    }
  ];

  const team = [
    {
      name: currentLanguage === 'uz' ? 'Akmal Karimov' :
            currentLanguage === 'ru' ? 'Акмал Каримов' :
            'Akmal Karimov',
      position: currentLanguage === 'uz' ? 'Bosh direktor' :
                currentLanguage === 'ru' ? 'Генеральный директор' :
                'General Director',
      image: 'https://via.placeholder.com/200x200/3B82F6/FFFFFF?text=AK'
    },
    {
      name: currentLanguage === 'uz' ? 'Nilufar Tosheva' :
            currentLanguage === 'ru' ? 'Нилуфар Тошева' :
            'Nilufar Tosheva',
      position: currentLanguage === 'uz' ? 'Sotuv bo\'limi boshlig\'i' :
                currentLanguage === 'ru' ? 'Руководитель отдела продаж' :
                'Head of Sales Department',
      image: 'https://via.placeholder.com/200x200/10B981/FFFFFF?text=NT'
    },
    {
      name: currentLanguage === 'uz' ? 'Bobur Ergashev' :
            currentLanguage === 'ru' ? 'Бобур Эргашев' :
            'Bobur Ergashev',      position: currentLanguage === 'uz' ? 'Ishlab chiqarish boshlig\'i' :
                currentLanguage === 'ru' ? 'Руководитель производства' :
                'Head of Production',
      image: 'https://via.placeholder.com/200x200/F59E0B/FFFFFF?text=BE'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            {currentLanguage === 'uz' ? 'Paket UZB Haqida' :
             currentLanguage === 'ru' ? 'О компании Paket UZB' :
             'About Paket UZB'}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl max-w-3xl mx-auto"
          >
            {currentLanguage === 'uz' ? '2018 yildan beri O\'zbekiston bozoriga sifatli paketlar yetkazib berayotgan ishonchli kompaniyamiz' :
             currentLanguage === 'ru' ? 'Надежная компания, поставляющая качественные пакеты на рынок Узбекистана с 2018 года' :
             'Reliable company supplying quality packages to the Uzbekistan market since 2018'}
          </motion.p>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                {currentLanguage === 'uz' ? 'Bizning Tariximiz' :
                 currentLanguage === 'ru' ? 'Наша история' :
                 'Our History'}
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {currentLanguage === 'uz' ? 'Paket UZB 2018 yilda O\'zbekiston do\'konlari va bizneslarning paket ehtiyojlarini qondirish maqsadida tashkil etilgan. Biz kichik oilaviy biznes sifatida boshlab, bugungi kunda mamlakatning eng yirik paket yetkazib beruvchi kompaniyalaridan biriga aylandik.' :
                 currentLanguage === 'ru' ? 'Paket UZB была основана в 2018 году с целью удовлетворения потребностей узбекских магазинов и предприятий в упаковке. Начав как небольшой семейный бизнес, сегодня мы стали одной из крупнейших компаний по поставке пакетов в стране.' :
                 'Paket UZB was founded in 2018 to meet the packaging needs of Uzbek shops and businesses. Starting as a small family business, today we have become one of the largest package supply companies in the country.'}
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {currentLanguage === 'uz' ? 'Bizning asosiy maqsadimiz - mijozlarimizga yuqori sifatli mahsulotlar, tez xizmat va maqul narxlarni taqdim etish. Har bir mijozimiz biz uchun muhim va biz ularning ehtiyojlarini to\'liq qondirish uchun harakat qilamiz.' :
                 currentLanguage === 'ru' ? 'Наша основная цель - предоставить нашим клиентам высококачественные продукты, быстрое обслуживание и доступные цены. Каждый наш клиент важен для нас, и мы стремимся полностью удовлетворить их потребности.' :
                 'Our main goal is to provide our customers with high-quality products, fast service and affordable prices. Every customer is important to us and we strive to fully meet their needs.'}
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Biz bilan bog'laning
                <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img
                src="https://via.placeholder.com/600x400/3B82F6/FFFFFF?text=Company+Story"                alt={currentLanguage === 'uz' ? 'Paket UZB tarixi' :
                     currentLanguage === 'ru' ? 'История Paket UZB' :
                     'Paket UZB history'}
                className="w-full h-auto rounded-lg shadow-xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-yellow-400 text-gray-900 p-4 rounded-lg shadow-lg">
                <div className="text-2xl font-bold">7+</div>
                <div className="text-sm">
                  {currentLanguage === 'uz' ? 'Yillik tajriba' :
                   currentLanguage === 'ru' ? 'Лет опыта' :
                   'Years of experience'}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {currentLanguage === 'uz' ? 'Bizning Afzalliklarimiz' :
               currentLanguage === 'ru' ? 'Наши преимущества' :
               'Our Advantages'}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {currentLanguage === 'uz' ? 'Bizni boshqa kompaniyalardan ajratib turadigan asosiy xususiyatlar' :
               currentLanguage === 'ru' ? 'Основные характеристики, отличающие нас от других компаний' :
               'Key features that distinguish us from other companies'}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >            <h2 className="text-3xl font-bold mb-4">
              {currentLanguage === 'uz' ? 'Bizning Yutuqlarimiz' :
               currentLanguage === 'ru' ? 'Наши достижения' :
               'Our Achievements'}
            </h2>
            <p className="text-xl text-blue-100">
              {currentLanguage === 'uz' ? 'Raqamlarda ifoda etilgan muvaffaqiyatimiz' :
               currentLanguage === 'ru' ? 'Наш успех, выраженный в цифрах' :
               'Our success expressed in numbers'}
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-4xl lg:text-5xl font-bold mb-2">{stat.number}</div>
                <div className="text-blue-100">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {currentLanguage === 'uz' ? 'Bizning Jamoamiz' :
               currentLanguage === 'ru' ? 'Наша команда' :
               'Our Team'}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {currentLanguage === 'uz' ? 'Professional va tajribali xodimlar jamoasi' :
               currentLanguage === 'ru' ? 'Команда профессиональных и опытных сотрудников' :
               'Team of professional and experienced employees'}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-32 h-32 rounded-full mx-auto mb-4 shadow-lg"
                />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {member.name}
                </h3>
                <p className="text-gray-600">{member.position}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >            <h2 className="text-3xl font-bold mb-6">
              {currentLanguage === 'uz' ? 'Biznesingizni Rivojlantiring!' :
               currentLanguage === 'ru' ? 'Развивайте свой бизнес!' :
               'Grow Your Business!'}
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              {currentLanguage === 'uz' ? 'Sifatli paketlar bilan mijozlaringizni xursand qiling va biznesingizni yangi bosqichga olib chiqing' :
               currentLanguage === 'ru' ? 'Радуйте своих клиентов качественными пакетами и выведите свой бизнес на новый уровень' :
               'Delight your customers with quality packaging and take your business to the next level'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/products"
                className="inline-flex items-center justify-center px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
              >
                {currentLanguage === 'uz' ? 'Mahsulotlarni Ko\'rish' :
                 currentLanguage === 'ru' ? 'Посмотреть товары' :
                 'View Products'}
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition-colors"
              >
                {currentLanguage === 'uz' ? 'Bog\'lanish' :
                 currentLanguage === 'ru' ? 'Связаться' :
                 'Contact Us'}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;