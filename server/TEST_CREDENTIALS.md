# 🔐 Eyecon Test Credentials - KEEP SECURE

## ⚠️ IMPORTANT: Do Not Share These Credentials in Production
### These are test/demo credentials only. Change passwords before going live.

---

## 👨‍💼 ADMIN ACCOUNT

### Email: `admin@eyecon.pk`
### Password: `Admin@123`
### Role: **Admin**

**Admin Address:**
- Street: Office No. 456, Lahore Tech Park
- City: Lahore
- State: Punjab
- Postal Code: 54000
- Country: Pakistan

**Admin Capabilities:**
- Manage all products (Create, Read, Update, Delete)
- View all orders and users
- Update order status
- Access dashboard with statistics
- Change user roles
- Delete user accounts

---

## 👤 REGULAR USER ACCOUNTS

### User 1
**Email:** `ahmed.hassan@example.pk`
**Password:** `User@123`
**Name:** Ahmed Hassan
**Role:** User

**Addresses:**
1. *Default Address:*
   - Street: House No. 123, Street 15
   - City: Karachi
   - State: Sindh
   - Postal Code: 75500
   - Country: Pakistan

2. *Alternate Address:*
   - Street: Apartment 5B, Gulshan Plaza
   - City: Karachi
   - State: Sindh
   - Postal Code: 75600
   - Country: Pakistan

---

### User 2
**Email:** `fatima.khan@example.pk`
**Password:** `User@123`
**Name:** Fatima Khan
**Role:** User

**Address:**
- Street: Plot 789, DHA Phase 5
- City: Lahore
- State: Punjab
- Postal Code: 54792
- Country: Pakistan

---

### User 3
**Email:** `ali.raza@example.pk`
**Password:** `User@123`
**Name:** Ali Raza
**Role:** User

**Addresses:**
1. *Default Address:*
   - Street: House 45, Civic Centre
   - City: Islamabad
   - State: Islamabad Capital Territory
   - Postal Code: 44000
   - Country: Pakistan

2. *Alternate Address:*
   - Street: Office Suite 201, Blue Area
   - City: Islamabad
   - State: Islamabad Capital Territory
   - Postal Code: 44050
   - Country: Pakistan

---

### User 4
**Email:** `ayesha.malik@example.pk`
**Password:** `User@123`
**Name:** Ayesha Malik
**Role:** User

**Address:**
- Street: Villa 12, Gulberg III
- City: Lahore
- State: Punjab
- Postal Code: 54660
- Country: Pakistan

---

## 🛍️ PRODUCT INVENTORY

### Optical Frames (5 products)
1. Classic Blue Frame - Rs. 1,500 (50 in stock)
2. Classic Black Frame - Rs. 1,200 (45 in stock)
3. Classic Brown Frame - Rs. 1,800 (30 in stock)
4. Ocean White Frame - Rs. 1,500 (40 in stock)
5. Black Classic Frame - Rs. 800 (60 in stock)

### Lenses (4 products)
1. Amber Ambition - Rs. 2,000 (50 in stock)
2. Aquatic Allure - Rs. 2,000 (45 in stock)
3. Blue n Breeze - Rs. 2,000 (40 in stock)
4. Green - Rs. 1,800 (35 in stock)

### Sunglasses (5 products)
1. Ray-Ban Classic - Rs. 3,500 (25 in stock)
2. Ray-Ban Aviator - Rs. 4,200 (30 in stock)
3. Dolce & Gabbana Luxury - Rs. 7,500 (15 in stock)
4. Louis Vuitton Prestige - Rs. 11,000 (10 in stock)
5. Prada Modernist - Rs. 8,500 (12 in stock)

**Total: 14 products**

---

## 🧪 TESTING WORKFLOW

### 1. Login as Admin
```bash
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@eyecon.pk","password":"Admin@123"}'
```

### 2. Login as Regular User
```bash
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"ahmed.hassan@example.pk","password":"User@123"}'
```

### 3. Browse Products
```bash
curl http://localhost:8000/api/products?category=optical
```

### 4. Add to Cart
```bash
curl -X POST http://localhost:8000/api/cart/add \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{"productId":"...","quantity":1,"price":"Rs. 1500"}'
```

### 5. Create Order
```bash
curl -X POST http://localhost:8000/api/orders \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{
    "shippingAddress": {...},
    "totalPrice": "Rs. 1500",
    "paymentMethod": "credit_card"
  }'
```

---

## 📊 PAKISTAN LOCATIONS USED

### Cities
- **Lahore** (Punjab) - Capital of Punjab
- **Karachi** (Sindh) - Largest city, financial hub
- **Islamabad** (ICT) - Capital of Pakistan
- **Peshawar** (KP) - Coming soon
- **Multan** (Punjab) - Coming soon

### Postal Code Ranges (Pakistan)
- **Lahore:** 54000-54800
- **Karachi:** 75000-75900
- **Islamabad:** 44000-44100
- **Peshawar:** 25000-25600
- **Multan:** 60000-60800

---

## 🔒 SECURITY NOTES

⚠️ **Important:**
1. These are TEST credentials only
2. Change all passwords in production
3. Do NOT commit this file to version control
4. Do NOT share credentials publicly
5. Use strong, unique passwords in production
6. Enable 2FA for admin accounts
7. Setup HTTPS before going live

---

## 🚀 QUICK START

1. **Seed Database:**
   ```bash
   node seedWithPakistan.js
   ```

2. **Start Server:**
   ```bash
   npm run dev
   ```

3. **Test Login:**
   - Use credentials above
   - Get JWT token from response
   - Use token in Authorization header for protected routes

4. **Frontend Integration:**
   - Base URL: `http://localhost:8000/api`
   - Store JWT token in localStorage
   - Include token in all protected API calls

---

**Created:** July 16, 2026
**Database:** MongoDB Atlas
**Currency:** Pakistani Rupee (Rs.)
**Status:** ✅ Ready for Testing
