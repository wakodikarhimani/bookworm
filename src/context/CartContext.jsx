import React, { createContext, useContext, useState, useEffect } from "react";
import { ALL_BOOKS } from "../data/booksData";

const CartContext = createContext();

export function CartProvider({ children }) {
  // Default cart matching the screenshots: "Joy of Minimalism" and "The Path to Success"
  const [cartItems, setCartItems] = useState([
    {
      book: ALL_BOOKS.find((b) => b.id === 7) || ALL_BOOKS[6], // Joy of Minimalism
      quantity: 1,
    },
    {
      book: ALL_BOOKS.find((b) => b.id === 3) || ALL_BOOKS[2], // The Path to Success
      quantity: 1,
    },
  ]);

  const [wishlist, setWishlist] = useState([]);
  const [lastPurchasedItems, setLastPurchasedItems] = useState([]);
  const [coupon, setCoupon] = useState("");
  const [discountAmount, setDiscountAmount] = useState(100); // matching screenshot

  const addToCart = (book, quantity = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.book.id === book.id);
      if (existing) {
        return prev.map((item) =>
          item.book.id === book.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { book, quantity }];
    });
  };

  const updateQuantity = (bookId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(bookId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.book.id === bookId ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (bookId) => {
    setCartItems((prev) => prev.filter((item) => item.book.id !== bookId));
  };

  const toggleWishlist = (bookId) => {
    setWishlist((prev) =>
      prev.includes(bookId)
        ? prev.filter((id) => id !== bookId)
        : [...prev, bookId]
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const completeOrder = (customItems = null) => {
    const itemsToRecord = customItems || (cartItems.length > 0 ? cartItems : [
      { book: ALL_BOOKS[6], quantity: 1 },
      { book: ALL_BOOKS[2], quantity: 1 }
    ]);
    setLastPurchasedItems(itemsToRecord);
    clearCart();
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const itemsSubtotal = cartItems.reduce(
    (sum, item) => sum + item.book.price * item.quantity,
    0
  );
  const tax = itemsSubtotal > 0 ? 62 : 0;
  const deliveryCharges = 0;
  const discount = itemsSubtotal > 0 ? discountAmount : 0;
  const totalAmount = Math.max(0, itemsSubtotal + tax + deliveryCharges - discount);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        itemsSubtotal,
        tax,
        deliveryCharges,
        discount,
        totalAmount,
        coupon,
        setCoupon,
        setDiscountAmount,
        addToCart,
        updateQuantity,
        removeFromCart,
        wishlist,
        toggleWishlist,
        completeOrder,
        lastPurchasedItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
