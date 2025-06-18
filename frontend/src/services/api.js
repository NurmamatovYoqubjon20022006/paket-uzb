import axios from 'axios';

// API base configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3004/api';

console.log('API Base URL:', API_BASE_URL); // Debug uchun

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const message = error.response?.data?.message || error.message || 'Network error occurred';
    
    // Handle specific error codes
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('auth_token');
      window.location.href = '/login';
    }
    
    return Promise.reject(new Error(message));
  }
);

// Products API
export const getProducts = async (filters = {}) => {
  try {
    console.log('Fetching products with filters:', filters); // Debug
    
    const params = new URLSearchParams();
    
    if (filters.category && filters.category !== 'all') {
      params.append('category', filters.category);
    }
    if (filters.minPrice) {
      params.append('minPrice', filters.minPrice);
    }
    if (filters.maxPrice) {
      params.append('maxPrice', filters.maxPrice);
    }
    if (filters.search) {
      params.append('search', filters.search);
    }
    if (filters.page) {
      params.append('page', filters.page);
    }
    if (filters.limit) {
      params.append('limit', filters.limit);
    }

    const queryString = params.toString();
    const url = `/products${queryString ? `?${queryString}` : ''}`;
    
    console.log('API URL:', `${API_BASE_URL}${url}`); // Debug
    
    const response = await apiClient.get(url);
    console.log('API Response:', response); // Debug
    
    return response;
  } catch (error) {
    console.error('Error fetching products:', error);
    console.error('Error details:', error.response || error.message);
    throw error;
  }
};

export const getProductById = async (id) => {
  try {
    return await apiClient.get(`/products/${id}`);
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
};

export const getCategories = async () => {
  try {
    return await apiClient.get('/categories');
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

// Orders API
export const createOrder = async (orderData) => {
  try {
    return await apiClient.post('/orders', orderData);
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};

export const getOrderById = async (id) => {
  try {
    return await apiClient.get(`/orders/${id}`);
  } catch (error) {
    console.error('Error fetching order:', error);
    throw error;
  }
};

export const updateOrderStatus = async (id, status, notes) => {
  try {
    return await apiClient.put(`/orders/${id}/status`, { status, notes });
  } catch (error) {
    console.error('Error updating order status:', error);
    throw error;
  }
};

// Payment API
export const processPayment = async (paymentData) => {
  try {
    return await apiClient.post('/payment', paymentData);
  } catch (error) {
    console.error('Error processing payment:', error);
    throw error;
  }
};

export const verifyPayment = async (transactionId) => {
  try {
    return await apiClient.get(`/payment/verify/${transactionId}`);
  } catch (error) {
    console.error('Error verifying payment:', error);
    throw error;
  }
};

// Contact API
export const submitContact = async (contactData) => {
  try {
    return await apiClient.post('/contact', contactData);
  } catch (error) {
    console.error('Error submitting contact:', error);
    throw error;
  }
};

// Health check
export const healthCheck = async () => {
  try {
    return await apiClient.get('/health');
  } catch (error) {
    console.error('Health check failed:', error);
    throw error;
  }
};

// Search API
export const searchProducts = async (query, filters = {}) => {
  try {
    const params = new URLSearchParams();
    params.append('search', query);
    
    if (filters.category && filters.category !== 'all') {
      params.append('category', filters.category);
    }
    if (filters.minPrice) {
      params.append('minPrice', filters.minPrice);
    }
    if (filters.maxPrice) {
      params.append('maxPrice', filters.maxPrice);
    }

    return await apiClient.get(`/products?${params.toString()}`);
  } catch (error) {
    console.error('Error searching products:', error);
    throw error;
  }
};

// Statistics API (for admin)
export const getOrderStats = async () => {
  try {
    return await apiClient.get('/admin/orders/stats');
  } catch (error) {
    console.error('Error fetching order stats:', error);
    throw error;
  }
};

export const getProductStats = async () => {
  try {
    return await apiClient.get('/admin/products/stats');
  } catch (error) {
    console.error('Error fetching product stats:', error);
    throw error;
  }
};

// Utility functions
export const formatPrice = (price) => {
  return new Intl.NumberFormat('uz-UZ', {
    style: 'currency',
    currency: 'UZS',
    minimumFractionDigits: 0,
  }).format(price).replace('UZS', 'so\'m');
};

export const formatDate = (date) => {
  return new Intl.DateTimeFormat('uz-UZ', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date));
};

export const formatOrderNumber = (orderNumber) => {
  return `#${orderNumber}`;
};

// Error handling utility
export const handleApiError = (error, defaultMessage = 'Xatolik yuz berdi') => {
  if (error.response) {
    // Server responded with error status
    return error.response.data.message || defaultMessage;
  } else if (error.request) {
    // Request was made but no response received
    return 'Server bilan aloqa o\'rnatilmadi';
  } else {
    // Something else happened
    return error.message || defaultMessage;
  }
};

// Local storage utilities
export const saveToLocalStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

export const getFromLocalStorage = (key, defaultValue = null) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error('Error getting from localStorage:', error);
    return defaultValue;
  }
};

export const removeFromLocalStorage = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Error removing from localStorage:', error);
  }
};

// Validation utilities
export const validatePhone = (phone) => {
  const phoneRegex = /^\+998[0-9]{9}$/;
  return phoneRegex.test(phone);
};

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateRequired = (value) => {
  return value && value.toString().trim().length > 0;
};

// Image utilities
export const getImageUrl = (imagePath) => {
  if (!imagePath) return '/images/placeholder.jpg';
  if (imagePath.startsWith('http')) return imagePath;
  return `${process.env.REACT_APP_UPLOADS_URL || '/uploads'}/${imagePath}`;
};

export const compressImage = (file, maxWidth = 800, quality = 0.8) => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      const ratio = Math.min(maxWidth / img.width, maxWidth / img.height);
      canvas.width = img.width * ratio;
      canvas.height = img.height * ratio;
      
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      
      canvas.toBlob(resolve, 'image/jpeg', quality);
    };
    
    img.src = URL.createObjectURL(file);
  });
};

export default apiClient;