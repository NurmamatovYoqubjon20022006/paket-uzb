import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useCart } from '../App';
import { toast } from 'react-toastify';
import * as api from '../services/api';

const CheckoutPage = () => {
  const { cart, clearCart, getCartTotal } = useCart();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    notes: '',
    paymentMethod: 'cash'
  });

  const subtotal = getCartTotal();
  const deliveryFee = cart.length > 0 ? 50000 : 0;
  const total = subtotal + deliveryFee;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      toast.error('Ism kiritilishi shart!');
      return false;
    }
    if (!formData.phone.trim()) {
      toast.error('Telefon raqam kiritilishi shart!');
      return false;
    }
    if (!formData.address.trim()) {
      toast.error('Manzil kiritilishi shart!');
      return false;
    }
    if (!formData.city.trim()) {
      toast.error('Shahar kiritilishi shart!');
      return false;
    }
    if (cart.length === 0) {
      toast.error('Savat bo\'sh! Mahsulot qo\'shing!');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      const orderData = {
        customer: {
          name: formData.name,
          phone: formData.phone,
          email: formData.email || undefined
        },
        delivery: {
          address: formData.address,
          city: formData.city,
          deliveryNotes: formData.notes || undefined
        },
        products: cart.map(item => ({
          id: item.id,
          name: item.name,
          size: item.size,
          price: item.price,
          quantity: item.quantity,
          image: item.image
        })),
        payment: {
          method: formData.paymentMethod,
          status: 'pending'
        },
        pricing: {
          subtotal: subtotal,
          deliveryCost: deliveryFee,
          discount: 0,
          totalPrice: total
        },
        notes: {
          customerNotes: formData.notes || undefined
        }
      };

      console.log('Sending order data:', orderData);
      
      const response = await api.createOrder(orderData);
      
      console.log('Order response:', response);
      
      toast.success('Buyurtma muvaffaqiyatli qabul qilindi!', { autoClose: 5000 });
      clearCart();
      
      // Reset form
      setFormData({
        name: '',
        phone: '',
        email: '',
        address: '',
        city: '',
        notes: '',
        paymentMethod: 'cash'
      });
      
    } catch (error) {
      console.error('Order error:', error);
      toast.error(error.response?.data?.message || 'Buyurtma yuborishda xatolik!', { 
        autoClose: 5000 
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="text-6xl mb-4">🛒</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Savatcha Bo'sh
          </h1>
          <p className="text-gray-600 mb-8">
            Buyurtma berish uchun avval mahsulot qo'shing
          </p>
          <a
            href="/products"
            className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Mahsulotlarni Ko'rish
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Buyurtma Berish
          </h1>
          <p className="text-gray-600">
            Ma'lumotlaringizni to'ldiring va buyurtmani yakunlang
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-lg shadow-md p-6"
          >
            <h2 className="text-xl font-semibold mb-6">Buyurtma Ma'lumotlari</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ism <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Ismingizni kiriting"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Telefon <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="+998901234567"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email (ixtiyoriy)
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="email@example.com"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Shahar <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Toshkent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    To'lov usuli
                  </label>
                  <select
                    name="paymentMethod"
                    value={formData.paymentMethod}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="cash">Naqd pul</option>
                    <option value="payme">Payme</option>
                    <option value="click">Click</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  To'liq manzil <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="To'liq manzilni kiriting..."
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Qo'shimcha izoh
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  rows={2}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Yetkazib berish uchun qo'shimcha ma'lumot..."
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-4 px-6 rounded-lg font-semibold text-white transition-colors ${
                  isLoading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Buyurtma berilmoqda...
                  </div>
                ) : (
                  'Buyurtmani Tasdiqlash'
                )}
              </button>
            </form>
          </motion.div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-lg shadow-md p-6"
          >
            <h2 className="text-xl font-semibold mb-6">Buyurtma Xulasasi</h2>
            
            <div className="space-y-4 mb-6">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center space-x-4 pb-4 border-b">
                  <img
                    src="/images/placeholder.jpg"
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg bg-gray-100"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div className="w-16 h-16 bg-gray-200 rounded-lg items-center justify-center text-gray-400 text-xs hidden">
                    Rasm
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{item.name}</h3>
                    <p className="text-sm text-gray-500">{item.size}</p>
                    <p className="text-sm text-gray-500">Miqdor: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">
                      {(item.price * item.quantity).toLocaleString()} so'm
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-2 pt-4 border-t">
              <div className="flex justify-between">
                <span>Mahsulotlar:</span>
                <span>{subtotal.toLocaleString()} so'm</span>
              </div>
              <div className="flex justify-between">
                <span>Yetkazib berish:</span>
                <span>{deliveryFee.toLocaleString()} so'm</span>
              </div>
              <div className="flex justify-between text-lg font-bold pt-2 border-t">
                <span>Jami:</span>
                <span>{total.toLocaleString()} so'm</span>
              </div>
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h3 className="font-medium text-blue-900 mb-2">Yetkazib berish ma'lumoti:</h3>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Yetkazib berish 1-3 ish kunida</li>
                <li>• Bepul yetkazib berish 500,000 so'mdan yuqori</li>
                <li>• To'lov: naqd yoki online</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;