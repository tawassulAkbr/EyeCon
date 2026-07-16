const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const auth = require('../middleware/auth');
const User = require('../models/User');

// Get all products with filters and pagination
router.get('/', async (req, res) => {
  try {
    const { category, page = 1, limit = 12, search } = req.query;
    const skip = (page - 1) * limit;

    let query = { published: true };

    if (category) {
      query.category = category;
    }

    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }

    const products = await Product.find(query)
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    const total = await Product.countDocuments(query);

    res.json({
      success: true,
      products,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get products by category (existing endpoint)
router.get('/:category', async (req, res) => {
  try {
    // Check if it's a valid ObjectId pattern (single product) or category
    if (req.params.category.match(/^[0-9a-fA-F]{24}$/)) {
      // It's an ID, get single product
      const product = await Product.findById(req.params.category);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      return res.json({ success: true, product });
    }

    // It's a category
    const products = await Product.find({ category: req.params.category, published: true });
    res.json({ success: true, products });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create product (admin only)
router.post('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized. Admin access required.' });
    }

    const { name, description, price, image, category, stock } = req.body;

    if (!name || !price || !image || !category) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const product = new Product({
      name,
      description,
      price,
      image,
      category,
      stock: stock || 100,
    });

    await product.save();

    res.status(201).json({ success: true, product, message: 'Product created successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update product (admin only)
router.put('/:id', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized. Admin access required.' });
    }

    const { name, description, price, image, category, stock, published } = req.body;

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name,
        description,
        price,
        image,
        category,
        stock,
        published,
        updatedAt: Date.now(),
      },
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({ success: true, product, message: 'Product updated successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete product (admin only)
router.delete('/:id', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized. Admin access required.' });
    }

    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({ success: true, message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;