# 👓 Eyecon – Modern Eyewear E-Commerce Platform

Eyecon is a full-stack MERN-based eyewear shopping platform that allows customers to browse, purchase, and manage eyewear products while providing administrators with tools to manage inventory, orders, and customers.

The project is built using **React + Vite** for the frontend and **Node.js + Express + MongoDB** for the backend, featuring secure authentication, shopping cart, wishlist, order management, reviews, and an admin dashboard.

---

# ✨ Features

## Customer Features

- User Registration & Login
- JWT Authentication
- Secure Password Hashing
- Profile Management
- Browse Optical Glasses
- Browse Sunglasses
- Browse Contact Lenses
- Product Search & Filtering
- Shopping Cart
- Wishlist
- Checkout Flow
- Order Tracking
- Product Reviews & Ratings
- Responsive Design

---

## Admin Features

- Admin Dashboard
- Manage Products
- Manage Orders
- Manage Customers
- Inventory Management
- View Customer Reviews

---

## Backend Features

- RESTful API
- MongoDB Database
- JWT Authentication
- Protected Routes
- Password Encryption using bcrypt
- Email Utilities with Nodemailer
- Environment Variable Support
- Modular MVC Architecture

---

# 🛠 Tech Stack

## Frontend

- React 19
- Vite
- React Router DOM
- Axios
- Tailwind CSS
- Framer Motion
- Lucide React

---

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- Nodemailer
- CORS
- dotenv

---

# 📂 Project Structure

```
Eyecon/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── data/
│   │   └── assets/
│   ├── public/
│   └── package.json
│
├── server/
│   ├── config/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── index.js
│   └── package.json
│
└── README.md
```

---

# 📦 Installation

## Clone Repository

```bash
git clone <https://github.com/tawassulAkbr/EyeCon.git>
cd Eyecon
```

---

## Install Frontend

```bash
cd client
npm install
```

---

## Install Backend

```bash
cd ../server
npm install
```

---

# ⚙ Environment Variables

Create a `.env` file inside the **server** directory.

Example:

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

EMAIL_USER=your_email@gmail.com

EMAIL_PASS=your_email_password
```

---

# ▶ Running the Application

## Start Backend

```bash
cd server
npm run dev
```

Backend runs on

```
http://localhost:5000
```

---

## Start Frontend

```bash
cd client
npm run dev
```

Frontend runs on

```
http://localhost:5173
```

---

# 📚 API Modules

The backend includes APIs for:

- Authentication
- Products
- Cart
- Wishlist
- Orders
- Reviews
- Admin Operations

---

# 🔐 Authentication

Eyecon uses:

- JWT Authentication
- Protected API Routes
- Password Hashing (bcryptjs)

Only authenticated users can access protected resources, while administrative operations require admin authorization.

---

# 🛍 Shopping Workflow

1. Register/Login
2. Browse Products
3. Add Items to Cart
4. Add Favorites to Wishlist
5. Checkout
6. Place Order
7. Track Orders
8. Leave Product Reviews

---

# 📁 Database Collections

The application stores data in MongoDB using the following collections:

- Users
- Products
- Orders
- Cart
- Wishlist
- Reviews

---

# 🎨 UI Highlights

- Modern responsive interface
- Mobile-friendly layout
- Smooth page animations
- Clean product catalog
- Dashboard pages
- Interactive shopping experience

---

# 🚀 Future Improvements

- Online Payment Gateway Integration
- Product Search Suggestions
- Discount Coupons
- AI Product Recommendations
- Product Comparison
- Multi-vendor Support
- Notification System
- Image Upload using Cloudinary
- Sales Analytics Dashboard

---

# 👨‍💻 Developers

Developed as a full-stack MERN project demonstrating:

- REST API Development
- Authentication & Authorization
- MongoDB Database Design
- React State Management
- Responsive UI Development
- Secure Backend Architecture

---

# 📄 License

This project is intended for educational and learning purposes.
