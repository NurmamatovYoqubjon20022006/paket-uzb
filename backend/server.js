const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const axios = require('axios');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const compression = require('compression');

// Load environment variables
require('dotenv').config();

// Import models
const Order = require('./models/Order');
const Product = require('./models/Product');
const Contact = require('./models/Contact');

// Import utils
const telegramBot = require('./utils/telegramBot');
const googleSheets = require('./utils/googleSheets');

// Import routes
const ordersRoute = require('./routes/orders');
const productsRoute = require('./routes/products');

const app = express();


// Security middleware
app.use(helmet({
  contentSecurityPolicy: false, // Frontend uchun
  crossOriginEmbedderPolicy: false
}));

// Compression middleware
app.use(compression());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 daqiqa
  max: 100, // maksimal 100 ta so'rov
  message: {
    error: 'Juda ko\'p so\'rov yuborildi, keyinroq urinib ko\'ring'
  }
});
app.use(limiter);

// CORS configuration
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    const allowedOrigins = process.env.NODE_ENV === 'production' 
      ? [process.env.FRONTEND_URL, 'https://paket-uzb.vercel.app']
      : [
          'http://localhost:3000', 
          'http://localhost:3001', 
          'http://127.0.0.1:3000',
          'http://localhost:3004'  // Backend o'zi ham
        ];
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.log('CORS blocked origin:', origin);
      callback(null, true); // Development da ruxsat berish
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-At'],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

// Handle preflight requests
app.options('*', cors(corsOptions));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Routes middleware
app.use('/api/orders', ordersRoute);
app.use('/api/products', productsRoute);

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ 
    message: 'Server xatosi', 
    error: process.env.NODE_ENV === 'development' ? err.message : 'Ichki server xatosi' 
  });
});

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ MongoDB successfully connected');
  // Initialize sample products if empty
  initializeSampleProducts();
})
.catch(err => console.error('❌ MongoDB connection error:', err));

// Initialize sample products
async function initializeSampleProducts() {
  try {
    // First, clear existing products to avoid duplicate key errors
    await Product.deleteMany({});
    console.log('🗑️ Existing products cleared');
    
    const count = await Product.countDocuments();
    if (count === 0) {      const sampleProducts = [        {
          name: 'Selofan Paket Kichik',
          description: 'Do\'konlar uchun kichik o\'lchamdagi selofan paket',
          category: 'Selofan',
          size: '20x30 sm',
          price: 500,
          inStock: true,
          quantity: 1000,
          status: 'active',
          images: ['https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop'],
          specifications: {
            material: 'Yuqori sifatli selofan',
            thickness: '25 mikron',
            color: 'Shaffof'
          },
          inventory: {
            quantity: 1000,
            inStock: true,
            sku: 'SEL001'
          },
          seo: {
            slug: 'selofan-paket-kichik'
          }
        },
        {
          name: 'Selofan Paket O\'rta',
          description: 'O\'rta bizneslar uchun selofan paket',
          category: 'Selofan', 
          size: '30x40 sm',
          price: 800,
          inStock: true,
          quantity: 800,
          status: 'active',
          images: ['https://images.unsplash.com/photo-1572635196243-4dd75fbdbd7f?w=400&h=300&fit=crop'],
          specifications: {
            material: 'Yuqori sifatli selofan',
            thickness: '30 mikron',
            color: 'Shaffof'
          },
          inventory: {
            quantity: 800,
            inStock: true,
            sku: 'SEL002'
          },
          seo: {
            slug: 'selofan-paket-orta'
          }
        },
        {
          name: 'Selofan Paket Katta',
          description: 'Yirik do\'konlar uchun katta selofan paket',
          category: 'Selofan',
          size: '40x50 sm', 
          price: 1200,
          inStock: true,
          quantity: 500,
          status: 'active',
          images: ['https://images.unsplash.com/photo-1586769852044-692d6666f75a?w=400&h=300&fit=crop'],
          specifications: {
            material: 'Yuqori sifatli selofan',
            thickness: '35 mikron',
            color: 'Shaffof'
          },
          inventory: {
            quantity: 500,
            inStock: true,
            sku: 'SEL003'
          },
          seo: {
            slug: 'selofan-paket-katta'
          }
        },        {
          name: 'Rulon Paket Kichik',
          description: 'Kichik bizneslar uchun rulon paket',
          category: 'Rulon',
          size: '30 sm kenglik',
          price: 1500,
          inStock: true,
          quantity: 200,
          status: 'active',
          images: ['https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400&h=300&fit=crop'],
          specifications: {
            material: 'Polietilen',
            length: '100 metr',
            thickness: '40 mikron'
          },
          inventory: {
            quantity: 200,
            inStock: true,
            sku: 'RUL001'
          },
          seo: {
            slug: 'rulon-paket-kichik'
          }
        },
        {
          name: 'Rulon Paket O\'rta',
          description: 'O\'rta bizneslar uchun rulon paket',
          category: 'Rulon',
          size: '50 sm kenglik',
          price: 2500,
          inStock: true,
          quantity: 150,
          status: 'active',
          images: ['https://images.unsplash.com/photo-1586769852019-e5b48648d27c?w=400&h=300&fit=crop'],
          specifications: {
            material: 'Polietilen',
            length: '100 metr', 
            thickness: '45 mikron'
          },
          inventory: {
            quantity: 150,
            inStock: true,
            sku: 'RUL002'
          },
          seo: {
            slug: 'rulon-paket-orta'
          }
        },
        {
          name: 'Rulon Paket Katta',
          description: 'Yirik bizneslar uchun rulon paket',
          category: 'Rulon',
          size: '70 sm kenglik',
          price: 3500,
          inStock: true,
          quantity: 100,
          status: 'active',
          images: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop'],
          specifications: {
            material: 'Polietilen',
            length: '100 metr',
            thickness: '50 mikron'
          },
          inventory: {
            quantity: 100,
            inStock: true,
            sku: 'RUL003'
          },          seo: {
            slug: 'rulon-paket-katta'
          }
        },
        {
          name: 'Plastik Paket Premium',
          description: 'Yuqori sifatli plastik paket',
          category: 'Plastik',
          size: '25x35 sm',
          price: 1000,
          inStock: true,
          quantity: 300,
          status: 'active',
          images: ['https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop'],
          specifications: {
            material: 'Premium plastik',
            thickness: '30 mikron',
            color: 'Oq'
          },
          inventory: {
            quantity: 300,
            inStock: true,
            sku: 'PLA001'
          },
          seo: {
            slug: 'plastik-paket-premium'
          }
        },
        {
          name: 'Qog\'oz Paket Eco',
          description: 'Ekologik toza qog\'oz paket',
          category: 'Qogoz',
          size: '20x25 sm',
          price: 700,
          inStock: true,
          quantity: 400,
          status: 'active',
          images: ['https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop&blend=F5F5DC&blend-mode=multiply'],
          specifications: {
            material: 'Qayta ishlanadigan qog\'oz',
            thickness: '150 gramm',
            color: 'Jigarrang'
          },
          inventory: {
            quantity: 400,
            inStock: true,
            sku: 'QOG001'
          },
          seo: {
            slug: 'qogoz-paket-eco'
          }
        }
      ];
      
      await Product.insertMany(sampleProducts);
      console.log('✅ Sample products initialized successfully');
    }
  } catch (error) {
    console.error('❌ Error initializing products:', error.message);
  }
}

// Routes

// Products endpoints
app.get('/api/products', async (req, res) => {
  try {
    console.log('📦 Products API called with query:', req.query);
    
    // Set CORS headers manually
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    const { category, minPrice, maxPrice, search, page = 1, limit = 12 } = req.query;
    
    let filter = { status: 'active' };
    
    if (category && category !== 'all') {
      filter.category = category;
    }
    
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }
    
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
    
    console.log('🔍 Filter being used:', filter);
    
   // Add timeout to query
    const products = await Product.find(filter)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 })
      .maxTimeMS(60000); // 60 seconds timeout
      
    const total = await Product.countDocuments(filter);
    
    console.log(`✅ Found ${products.length} products out of ${total} total`);
    
    res.json({
      products,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error('❌ Products fetch error:', error);
    res.status(500).json({ message: 'Mahsulotlarni olishda xato', error: error.message });
  }
});

app.get('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Mahsulot topilmadi' });
    }
    res.json(product);  } catch (error) {
    console.error('Product fetch error:', error);
    res.status(500).json({ message: 'Mahsulotni olishda xato' });
  }
});

// Payment endpoint
app.post('/api/payment', async (req, res) => {
  const { orderId, amount, paymentMethod } = req.body;

  try {
    let paymentUrl;
    
    if (paymentMethod === 'click') {
      // Click integration
      const clickResponse = await axios.post('https://api.click.uz/v2/merchant/invoice/create', {
        service_id: process.env.CLICK_SERVICE_ID,
        amount,
        order_id: orderId,
        return_url: `${process.env.FRONTEND_URL}/payment-success`,
        description: `Paket UZB - Buyurtma #${orderId}`
      }, {
        headers: { 'Auth': process.env.CLICK_AUTH_TOKEN }
      });
      paymentUrl = clickResponse.data.invoice_url;
      
    } else if (paymentMethod === 'payme') {
      // Payme integration
      const params = Buffer.from(JSON.stringify({
        m: process.env.PAYME_MERCHANT_ID,
        ac: { order_id: orderId },
        a: amount * 100,
        l: 'uz'
      })).toString('base64');
      paymentUrl = `https://checkout.paycom.uz/${params}`;
      
    } else {
      throw new Error('Noto\'g\'ri to\'lov usuli');
    }

    // Update order payment status
    await Order.findByIdAndUpdate(orderId, { 
      paymentStatus: 'processing',
      paymentMethod 
    });

    res.json({ 
      message: 'To\'lov boshlandi', 
      paymentUrl,
      orderId 
    });
    
  } catch (error) {
    console.error('Payment error:', error);
    res.status(500).json({ message: 'To\'lov xatosi', error: error.message });
  }
});

// Contact endpoint
app.post('/api/contact', async (req, res) => {
  try {
    console.log('📞 Received contact form:', JSON.stringify(req.body, null, 2));
    
    const contact = new Contact(req.body);
    await contact.save();
    console.log('✅ Contact saved to database:', contact._id);
    
    // Send notifications
    try {
      await Promise.all([
        telegramBot.sendContactNotification(contact),
        googleSheets.addContact(contact)
      ]);
      console.log('✅ Contact notifications sent successfully');
    } catch (notificationError) {
      console.error('❌ Contact notification error:', notificationError.message);
      // Don't fail the contact creation if notifications fail
    }
    
    res.status(201).json({ 
      message: 'Murojaat muvaffaqiyatli yuborildi!',
      contactId: contact._id 
    });
  } catch (error) {
    console.error('❌ Contact creation error:', error);
    res.status(500).json({ 
      message: 'Murojaat saqlashda xato',
      error: error.message 
    });
  }
});

// Categories endpoint
app.get('/api/categories', async (req, res) => {
  try {
    const categories = await Product.distinct('category');
    res.json(categories);
  } catch (error) {
    console.error('Categories fetch error:', error);
    res.status(500).json({ message: 'Kategoriyalarni olishda xato' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Paket UZB Backend is running!',
    timestamp: new Date().toISOString()
  });
});

// Utility functions
function generateOrderNumber() {
  const timestamp = Date.now().toString();
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `PKT${timestamp.slice(-6)}${random}`;
}

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Endpoint topilmadi' });
});

const PORT = process.env.PORT || 3004;
app.listen(PORT, () => {
  console.log(`🚀 Server ${PORT}-portda ishlamoqda`);
  console.log(`📱 Telegram bot: ${process.env.TELEGRAM_BOT_TOKEN ? 'Configured' : 'Not configured'}`);
  console.log(`📊 Google Sheets: ${process.env.GOOGLE_SHEETS_ID ? 'Configured' : 'Not configured'}`);
});
