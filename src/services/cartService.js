import { apiGet, apiPost, apiPut, apiDelete } from './apiClient';
import { getEndpoint } from './config';

// Cart Service - Handles shopping cart operations
class CartService {
  // Get cart items
  async getCart() {
    try {
      const response = await apiGet(getEndpoint('CART.GET'));
      return response;
    } catch (error) {
      console.error('Get cart failed:', error);
      throw error;
    }
  }

  // Add item to cart
  async addToCart(productId, quantity = 1, variantId = null) {
    try {
      const cartItem = {
        productId,
        quantity,
        ...(variantId && { variantId })
      };
      
      const response = await apiPost(getEndpoint('CART.ADD_ITEM'), cartItem);
      return response;
    } catch (error) {
      console.error('Add to cart failed:', error);
      throw error;
    }
  }

  // Update cart item quantity
  async updateCartItem(itemId, quantity) {
    try {
      const response = await apiPut(`${getEndpoint('CART.UPDATE_ITEM')}/${itemId}`, { quantity });
      return response;
    } catch (error) {
      console.error('Update cart item failed:', error);
      throw error;
    }
  }

  // Remove item from cart
  async removeFromCart(itemId) {
    try {
      const response = await apiDelete(`${getEndpoint('CART.REMOVE_ITEM')}/${itemId}`);
      return response;
    } catch (error) {
      console.error('Remove from cart failed:', error);
      throw error;
    }
  }

  // Clear entire cart
  async clearCart() {
    try {
      const response = await apiDelete(getEndpoint('CART.CLEAR'));
      return response;
    } catch (error) {
      console.error('Clear cart failed:', error);
      throw error;
    }
  }

  // Get cart total
  async getCartTotal() {
    try {
      const response = await apiGet('/cart/total');
      return response;
    } catch (error) {
      console.error('Get cart total failed:', error);
      throw error;
    }
  }

  // Apply discount code
  async applyDiscountCode(code) {
    try {
      const response = await apiPost('/cart/apply-discount', { code });
      return response;
    } catch (error) {
      console.error('Apply discount code failed:', error);
      throw error;
    }
  }

  // Remove discount code
  async removeDiscountCode() {
    try {
      const response = await apiDelete('/cart/remove-discount');
      return response;
    } catch (error) {
      console.error('Remove discount code failed:', error);
      throw error;
    }
  }

  // Save cart for later
  async saveCartForLater() {
    try {
      const response = await apiPost('/cart/save-for-later');
      return response;
    } catch (error) {
      console.error('Save cart for later failed:', error);
      throw error;
    }
  }

  // Get saved cart
  async getSavedCart() {
    try {
      const response = await apiGet('/cart/saved');
      return response;
    } catch (error) {
      console.error('Get saved cart failed:', error);
      throw error;
    }
  }

  // Move item to saved cart
  async moveToSavedCart(itemId) {
    try {
      const response = await apiPost(`/cart/move-to-saved/${itemId}`);
      return response;
    } catch (error) {
      console.error('Move to saved cart failed:', error);
      throw error;
    }
  }

  // Move item from saved to active cart
  async moveToActiveCart(itemId) {
    try {
      const response = await apiPost(`/cart/move-to-active/${itemId}`);
      return response;
    } catch (error) {
      console.error('Move to active cart failed:', error);
      throw error;
    }
  }

  // Get cart summary
  async getCartSummary() {
    try {
      const response = await apiGet('/cart/summary');
      return response;
    } catch (error) {
      console.error('Get cart summary failed:', error);
      throw error;
    }
  }

  // Validate cart items
  async validateCart() {
    try {
      const response = await apiGet('/cart/validate');
      return response;
    } catch (error) {
      console.error('Validate cart failed:', error);
      throw error;
    }
  }
}

const cartService = new CartService();
export default cartService;
