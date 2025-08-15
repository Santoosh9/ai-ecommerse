import { useState, useEffect, useCallback } from 'react';
import { cartService } from '../services';

// Custom hook for cart operations
export const useCart = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [cartTotal, setCartTotal] = useState(0);

  // Load cart on mount
  useEffect(() => {
    loadCart();
  }, []);

  // Load cart from API
  const loadCart = useCallback(async () => {
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
  }, []);

  // Add item to cart
  const addToCart = useCallback(async (productId, quantity = 1, variantId = null) => {
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
  }, [loadCart]);

  // Update cart item quantity
  const updateCartItem = useCallback(async (itemId, quantity) => {
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
  }, [loadCart]);

  // Remove item from cart
  const removeFromCart = useCallback(async (itemId) => {
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
  }, [loadCart]);

  // Clear entire cart
  const clearCart = useCallback(async () => {
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
  }, []);

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

  return {
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
    getCartItem
  };
};

export default useCart;
