import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const AboutPage = () => {
  const features = [
    {
      icon: '🏭',
      title: 'Zamonaviy Ishlab Chiqarish',
      description: 'Eng so\'nggi texnologiyalar bilan jihozlangan zavodlarimiz'
    },
    {
      icon: '✅',
      title: 'Sifat Nazorati',
      description: 'Har bir mahsulot sifat nazoratidan o\'tadi'
    },
    {
      icon: '🚚',
      title: 'Tez Yetkazib Berish',
      description: 'O\'zbekiston bo\'ylab 1-3 ish kunida yetkazib berish'
    },
    {
      icon: '💰',
      title: 'Maqul Narxlar',
      description: 'Ishlab chiqaruvchi kompaniya sifatida eng yaxshi narxlar'
    }
  ];

  const stats = [
    { number: '2018', label: 'Tashkil etilgan yil' },
    { number: '10,000+', label: 'Mamnun mijozlar' },
    { number: '50+', label: 'Xodimlar soni' },
    { number: '99%', label: 'Mijoz mamnunligi' }
  ];

  const team = [
    {
      name: 'Akmal Karimov',
      position: 'Bosh direktor',
      image: 'https://via.placeholder.com/200x200/3B82F6/FFFFFF?text=AK'
    },
    {
      name: 'Nilufar Tosheva',
      position: 'Sotuv bo\'limi boshlig\'i',
      image: 'https://via.placeholder.com/200x200/10B981/FFFFFF?text=NT'
    },
    {
      name: 'Bobur Ergashev',
      position: 'Ishlab chiqarish boshlig\'i',
      image: 'https://via.placeholder.com/200x200/F59E0B/FFFFFF?text=BE'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Paket UZB Haqida
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl max-w-3xl mx-auto"
          >
            2018 yildan beri O'zbekiston bozoriga sifatli paketlar yetkazib berayotgan 
            ishonchli kompaniyamiz
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
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Bizning Tariximiz
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Paket UZB 2018 yilda O'zbekiston do'konlari va bizneslarning paket 
                ehtiyojlarini qondirish maqsadida tashkil etilgan. Biz kichik oilaviy 
                biznes sifatida boshlab, bugungi kunda mamlakatning eng yirik paket 
                yetkazib beruvchi kompaniyalaridan biriga aylandik.
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Bizning asosiy maqsadimiz - mijozlarimizga yuqori sifatli mahsulotlar, 
                tez xizmat va maqul narxlarni taqdim etish. Har bir mijozimiz biz uchun 
                muhim va biz ularning ehtiyojlarini to'liq qondirish uchun harakat qilamiz.
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
                src="https://via.placeholder.com/600x400/3B82F6/FFFFFF?text=Company+Story"
                alt="Paket UZB tarixi"
                className="w-full h-auto rounded-lg shadow-xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-yellow-400 text-gray-900 p-4 rounded-lg shadow-lg">
                <div className="text-2xl font-bold">7+</div>
                <div className="text-sm">Yillik tajriba</div>
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
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Bizning Afzalliklarimiz
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Bizni boshqa kompaniyalardan ajratib turadigan asosiy xususiyatlar
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
          >
            <h2 className="text-3xl font-bold mb-4">Bizning Yutuqlarimiz</h2>
            <p className="text-xl text-blue-100">Raqamlarda ifoda etilgan muvaffaqiyatimiz</p>
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
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Bizning Jamoamiz
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Professional va tajribali xodimlar jamoasi
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
          >
            <h2 className="text-3xl font-bold mb-6">
              Biznesingizni Rivojlantiring!
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Sifatli paketlar bilan mijozlaringizni xursand qiling va 
              biznesingizni yangi bosqichga olib chiqing
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/products"
                className="inline-flex items-center justify-center px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
              >
                Mahsulotlarni Ko'rish
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition-colors"
              >
                Bog'lanish
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;