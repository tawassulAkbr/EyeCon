// src/context/CartContext.jsx
import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  // Add item to cart with optional prescription parameters
  const addToCart = (product, rxDetails = null) => {
    setCartItems((prevItems) => {
      // Check if item with same prescription configuration already exists
      const existingIndex = prevItems.findIndex(
        (item) => item.id === product.id && JSON.stringify(item.rxDetails) === JSON.stringify(rxDetails)
      );

      if (existingIndex > -1) {
        const newItems = [...prevItems];
        newItems[existingIndex].quantity += 1;
        return newItems;
      }

      return [...prevItems, { ...product, quantity: 1, rxDetails }];
    });
  };

  // Remove specific item configuration completely
  const removeFromCart = (id, rxDetails = null) => {
    setCartItems((prevItems) =>
      prevItems.filter(
        (item) => !(item.id === id && JSON.stringify(item.rxDetails) === JSON.stringify(rxDetails))
      )
    );
  };

  // Update item quantity safely
  const updateQuantity = (id, amount, rxDetails = null) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) => {
          if (item.id === id && JSON.stringify(item.rxDetails) === JSON.stringify(rxDetails)) {
            const nextQty = item.quantity + amount;
            return { ...item, quantity: nextQty };
          }
          return item;
        })
        .filter((item) => item.quantity > 0)
    );
  };

  // Clear entire cart structure
  const clearCart = () => setCartItems([]);

  // Parse string prices to numbers
  const parsePrice = (price) => {
    if (typeof price === 'number') return price;
    if (!price) return 0;
    return Number(price.replace(/[^0-9]/g, ""));
  };

  // Financial calculations
  const cartSubtotal = cartItems.reduce((acc, item) => acc + parsePrice(item.price) * item.quantity, 0);
  const totalItemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartSubtotal,
        totalItemsCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}