import React, { useState, useEffect, createContext, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Import contexts
import { LanguageProvider } from './contexts/LanguageContext';

// Import components
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import LoadingSpinner from './components/UI/LoadingSpinner';
import ErrorBoundary from './components/UI/ErrorBoundary';

// Import pages
import HomePage from './pages/ImprovedHomePage';
import ProductsPage from './pages/ProductsPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import NotFoundPage from './pages/NotFoundPage';

// Import services
import * as api from './services/api';

// Create contexts
const CartContext = createContext();
const ProductsContext = createContext();

// Custom hooks
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};

export const useProducts = () => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error('useProducts must be used within ProductsProvider');
  }
  return context;
};

// Cart Provider Component
const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('paket-uzb-cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
        localStorage.removeItem('paket-uzb-cart');
      }
    }
  }, []);

  // Save cart to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem('paket-uzb-cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = async (product, quantity = 1) => {
    setIsLoading(true);
    try {
      const existingItem = cart.find(item => item.id === product._id);
      
      if (existingItem) {
        setCart(cart.map(item =>
          item.id === product._id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        ));
        toast.success(`${product.name} miqdori yangilandi!`, { autoClose: 2000 });
      } else {
        const cartItem = {
          id: product._id,
          name: product.name,
          size: product.size,
          price: product.price,
          quantity: quantity,
          image: product.images?.[0] || '/images/placeholder.jpg'
        };
        setCart([...cart, cartItem]);
        toast.success(`${product.name} savatga qo'shildi!`, { autoClose: 2000 });
      }
    } catch (error) {
      toast.error('Savatga qo\'shishda xatolik!', { autoClose: 3000 });
    } finally {
      setIsLoading(false);
    }
  };

  const removeFromCart = (productId) => {
    const item = cart.find(item => item.id === productId);
    setCart(cart.filter(item => item.id !== productId));
    if (item) {
      toast.success(`${item.name} savatdan o'chirildi!`, { autoClose: 2000 });
    }
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCart(cart.map(item =>
      item.id === productId
        ? { ...item, quantity: newQuantity }
        : item
    ));
  };

  const clearCart = () => {
    setCart([]);
    toast.success('Savat tozalandi!', { autoClose: 2000 });
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartItemsCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const value = {
    cart,
    isLoading,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartItemsCount
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

// Products Provider Component
const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const fetchProducts = async (filters = {}) => {
    setIsLoading(true);
    setError(null);
    try {
      console.log('🔄 Mahsulotlarni yuklash boshlandi...');
      const response = await api.getProducts(filters);
      console.log('✅ Mahsulotlar muvaffaqiyatli yuklandi:', response.products?.length);
      setProducts(response.products || []);
      return response;
    } catch (error) {
      console.error('❌ Mahsulot yuklash xatosi:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Mahsulotlarni yuklashda xatolik';
      setError(errorMessage);
      toast.error(`Xatolik: ${errorMessage}`, { autoClose: 5000 });
      return { products: [], totalPages: 0 };
    } finally {
      setIsLoading(false);
    }
  };

  const fetchProductById = async (id) => {
    setIsLoading(true);
    try {
      const product = await api.getProductById(id);
      return product;
    } catch (error) {
      setError('Mahsulotni yuklashda xatolik yuz berdi');
      toast.error('Mahsulotni yuklashda xatolik!', { autoClose: 3000 });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const categoriesData = await api.getCategories();
      setCategories(categoriesData);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const value = {
    products,
    categories,
    isLoading,
    error,
    fetchProducts,
    fetchProductById,
    fetchCategories
  };

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};

// Simple Cart Page - OrderForm o'chirildi, CheckoutPage ishlatiladi
// eslint-disable-next-line no-unused-vars
const CartPageSimple = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, getCartTotal } = useCart();
  
  const total = getCartTotal();
  const deliveryFee = cart.length > 0 ? 50000 : 0;
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Savat</h1>
        
        {cart.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🛒</div>
            <p className="text-xl text-gray-600 mb-6">Savatcha bo'sh</p>
            <Link
              to="/products"
              className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Mahsulotlarni Ko'rish
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-6">
            {cart.map((item) => (
              <div key={item.id} className="flex items-center justify-between py-4 border-b">
                <div className="flex items-center space-x-4">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-gray-600">{item.size}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 rounded bg-gray-200 hover:bg-gray-300"
                    >
                      -
                    </button>
                    <span className="w-12 text-center">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 rounded bg-gray-200 hover:bg-gray-300"
                    >
                      +
                    </button>
                  </div>
                  
                  <div className="text-right">
                    <p className="font-semibold">{(item.price * item.quantity).toLocaleString()} so'm</p>
                  </div>
                  
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    O'chirish
                  </button>
                </div>
              </div>
            ))}
            
            <div className="mt-6 pt-6 border-t">
              <div className="flex justify-between mb-2">
                <span>Mahsulotlar:</span>
                <span>{total.toLocaleString()} so'm</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Yetkazib berish:</span>
                <span>{deliveryFee.toLocaleString()} so'm</span>
              </div>
              <div className="flex justify-between text-xl font-bold">
                <span>Jami:</span>
                <span>{(total + deliveryFee).toLocaleString()} so'm</span>
              </div>
              
              <div className="mt-6 space-y-4">
                <Link 
                  to="/checkout"
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors text-center block"
                >
                  Buyurtma Berish
                </Link>
                <button 
                  onClick={clearCart}
                  className="w-full bg-gray-200 text-gray-800 py-3 rounded-lg hover:bg-gray-300"
                >
                  Savatni Tozalash
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Simple Contact Page
// eslint-disable-next-line no-unused-vars
const ContactPageSimple = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.submitContact(formData);
      toast.success('Murojaat yuborildi!');
      setFormData({ name: '', phone: '', message: '' });
    } catch (error) {
      toast.error('Xatolik yuz berdi!');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Biz bilan bog'laning</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Ism</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Telefon</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Xabar</label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                rows={4}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
            >
              Yuborish
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

// Main App Component
const App = () => {
  const [isAppLoading, setIsAppLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAppLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isAppLoading) {
    return <LoadingSpinner fullScreen />;
  }
  return (
    <ErrorBoundary>
      <LanguageProvider>
        <ProductsProvider>
          <CartProvider>
            <Router>
              <div className="min-h-screen bg-gray-50 flex flex-col">
                <ToastContainer
                  position="top-right"
                  autoClose={3000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                  theme="light"
                  className="z-50"
                />

                <Navbar />

                <main className="flex-grow pt-16">                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/products" element={<ProductsPage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/checkout" element={<CheckoutPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                  </Routes>
                </main>

                <Footer />
              </div>
            </Router>
          </CartProvider>
        </ProductsProvider>
      </LanguageProvider>
    </ErrorBoundary>
  );
};

export default App;