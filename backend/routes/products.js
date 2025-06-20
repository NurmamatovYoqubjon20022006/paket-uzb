const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Get all products with filters
router.get('/', async (req, res) => {
  try {
    console.log('📦 Fetching products with query:', req.query);
    
    const { category, minPrice, maxPrice, search, page = 1, limit = 20 } = req.query;
    
    // Build filter object
    const filter = { status: 'active' };
    
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
        { description: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }
    
    console.log('🔍 Filter applied:', filter);
    
    // Calculate pagination
    const skip = (page - 1) * limit;
    
    // Get products with pagination
    const products = await Product.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));
    
    // Get total count for pagination
    const total = await Product.countDocuments(filter);
    
    console.log(`✅ Found ${products.length} products out of ${total} total`);
    
    res.json({
      products,
      pagination: {
        currentPage: Number(page),
        totalPages: Math.ceil(total / limit),
        totalProducts: total,
        hasNext: skip + products.length < total,
        hasPrev: page > 1
      }
    });
    
  } catch (error) {
    console.error('❌ Error fetching products:', error);
    res.status(500).json({ 
      message: 'Mahsulotlarni olishda xato',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Ichki server xatosi'
    });
  }
});

// Get single product by ID
router.get('/:id', async (req, res) => {
  try {
    console.log('🔍 Fetching product by ID:', req.params.id);
    
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ message: 'Mahsulot topilmadi' });
    }
    
    if (product.status !== 'active') {
      return res.status(404).json({ message: 'Mahsulot mavjud emas' });
    }
    
    console.log('✅ Product found:', product.name);
    res.json(product);
    
  } catch (error) {
    console.error('❌ Error fetching product:', error);
    
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Noto\'g\'ri mahsulot ID' });
    }
    
    res.status(500).json({ 
      message: 'Mahsulotni olishda xato',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Ichki server xatosi'
    });
  }
});

// Get product categories
router.get('/categories/list', async (req, res) => {
  try {
    console.log('📂 Fetching product categories...');
    
    const categories = await Product.distinct('category', { status: 'active' });
    
    console.log('✅ Categories found:', categories);
    res.json(categories);
    
  } catch (error) {
    console.error('❌ Error fetching categories:', error);
    res.status(500).json({ 
      message: 'Kategoriyalarni olishda xato',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Ichki server xatosi'
    });
  }
});

// Search products
router.get('/search/:query', async (req, res) => {
  try {
    const { query } = req.params;
    const { category, minPrice, maxPrice, page = 1, limit = 20 } = req.query;
    
    console.log('🔍 Searching products for:', query);
    
    // Build filter
    const filter = {
      status: 'active',
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
        { tags: { $in: [new RegExp(query, 'i')] } }
      ]
    };
    
    if (category && category !== 'all') {
      filter.category = category;
    }
    
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }
    
    // Get products with pagination
    const skip = (page - 1) * limit;
    const products = await Product.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));
    
    const total = await Product.countDocuments(filter);
    
    console.log(`✅ Search found ${products.length} products`);
    
    res.json({
      products,
      query,
      pagination: {
        currentPage: Number(page),
        totalPages: Math.ceil(total / limit),
        totalProducts: total,
        hasNext: skip + products.length < total,
        hasPrev: page > 1
      }
    });
    
  } catch (error) {
    console.error('❌ Error searching products:', error);
    res.status(500).json({ 
      message: 'Qidirishda xato',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Ichki server xatosi'
    });
  }
});

module.exports = router;
