import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useCart } from '../App';
import { toast } from 'react-toastify';
import * as api from '../services/api';

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, getCartTotal } = useCart();
  const [isOrdering, setIsOrdering] = useState(false);
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [orderForm, setOrderForm] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    paymentMethod: 'cash',
    notes: ''
  });
  
  const total = getCartTotal();
  const deliveryFee = cart.length > 0 ? 50000 : 0;

  const handleOrderFormChange = (e) => {
    setOrderForm({
      ...orderForm,
      [e.target.name]: e.target.value
    });
  };

  const handleOrder = async (e) => {
    e.preventDefault();
    
    if (cart.length === 0) {
      toast.error('Savat bo\'sh!');
      return;
    }

    if (!orderForm.name || !orderForm.phone || !orderForm.address) {
      toast.error('Barcha majburiy maydonlarni to\'ldiring!');
      return;
    }

    setIsOrdering(true);
    
    try {
      const orderData = {
        products: cart,
        name: orderForm.name,
        phone: orderForm.phone,
        address: orderForm.address,
        city: orderForm.city,
        paymentMethod: orderForm.paymentMethod,
        customerNotes: orderForm.notes,
        deliveryCost: deliveryFee
      };

      console.log('Sending order:', orderData);
      
      const response = await api.createOrder(orderData);
      
      toast.success('Buyurtma muvaffaqiyatli yuborildi!');
      clearCart();
      setShowOrderForm(false);
      setOrderForm({
        name: '',
        phone: '',
        address: '',
        city: '',
        paymentMethod: 'cash',
        notes: ''
      });
      
    } catch (error) {
      console.error('Order error:', error);
      toast.error('Buyurtma yuborishda xatolik yuz berdi!');
    } finally {
      setIsOrdering(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-md p-12"
          >
            <div className="text-6xl mb-4">🛒</div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Savatcha Bo'sh</h1>
            <p className="text-gray-600 mb-8">
              Hozircha savatchangizda mahsulot yo'q. Mahsulotlar bo'limiga o'tib, 
              kerakli paketlarni tanlang.
            </p>
            <Link
              to="/products"
              className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              Mahsulotlarga O'tish
            </Link>
          </motion.div>
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
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-gray-900">
                  Savatcha ({cart.length} mahsulot)
                </h1>
                <button
                  onClick={clearCart}
                  className="text-red-600 hover:text-red-700 text-sm"
                >
                  Hammasini o'chirish
                </button>
              </div>

              <div className="space-y-4">
                {cart.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{item.name}</h3>
                      <p className="text-sm text-gray-600">{item.size}</p>
                      <p className="text-lg font-bold text-blue-600">
                        {item.price.toLocaleString()} so'm
                      </p>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
                      >
                        -
                      </button>
                      <span className="w-12 text-center font-semibold">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
                      >
                        +
                      </button>
                    </div>

                    <div className="text-right">
                      <p className="font-bold text-lg">
                        {(item.price * item.quantity).toLocaleString()} so'm
                      </p>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-600 hover:text-red-700 text-sm mt-1"
                      >
                        O'chirish
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Buyurtma Xulasasi</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span>Mahsulotlar ({cart.length}):</span>
                  <span>{total.toLocaleString()} so'm</span>
                </div>
                <div className="flex justify-between">
                  <span>Yetkazib berish:</span>
                  <span>{deliveryFee.toLocaleString()} so'm</span>
                </div>
                <hr />
                <div className="flex justify-between text-xl font-bold">
                  <span>Jami:</span>
                  <span>{(total + deliveryFee).toLocaleString()} so'm</span>
                </div>
              </div>

              {!showOrderForm ? (
                <button
                  onClick={() => setShowOrderForm(true)}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                >
                  Buyurtma Berish
                </button>
              ) : (
                <form onSubmit={handleOrder} className="space-y-4">
                  <h3 className="font-semibold text-gray-900 mb-4">Ma'lumotlaringizni kiriting:</h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Ismingiz *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={orderForm.name}
                      onChange={handleOrderFormChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Telefon raqami *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={orderForm.phone}
                      onChange={handleOrderFormChange}
                      placeholder="+998901234567"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Manzil *
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={orderForm.address}
                      onChange={handleOrderFormChange}
                      placeholder="To'liq manzilni kiriting"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Shahar
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={orderForm.city}
                      onChange={handleOrderFormChange}
                      placeholder="Toshkent"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      To'lov usuli
                    </label>
                    <select
                      name="paymentMethod"
                      value={orderForm.paymentMethod}
                      onChange={handleOrderFormChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="cash">Naqd pul</option>
                      <option value="payme">Payme</option>
                      <option value="click">Click</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Qo'shimcha izoh
                    </label>
                    <textarea
                      name="notes"
                      value={orderForm.notes}
                      onChange={handleOrderFormChange}
                      rows={3}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="Maxsus talablar yoki izohlar..."
                    />
                  </div>

                  <div className="space-y-3">
                    <button
                      type="submit"
                      disabled={isOrdering}
                      className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold disabled:opacity-50"
                    >
                      {isOrdering ? 'Yuborilmoqda...' : 'Buyurtmani Tasdiqlash'}
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => setShowOrderForm(false)}
                      className="w-full bg-gray-200 text-gray-800 py-3 rounded-lg hover:bg-gray-300 transition-colors"
                    >
                      Bekor qilish
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CartPage;