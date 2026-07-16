const API_BASE_URL = 'http://localhost:8000/api';

// Products API
export const fetchProducts = async (category = null, page = 1) => {
  let url = `${API_BASE_URL}/products?page=${page}`;
  if (category) url += `&category=${category}`;
  
  const response = await fetch(url);
  if (!response.ok) throw new Error('Failed to fetch products');
  return await response.json();
};

export const fetchProductsByCategory = async (category) => {
  const response = await fetch(`${API_BASE_URL}/products/${category}`);
  if (!response.ok) throw new Error('Failed to fetch products');
  return await response.json();
};

// Cart API
export const fetchCart = async (token) => {
  const response = await fetch(`${API_BASE_URL}/cart`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  if (!response.ok) throw new Error('Failed to fetch cart');
  return await response.json();
};

export const addToCart = async (token, productId, productName, price, quantity, image) => {
  const response = await fetch(`${API_BASE_URL}/cart/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ productId, productName, price, quantity, image })
  });
  if (!response.ok) throw new Error('Failed to add to cart');
  return await response.json();
};

export const updateCartItem = async (token, itemId, quantity) => {
  const response = await fetch(`${API_BASE_URL}/cart/update/${itemId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ quantity })
  });
  if (!response.ok) throw new Error('Failed to update cart');
  return await response.json();
};

export const removeFromCart = async (token, itemId) => {
  const response = await fetch(`${API_BASE_URL}/cart/remove/${itemId}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` }
  });
  if (!response.ok) throw new Error('Failed to remove from cart');
  return await response.json();
};

export const clearCart = async (token) => {
  const response = await fetch(`${API_BASE_URL}/cart/clear`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` }
  });
  if (!response.ok) throw new Error('Failed to clear cart');
  return await response.json();
};

// Orders API
export const createOrder = async (token, shippingAddress, totalPrice, paymentMethod = 'credit_card', items = []) => {
  const response = await fetch(`${API_BASE_URL}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ shippingAddress, totalPrice, paymentMethod, items })
  });
  if (!response.ok) throw new Error('Failed to create order');
  return await response.json();
};

export const fetchOrders = async (token) => {
  const response = await fetch(`${API_BASE_URL}/orders`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  if (!response.ok) throw new Error('Failed to fetch orders');
  return await response.json();
};

export const fetchOrderDetails = async (token, orderId) => {
  const response = await fetch(`${API_BASE_URL}/orders/${orderId}`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  if (!response.ok) throw new Error('Failed to fetch order');
  return await response.json();
};

// Wishlist API
export const fetchWishlist = async (token) => {
  const response = await fetch(`${API_BASE_URL}/wishlist`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  if (!response.ok) throw new Error('Failed to fetch wishlist');
  return await response.json();
};

export const addToWishlist = async (token, productId) => {
  const response = await fetch(`${API_BASE_URL}/wishlist/add/${productId}`, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${token}` }
  });
  if (!response.ok) throw new Error('Failed to add to wishlist');
  return await response.json();
};

export const removeFromWishlist = async (token, productId) => {
  const response = await fetch(`${API_BASE_URL}/wishlist/remove/${productId}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` }
  });
  if (!response.ok) throw new Error('Failed to remove from wishlist');
  return await response.json();
};

// Reviews API
export const fetchReviews = async (productId) => {
  const response = await fetch(`${API_BASE_URL}/reviews/product/${productId}`);
  if (!response.ok) throw new Error('Failed to fetch reviews');
  return await response.json();
};

export const addReview = async (token, productId, rating, comment) => {
  const response = await fetch(`${API_BASE_URL}/reviews`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ productId, rating, comment })
  });
  if (!response.ok) throw new Error('Failed to add review');
  return await response.json();
};

// Admin API
export const fetchAdminStats = async (token) => {
  const response = await fetch(`${API_BASE_URL}/admin/dashboard/stats`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  if (!response.ok) throw new Error('Failed to fetch dashboard stats');
  return await response.json();
};

export const fetchAdminUsers = async (token, page = 1, limit = 10) => {
  const response = await fetch(`${API_BASE_URL}/admin/users?page=${page}&limit=${limit}`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  if (!response.ok) throw new Error('Failed to fetch users');
  return await response.json();
};

export const fetchAdminOrders = async (token, page = 1, limit = 10, status = null) => {
  let url = `${API_BASE_URL}/admin/orders?page=${page}&limit=${limit}`;
  if (status) url += `&status=${status}`;
  
  const response = await fetch(url, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  if (!response.ok) throw new Error('Failed to fetch orders');
  return await response.json();
};
