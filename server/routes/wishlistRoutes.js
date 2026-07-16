const express = require('express');
const router = express.Router();
const Wishlist = require('../models/Wishlist');
const Product = require('../models/Product');
const auth = require('../middleware/auth');

// Get Wishlist
router.get('/', auth, async (req, res) => {
  try {
    let wishlist = await Wishlist.findOne({ userId: req.userId });
    if (!wishlist) {
      wishlist = new Wishlist({ userId: req.userId, products: [] });
      await wishlist.save();
    }
    res.json({ success: true, wishlist });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add to Wishlist
router.post('/add/:productId', auth, async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    let wishlist = await Wishlist.findOne({ userId: req.userId });
    if (!wishlist) {
      wishlist = new Wishlist({ userId: req.userId, products: [] });
    }

    // Check if product already in wishlist
    const exists = wishlist.products.find(p => p.productId.toString() === req.params.productId);
    if (exists) {
      return res.status(400).json({ message: 'Product already in wishlist' });
    }

    wishlist.products.push({
      productId: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
    });

    wishlist.updatedAt = Date.now();
    await wishlist.save();

    res.status(201).json({ success: true, wishlist, message: 'Product added to wishlist' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Remove from Wishlist
router.delete('/remove/:productId', auth, async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ userId: req.userId });
    if (!wishlist) {
      return res.status(404).json({ message: 'Wishlist not found' });
    }

    wishlist.products = wishlist.products.filter(
      p => p.productId.toString() !== req.params.productId
    );

    wishlist.updatedAt = Date.now();
    await wishlist.save();

    res.json({ success: true, wishlist, message: 'Product removed from wishlist' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Clear Wishlist
router.delete('/clear', auth, async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ userId: req.userId });
    if (!wishlist) {
      return res.status(404).json({ message: 'Wishlist not found' });
    }

    wishlist.products = [];
    wishlist.updatedAt = Date.now();
    await wishlist.save();

    res.json({ success: true, wishlist, message: 'Wishlist cleared' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
