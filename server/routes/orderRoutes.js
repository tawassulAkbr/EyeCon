const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Cart = require('../models/Cart');
const User = require('../models/User');
const auth = require('../middleware/auth');
const { sendOrderStatusEmail, generateTrackingId } = require('../utils/email');

// Create Order
router.post('/', auth, async (req, res) => {
  try {
    const { shippingAddress, totalPrice, paymentMethod, items } = req.body;

    if (!shippingAddress || !totalPrice) {
      return res.status(400).json({ message: 'Please provide shipping address and total price' });
    }

    const currentUser = await User.findById(req.userId).select('role');
    if (currentUser?.role === 'admin') {
      return res.status(403).json({ message: 'Admins can view orders but cannot place orders.' });
    }

    let cartItems = [];

    if (Array.isArray(items) && items.length > 0) {
      cartItems = items.map((item) => ({
        productId: item.productId || item.id || 'unknown',
        productName: item.productName || item.name || 'Product',
        price: item.price?.toString() || '0',
        quantity: item.quantity || 1,
        image: item.image || '',
      }));
    } else {
      const cart = await Cart.findOne({ userId: req.userId });
      if (!cart || cart.items.length === 0) {
        return res.status(400).json({ message: 'Cart is empty' });
      }
      cartItems = cart.items;
    }

    if (cartItems.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    const trackingId = generateTrackingId();

    // Create order from cart items
    const order = new Order({
      userId: req.userId,
      items: cartItems,
      shippingAddress,
      totalPrice,
      paymentMethod,
      trackingId,
      status: 'pending',
      paymentStatus: 'completed',
    });

    await order.save();

    // Clear cart after order when the user has a saved cart
    const cart = await Cart.findOne({ userId: req.userId });
    if (cart) {
      cart.items = [];
      cart.updatedAt = Date.now();
      await cart.save();
    }

    const user = await User.findById(req.userId).select('name email');
    try {
      await sendOrderStatusEmail({
        ...order.toObject(),
        userId: user,
        customerName: user?.name,
        userEmail: user?.email,
      }, 'pending', 'Your order has been confirmed.');
    } catch (emailErr) {
      console.error('[orders] confirmation email failed', emailErr);
    }

    res.status(201).json({ success: true, order, message: 'Order created successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get User Orders
router.get('/', auth, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.json({ success: true, orders });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get Order Details
router.get('/:orderId', auth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Check if order belongs to user
    if (order.userId.toString() !== req.userId.toString()) {
      return res.status(403).json({ message: 'Not authorized to view this order' });
    }

    res.json({ success: true, order });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update Order Status (Admin only)
router.put('/:orderId/status', auth, async (req, res) => {
  try {
    const { status, notes } = req.body;

    const currentUser = await User.findById(req.userId).select('role');
    if (currentUser?.role !== 'admin') {
      return res.status(403).json({ message: 'Only admins can update order status.' });
    }

    if (!status) {
      return res.status(400).json({ message: 'Please provide status' });
    }

    const validStatuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.orderId,
      { status, notes, updatedAt: Date.now() },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    const user = await User.findById(order.userId).select('name email');
    try {
      await sendOrderStatusEmail({
        ...order.toObject(),
        userId: user,
        customerName: user?.name,
        userEmail: user?.email,
      }, status, notes || 'Your order status has been updated.');
    } catch (emailErr) {
      console.error('[orders] status email failed', emailErr);
    }

    res.json({ success: true, order, message: 'Order status updated' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update Payment Status
router.put('/:orderId/payment', auth, async (req, res) => {
  try {
    const { paymentStatus } = req.body;

    if (!paymentStatus) {
      return res.status(400).json({ message: 'Please provide payment status' });
    }

    const validStatuses = ['pending', 'completed', 'failed'];
    if (!validStatuses.includes(paymentStatus)) {
      return res.status(400).json({ message: 'Invalid payment status' });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.orderId,
      { paymentStatus, updatedAt: Date.now() },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json({ success: true, order, message: 'Payment status updated' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Cancel Order
router.put('/:orderId/cancel', auth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (order.userId.toString() !== req.userId.toString()) {
      return res.status(403).json({ message: 'Not authorized to cancel this order' });
    }

    if (order.status !== 'pending') {
      return res.status(400).json({ message: 'Can only cancel pending orders' });
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.orderId,
      { status: 'cancelled', notes: req.body.notes || 'Cancelled by customer', updatedAt: Date.now() },
      { new: true }
    );

    const user = await User.findById(req.userId).select('name email');
    try {
      await sendOrderStatusEmail({
        ...updatedOrder.toObject(),
        userId: user,
        customerName: user?.name,
        userEmail: user?.email,
      }, 'cancelled', req.body.notes || 'Your order has been cancelled.');
    } catch (emailErr) {
      console.error('[orders] cancellation email failed', emailErr);
    }

    res.json({ success: true, order: updatedOrder, message: 'Order cancelled successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
