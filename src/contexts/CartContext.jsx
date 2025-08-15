import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { cartService } from '../services';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { isAuthenticated } = useAuth();

  // Load cart on mount and when authentication changes
  useEffect(() => {
    if (isAuthenticated) {
      loadCart();
    } else {
      // Clear cart when user logs out
      setCart([]);
      setCartTotal(0);
    }
  }, [isAuthenticated]);

  // Load cart from API
  const loadCart = useCallback(async () => {
    if (!isAuthenticated) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const cartData = await cartService.getCart();
      setCart(cartData.items || []);
      setCartTotal(cartData.total || 0);
    } catch (err) {
      setError(err.message);
      console.error('Load cart failed:', err);
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  // Add item to cart
  const addToCart = useCallback(async (productId, quantity = 1, variantId = null) => {
    if (!isAuthenticated) {
      setError('Please login to add items to cart');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      await cartService.addToCart(productId, quantity, variantId);
      await loadCart(); // Reload cart after adding item
    } catch (err) {
      setError(err.message);
      console.error('Add to cart failed:', err);
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated, loadCart]);

  // Update cart item quantity
  const updateCartItem = useCallback(async (itemId, quantity) => {
    if (!isAuthenticated) return;
    
    setLoading(true);
    setError(null);
    
    try {
      await cartService.updateCartItem(itemId, quantity);
      await loadCart(); // Reload cart after updating
    } catch (err) {
      setError(err.message);
      console.error('Update cart item failed:', err);
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated, loadCart]);

  // Remove item from cart
  const removeFromCart = useCallback(async (itemId) => {
    if (!isAuthenticated) return;
    
    setLoading(true);
    setError(null);
    
    try {
      await cartService.removeFromCart(itemId);
      await loadCart(); // Reload cart after removing
    } catch (err) {
      setError(err.message);
      console.error('Remove from cart failed:', err);
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated, loadCart]);

  // Clear entire cart
  const clearCart = useCallback(async () => {
    if (!isAuthenticated) return;
    
    setLoading(true);
    setError(null);
    
    try {
      await cartService.clearCart();
      setCart([]);
      setCartTotal(0);
    } catch (err) {
      setError(err.message);
      console.error('Clear cart failed:', err);
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  // Get cart item count
  const getCartItemCount = useCallback(() => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  }, [cart]);

  // Check if cart is empty
  const isCartEmpty = useCallback(() => {
    return cart.length === 0;
  }, [cart]);

  // Get cart item by product ID
  const getCartItem = useCallback((productId) => {
    return cart.find(item => item.productId === productId);
  }, [cart]);

  // Check if product is in cart
  const isProductInCart = useCallback((productId) => {
    return cart.some(item => item.productId === productId);
  }, [cart]);

  // Get cart summary
  const getCartSummary = useCallback(() => {
    return {
      itemCount: getCartItemCount(),
      total: cartTotal,
      isEmpty: isCartEmpty(),
      items: cart
    };
  }, [cart, cartTotal, getCartItemCount, isCartEmpty]);

  const value = {
    cart,
    cartTotal,
    loading,
    error,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
    loadCart,
    getCartItemCount,
    isCartEmpty,
    getCartItem,
    isProductInCart,
    getCartSummary
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
