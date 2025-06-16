import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const Cart = ({ cart, removeFromCart, updateQuantity, clearCart }) => {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = cart.length > 0 ? 50000 : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow-lg mt-12"
    >
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Savat</h2>
      {cart.length === 0 ? (
        <p className="text-red-600 text-center">
          Savat bo‘sh!{' '}
          <Link to="/products" className="text-blue-600 underline hover:text-blue-800">
            Mahsulot qo‘shing
          </Link>
        </p>
      ) : (
        <div>
          <ul className="space-y-4">
            {cart.map((item) => (
              <li key={item.id} className="flex justify-between items-center border-b pb-2">
                <div>
                  <span className="font-semibold">{item.name} ({item.size})</span>
                  <div className="flex items-center mt-1">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="px-2 py-1 bg-gray-200 rounded-l-md hover:bg-gray-300 transition duration-200"
                    >
                      -
                    </button>
                    <span className="mx-2 text-gray-700">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-2 py-1 bg-gray-200 rounded-r-md hover:bg-gray-300 transition duration-200"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="text-lg font-semibold">{item.price * item.quantity} so‘m</span>
                  <button
                    onClick={() => {
                      removeFromCart(item.id);
                      toast.success(`${item.name} savatdan o‘chirildi!`, { autoClose: 2000 });
                    }}
                    className="ml-4 text-red-600 hover:text-red-700 transition duration-200"
                  >
                    O‘chirish
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-6">
            <p className="font-semibold">Mahsulotlar narxi: {total} so‘m</p>
            <p className="font-semibold">Yetkazib berish narxi: {deliveryFee} so‘m</p>
            <p className="text-lg font-bold">Umumiy narx: {total + deliveryFee} so‘m</p>
            <Link
              to="/order"
              className="mt-4 block text-center w-full bg-blue-600 text-white py-3 rounded-2xl hover:bg-blue-700 transition duration-300 shadow-md"
            >
              Buyurtma Berish
            </Link>
            <button
              onClick={() => {
                clearCart();
                toast.success('Savat tozalandi!', { autoClose: 2000 });
              }}
              className="mt-4 w-full bg-red-600 text-white py-3 rounded-2xl hover:bg-red-700 transition duration-300 shadow-md"
            >
              Savatni Tozalash
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default Cart;