const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const telegramBot = require('../utils/telegramBot');
const googleSheets = require('../utils/googleSheets');

// Generate order number
function generateOrderNumber() {
  const date = new Date();
  const year = date.getFullYear().toString().slice(-2);
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `${year}${month}${day}${random}`;
}

// Create new order
router.post('/', async (req, res) => {
  try {
    console.log('📦 Creating new order...');
    
    const orderData = {
      ...req.body,
      orderNumber: generateOrderNumber(),
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const order = new Order(orderData);
    await order.save();

    console.log('✅ Order saved successfully:', order.orderNumber);

    // Send notifications asynchronously (non-blocking)
    Promise.all([
      telegramBot.sendOrderNotification(order).catch(err => 
        console.error('❌ Telegram notification failed:', err.message)
      ),
      googleSheets.addOrderToSheet(order).catch(err => 
        console.error('❌ Google Sheets update failed:', err.message)
      )
    ]).then(() => {
      console.log('✅ Notifications processing completed');
    }).catch(err => {
      console.error('❌ Notification processing failed:', err.message);
    });

    // Always return success to frontend
    res.status(201).json({
      success: true,
      message: 'Buyurtma muvaffaqiyatli qabul qilindi!',
      orderId: order._id,
      orderNumber: order.orderNumber
    });

  } catch (error) {
    console.error('❌ Order creation failed:', error);
    res.status(500).json({
      success: false,
      message: 'Buyurtma yuborishda xatolik yuz berdi!'
    });
  }
});

// Get all orders
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    console.error('❌ Error fetching orders:', error);
    res.status(500).json({ message: 'Buyurtmalarni olishda xatolik yuz berdi!' });
  }
});

// Get order by ID
router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Buyurtma topilmadi!' });
    }
    res.json(order);
  } catch (error) {
    console.error('❌ Error fetching order:', error);
    res.status(500).json({ message: 'Buyurtmani olishda xatolik yuz berdi!' });
  }
});

// Update order status
router.patch('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status, updatedAt: new Date() },
      { new: true }
    );
    
    if (!order) {
      return res.status(404).json({ message: 'Buyurtma topilmadi!' });
    }

    // Send status update notification
    telegramBot.sendOrderStatusUpdate(order, order.status, status).catch(err => 
      console.error('❌ Status update notification failed:', err.message)
    );

    res.json({ message: 'Buyurtma holati yangilandi!', order });
  } catch (error) {
    console.error('❌ Error updating order status:', error);
    res.status(500).json({ message: 'Buyurtma holatini yangilashda xatolik yuz berdi!' });
  }
});

module.exports = router;