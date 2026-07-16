# Eyecon Backend API Documentation

## Base URL
```
http://localhost:8000/api
```

## Authentication
Most endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

---

## 🔐 Authentication Routes (`/auth`)

### Register User
- **POST** `/auth/register`
- **Body:**
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Response:** Returns JWT token and user object

### Login
- **POST** `/auth/login`
- **Body:**
  ```json
  {
    "email": "admin@eyecon.pk",
    "password": "Admin@123"
  }
  ```
- **Response:** Returns JWT token and user object

### Get Current User
- **GET** `/auth/me`
- **Auth:** Required
- **Response:** Returns current user profile

### Update Profile
- **PUT** `/auth/profile`
- **Auth:** Required
- **Body:**
  ```json
  {
    "password": "User@123",
    "email": "jahmed.hassan@example.pk
              fatima.khan@example.pk
              ali.raza@example.pk
              ayesha.malik@example.pk"
  }
  ```

### Change Password
- **PUT** `/auth/change-password`
- **Auth:** Required
- **Body:**
  ```json
  {
    "currentPassword": "oldpassword",
    "newPassword": "newpassword"
  }
  ```

### Add Address
- **POST** `/auth/address`
- **Auth:** Required
- **Body:**
  ```json
  {
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zipCode": "10001",
    "country": "USA",
    "isDefault": true
  }
  ```

### Get Addresses
- **GET** `/auth/addresses`
- **Auth:** Required

### Delete Address
- **DELETE** `/auth/address/:addressId`
- **Auth:** Required

---

## 🛒 Product Routes (`/products`)

### Get All Products
- **GET** `/products`
- **Query Parameters:**
  - `category` - Filter by category (optical, sunglasses, lens)
  - `page` - Page number (default: 1)
  - `limit` - Items per page (default: 12)
  - `search` - Search by product name
- **Response:**
  ```json
  {
    "success": true,
    "products": [...],
    "pagination": { "total": 50, "page": 1, "pages": 5 }
  }
  ```

### Get Products by Category
- **GET** `/products/:category`
- **Example:** `/products/optical`

### Get Single Product
- **GET** `/products/:id`
- **Note:** Uses MongoDB ObjectId

### Create Product (Admin Only)
- **POST** `/products`
- **Auth:** Required (Admin)
- **Body:**
  ```json
  {
    "name": "Product Name",
    "description": "Product description",
    "price": "Rs. 1000",
    "image": "image-url",
    "category": "optical",
    "stock": 100
  }
  ```

### Update Product (Admin Only)
- **PUT** `/products/:id`
- **Auth:** Required (Admin)
- **Body:** Same as create

### Delete Product (Admin Only)
- **DELETE** `/products/:id`
- **Auth:** Required (Admin)

---

## 🛍️ Cart Routes (`/cart`)

### Get Cart
- **GET** `/cart`
- **Auth:** Required

### Add to Cart
- **POST** `/cart/add`
- **Auth:** Required
- **Body:**
  ```json
  {
    "productId": "507f1f77bcf86cd799439011",
    "productName": "Blue Frame",
    "price": "Rs. 1000",
    "quantity": 1,
    "image": "image-url"
  }
  ```

### Update Cart Item
- **PUT** `/cart/update/:itemId`
- **Auth:** Required
- **Body:**
  ```json
  {
    "quantity": 2
  }
  ```

### Remove from Cart
- **DELETE** `/cart/remove/:itemId`
- **Auth:** Required

### Clear Cart
- **DELETE** `/cart/clear`
- **Auth:** Required

---

## 📦 Order Routes (`/orders`)

### Create Order
- **POST** `/orders`
- **Auth:** Required
- **Body:**
  ```json
  {
    "shippingAddress": {
      "street": "123 Main St",
      "city": "New York",
      "state": "NY",
      "zipCode": "10001",
      "country": "USA"
    },
    "totalPrice": "Rs. 5000",
    "paymentMethod": "credit_card"
  }
  ```

### Get User Orders
- **GET** `/orders`
- **Auth:** Required

### Get Order Details
- **GET** `/orders/:orderId`
- **Auth:** Required

### Update Order Status (Admin)
- **PUT** `/orders/:orderId/status`
- **Auth:** Required (Admin)
- **Body:**
  ```json
  {
    "status": "shipped",
    "notes": "Order shipped via courier"
  }
  ```

### Update Payment Status
- **PUT** `/orders/:orderId/payment`
- **Auth:** Required
- **Body:**
  ```json
  {
    "paymentStatus": "completed"
  }
  ```

### Cancel Order
- **DELETE** `/orders/:orderId`
- **Auth:** Required
- **Note:** Can only cancel pending orders

---

## ⭐ Review Routes (`/reviews`)

### Get Product Reviews
- **GET** `/reviews/product/:productId`

### Add Review
- **POST** `/reviews`
- **Auth:** Required
- **Body:**
  ```json
  {
    "productId": "507f1f77bcf86cd799439011",
    "rating": 5,
    "comment": "Great product!"
  }
  ```

### Update Review
- **PUT** `/reviews/:reviewId`
- **Auth:** Required
- **Body:**
  ```json
  {
    "rating": 4,
    "comment": "Updated review"
  }
  ```

### Delete Review
- **DELETE** `/reviews/:reviewId`
- **Auth:** Required

---

## ❤️ Wishlist Routes (`/wishlist`)

### Get Wishlist
- **GET** `/wishlist`
- **Auth:** Required

### Add to Wishlist
- **POST** `/wishlist/add/:productId`
- **Auth:** Required

### Remove from Wishlist
- **DELETE** `/wishlist/remove/:productId`
- **Auth:** Required

### Clear Wishlist
- **DELETE** `/wishlist/clear`
- **Auth:** Required

---

## 👨‍💼 Admin Routes (`/admin`)

### Get Dashboard Stats
- **GET** `/admin/dashboard/stats`
- **Auth:** Required (Admin)
- **Response:**
  ```json
  {
    "success": true,
    "stats": {
      "totalUsers": 150,
      "totalProducts": 75,
      "totalOrders": 320,
      "pendingOrders": 15,
      "totalRevenue": 50000
    }
  }
  ```

### Get All Users
- **GET** `/admin/users`
- **Auth:** Required (Admin)
- **Query:** `page`, `limit`

### Get All Orders
- **GET** `/admin/orders`
- **Auth:** Required (Admin)
- **Query:** `page`, `limit`, `status`

### Get Order Details
- **GET** `/admin/orders/:orderId`
- **Auth:** Required (Admin)

### Update Order Status
- **PUT** `/admin/orders/:orderId/status`
- **Auth:** Required (Admin)

### Update User Role
- **PUT** `/admin/users/:userId/role`
- **Auth:** Required (Admin)
- **Body:**
  ```json
  {
    "role": "admin"
  }
  ```

### Delete User
- **DELETE** `/admin/users/:userId`
- **Auth:** Required (Admin)

---

## Error Responses

All errors follow this format:
```json
{
  "success": false,
  "message": "Error description"
}
```

### Common HTTP Status Codes
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized (no token)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found
- `500` - Server Error

---

## Setup Instructions

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Configure Environment:**
   - Copy `.env.example` to `.env`
   - Add your MongoDB URI
   - Add JWT_SECRET

3. **Run Server:**
   ```bash
   npm run dev
   ```

4. **Seed Database (Optional):**
   ```bash
   node seed.js
   ```

---

## Testing Endpoints

Use Postman or cURL to test endpoints. Example:

```bash
curl -X POST http://localhost:8000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@example.com","password":"pass123"}'
```

---

## Notes

- All dates are in ISO 8601 format
- Prices are stored as strings (e.g., "Rs. 1000")
- Products are fetched by category or individually
- Admin endpoints require admin role
- Cart and Wishlist are user-specific
- Orders cannot be modified after shipping
