import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const OrderForm = ({ cart, clearCart }) => {
  const [formData, setFormData] = useState({
    name: '',           // YANGI: Mijoz ismi qo'shildi
    address: '',
    phone: '',
    paymentMethod: 'cash',
  });

  // YANGI: Loading state qo'shildi
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // YANGI: Kuchaytrilgan validatsiya funksiyasi
  const validateForm = () => {
    const errors = [];

    // Savat tekshiruvi
    if (!cart || cart.length === 0) {
      errors.push('Savat bo\'sh! Iltimos, mahsulot qo\'shing!');
      return errors;
    }

    // Mijoz ismi tekshiruvi - YANGI
    if (!formData.name || formData.name.trim().length < 2) {
      errors.push('Mijoz ismini kiriting (kamida 2 ta harf)');
    }

    // Manzil tekshiruvi - YANGILANDI
    if (!formData.address || formData.address.trim().length < 5) {
      errors.push('To\'liq manzilni kiriting (kamida 5 ta belgi)');
    }

    // Telefon raqami tekshiruvi - YANGILANDI
    const phoneRegex = /^\+998[0-9]{9}$/;
    if (!formData.phone) {
      errors.push('Telefon raqamni kiriting');
    } else if (!phoneRegex.test(formData.phone)) {
      errors.push('Telefon raqami +998XXXXXXXXX formatda bo\'lishi kerak');
    }

    // To'lov usuli tekshiruvi - YANGI
    if (!formData.paymentMethod) {
      errors.push('To\'lov usulini tanlang');
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // YANGI: Loading holatini boshqarish
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      console.log('Cart on submit:', cart);
      
      // YANGI: Kuchaytrilgan validatsiya
      const validationErrors = validateForm();
      if (validationErrors.length > 0) {
        // Har bir xatolikni alohida ko'rsatish
        validationErrors.forEach(error => {
          toast.error(error, { autoClose: 4000 });
        });
        return;
      }

      // YANGI: Order ma'lumotlarini yangi format bilan tayyorlash
      const orderData = {
        // Mijoz ma'lumotlari - YANGI struktura
        customer: {
          name: formData.name.trim(),
          phone: formData.phone.trim(),
          email: '' // Hozircha bo'sh, kerak bo'lsa qo'shish mumkin
        },
        
        // Yetkazib berish ma'lumotlari - YANGI struktura
        delivery: {
          address: formData.address.trim(),
          city: 'Termiz', // Default qiymat, keyin o'zgartirilishi mumkin
          deliveryNotes: ''
        },

        // Mahsulotlar ro'yxati - YANGILANDI
        products: cart.map(item => ({
          id: item.id,
          name: item.name,
          size: item.size,
          price: item.price,
          quantity: item.quantity,
          image: item.image || ''
        })),

        // To'lov ma'lumotlari - YANGI struktura
        payment: {
          method: formData.paymentMethod,
          status: 'pending'
        },

        // Narx hisoblash - YANGILANDI
        pricing: {
          subtotal: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
          deliveryCost: 50000,
          discount: 0,
          totalPrice: cart.reduce((sum, item) => sum + item.price * item.quantity, 0) + 50000
        },

        // Buyurtma holati
        status: 'pending',
        
        // Sana
        date: new Date().toISOString(),

        // Qo'shimcha ma'lumotlar - YANGI
        notes: {
          customerNotes: '',
          adminNotes: ''
        }
      };

      console.log('Sending order data:', orderData); // Debug uchun

      // YANGI: Xatolikni boshqarish bilan API chaqiruvi
      const orderResponse = await axios.post('http://localhost:3004/api/orders', orderData, {
        timeout: 10000, // 10 soniya timeout
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log('Order response:', orderResponse.data); // Debug uchun

      const orderId = orderResponse.data.order?.id || orderResponse.data.orderId;

      if (!orderId) {
        throw new Error('Buyurtma ID olinmadi');
      }

      // To'lov jarayoni
      if (formData.paymentMethod === 'payme' || formData.paymentMethod === 'click') {
        try {
          const paymentResponse = await axios.post('http://localhost:3004/api/payment', {
            orderId,
            amount: orderData.pricing.totalPrice,
            paymentMethod: formData.paymentMethod
          });
          
          if (paymentResponse.data.paymentUrl) {
            window.location.href = paymentResponse.data.paymentUrl;
          } else {
            throw new Error('To\'lov URL olinmadi');
          }
        } catch (paymentError) {
          console.error('Payment error:', paymentError);
          toast.error('To\'lov tizimida xatolik! Naqd to\'lov tanlandi.', { autoClose: 5000 });
          // Naqd to'lov sifatida davom etish
        }
      } else {
        // Naqd to'lov uchun
        toast.success('🎉 Buyurtma muvaffaqiyatli qabul qilindi!', { 
          autoClose: 5000,
          position: 'top-center' 
        });
        
        // YANGI: Qo'shimcha ma'lumot berish
        setTimeout(() => {
          toast.info('📞 Tez orada siz bilan bog\'lanamiz!', { autoClose: 4000 });
        }, 1000);

        clearCart();
        setFormData({ 
          name: '',
          address: '', 
          phone: '', 
          paymentMethod: 'cash' 
        });
      }

    } catch (error) {
      console.error('Order error:', error);
      
      // YANGI: Xatolik turlariga qarab turli xabarlar
      let errorMessage = 'Buyurtma yuborishda xatolik!';
      
      if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
        errorMessage = 'Internet aloqasi sekin. Iltimos, qaytadan urinib ko\'ring.';
      } else if (error.response?.status === 400) {
        errorMessage = error.response.data.message || 'Ma\'lumotlar noto\'g\'ri to\'ldirilgan';
      } else if (error.response?.status === 500) {
        errorMessage = 'Server xatosi. Iltimos, keyinroq urinib ko\'ring.';
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }

      toast.error(errorMessage, { 
        autoClose: 5000,
        position: 'top-center'
      });
    } finally {
      // YANGI: Loading holatini to'xtatish
      setIsSubmitting(false);
    }
  };

  const total = cart?.length > 0 ? cart.reduce((sum, item) => sum + item.price * item.quantity, 0) : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow-lg mt-12"
    >
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Buyurtma Berish</h2>
      
      {cart.length === 0 ? (
        <p className="text-red-600 text-center mb-6">
          Savat bo'sh!{' '}
          <Link to="/products" className="text-blue-600 underline hover:text-blue-800">
            Mahsulot qo'shing
          </Link>
        </p>
      ) : (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Buyurtma Tafsilotlari:</h3>
          <ul className="space-y-2">
            {cart.map((item) => (
              <li key={item.id} className="flex justify-between">
                <span>{item.name} ({item.size}) x{item.quantity}</span>
                <span>{(item.price * item.quantity).toLocaleString()} so'm</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 font-semibold">Mahsulotlar narxi: {total.toLocaleString()} so'm</p>
          <p className="font-semibold">Yetkazib berish narxi: 50,000 so'm</p>
          <p className="font-bold text-lg">Umumiy narx: {(total + 50000).toLocaleString()} so'm</p>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* YANGI: Mijoz ismi maydoni */}
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-semibold mb-1">
            Mijoz Ismi <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="To'liq ismingizni kiriting"
            required
            minLength={2}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="address" className="block text-gray-700 font-semibold mb-1">
            Manzil <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="To'liq manzil: Shahar, tuman, ko'cha, uy raqami"
            required
            minLength={5}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="phone" className="block text-gray-700 font-semibold mb-1">
            Telefon Raqami <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="+998901234567"
            required
            pattern="^\+998[0-9]{9}$"
            title="Telefon raqami +998XXXXXXXXX formatda bo'lishi kerak"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="paymentMethod" className="block text-gray-700 font-semibold mb-1">
            To'lov Usuli <span className="text-red-500">*</span>
          </label>
          <select
            id="paymentMethod"
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            required
          >
            <option value="">To'lov usulini tanlang</option>
            <option value="cash">💵 Naqd pul</option>
            <option value="payme">💳 Payme</option>
            <option value="click">💳 Click</option>
          </select>
        </div>

        {/* YANGI: Takomillashtirilgan submit tugma */}
        <button
          type="submit"
          disabled={isSubmitting || cart.length === 0}
          className={`w-full py-3 rounded-2xl font-semibold transition duration-300 shadow-md ${
            isSubmitting || cart.length === 0
              ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-xl transform hover:-translate-y-0.5'
          }`}
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Buyurtma yuborilmoqda...
            </div>
          ) : (
            '🛒 Buyurtma Berish'
          )}
        </button>
      </form>

      {/* YANGI: Qo'shimcha ma'lumot */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h4 className="font-semibold text-blue-800 mb-2">📝 Eslatma:</h4>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Barcha maydonlar majburiy</li>
          <li>• Buyurtma tasdiqlanganidan keyin siz bilan bog'lanamiz</li>
          <li>• Yetkazib berish 1-3 ish kuni ichida amalga oshiriladi</li>
          <li>• Savollar bo'lsa: +998 90 475 09 09</li>
        </ul>
      </div>
    </motion.div>
  );
};

export default OrderForm;