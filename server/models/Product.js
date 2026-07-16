const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true,
    trim: true,
  },
  description: {
    type: String,
    default: '',
  },
  price: { 
    type: String, 
    required: true,
  },
  image: { 
    type: String, 
    required: true,
  },
  category: { 
    type: String, 
    required: true,
    enum: ['optical', 'sunglasses', 'lens'],
  },
  stock: {
    type: Number,
    default: 100,
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },
  reviews: {
    type: Number,
    default: 0,
  },
  published: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Product', ProductSchema);