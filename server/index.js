const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const { getMailerStatus } = require('./utils/email');
require('dotenv').config();

const port = process.env.PORT || 8000;

const app = express();
connectDB();
app.use(cors());
app.use(express.json());

// Routes
app.use('/images', express.static('public/images'));
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/cart', require('./routes/cartRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/reviews', require('./routes/reviewRoutes'));
app.use('/api/wishlist', require('./routes/wishlistRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log(`[email] ${getMailerStatus()}`);
});