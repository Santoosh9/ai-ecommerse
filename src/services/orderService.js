import { apiGet, apiPost, apiPut, apiDelete } from './apiClient';
import { getEndpoint } from './config';

// Order Service - Handles order-related operations
class OrderService {
  // Create new order (checkout)
  async createOrder(orderData) {
    try {
      const response = await apiPost(getEndpoint('ORDERS.CREATE'), orderData);
      return response;
    } catch (error) {
      console.error('Create order failed:', error);
      throw error;
    }
  }

  // Get all orders (admin)
  async getAllOrders(params = {}) {
    try {
      const queryString = new URLSearchParams(params).toString();
      const url = queryString ? `${getEndpoint('ORDERS.GET_ALL')}?${queryString}` : getEndpoint('ORDERS.GET_ALL');
      const response = await apiGet(url);
      return response;
    } catch (error) {
      console.error('Get all orders failed:', error);
      throw error;
    }
  }

  // Get order by ID
  async getOrderById(orderId) {
    try {
      const response = await apiGet(`${getEndpoint('ORDERS.GET_BY_ID')}/${orderId}`);
      return response;
    } catch (error) {
      console.error('Get order by ID failed:', error);
      throw error;
    }
  }

  // Get user orders
  async getUserOrders(params = {}) {
    try {
      const queryString = new URLSearchParams(params).toString();
      const url = queryString ? `${getEndpoint('ORDERS.GET_USER_ORDERS')}?${queryString}` : getEndpoint('ORDERS.GET_USER_ORDERS');
      const response = await apiGet(url);
      return response;
    } catch (error) {
      console.error('Get user orders failed:', error);
      throw error;
    }
  }

  // Update order status
  async updateOrderStatus(orderId, status) {
    try {
      const response = await apiPut(`${getEndpoint('ORDERS.UPDATE')}/${orderId}`, { status });
      return response;
    } catch (error) {
      console.error('Update order status failed:', error);
      throw error;
    }
  }

  // Cancel order
  async cancelOrder(orderId, reason = '') {
    try {
      const response = await apiPost(`${getEndpoint('ORDERS.UPDATE')}/${orderId}/cancel`, { reason });
      return response;
    } catch (error) {
      console.error('Cancel order failed:', error);
      throw error;
    }
  }

  // Track order
  async trackOrder(orderId) {
    try {
      const response = await apiGet(`${getEndpoint('ORDERS.TRACK_ORDER')}/${orderId}`);
      return response;
    } catch (error) {
      console.error('Track order failed:', error);
      throw error;
    }
  }

  // Get order history
  async getOrderHistory(params = {}) {
    try {
      const queryString = new URLSearchParams(params).toString();
      const url = queryString ? `/orders/history?${queryString}` : '/orders/history';
      const response = await apiGet(url);
      return response;
    } catch (error) {
      console.error('Get order history failed:', error);
      throw error;
    }
  }

  // Get order analytics
  async getOrderAnalytics(params = {}) {
    try {
      const queryString = new URLSearchParams(params).toString();
      const url = queryString ? `/orders/analytics?${queryString}` : '/orders/analytics';
      const response = await apiGet(url);
      return response;
    } catch (error) {
      console.error('Get order analytics failed:', error);
      throw error;
    }
  }

  // Request order refund
  async requestRefund(orderId, refundData) {
    try {
      const response = await apiPost(`/orders/${orderId}/refund`, refundData);
      return response;
    } catch (error) {
      console.error('Request refund failed:', error);
      throw error;
    }
  }

  // Get refund status
  async getRefundStatus(orderId) {
    try {
      const response = await apiGet(`/orders/${orderId}/refund-status`);
      return response;
    } catch (error) {
      console.error('Get refund status failed:', error);
      throw error;
    }
  }

  // Download order invoice
  async downloadInvoice(orderId) {
    try {
      const response = await apiGet(`/orders/${orderId}/invoice`, {
        responseType: 'blob'
      });
      return response;
    } catch (error) {
      console.error('Download invoice failed:', error);
      throw error;
    }
  }

  // Reorder items
  async reorder(orderId) {
    try {
      const response = await apiPost(`/orders/${orderId}/reorder`);
      return response;
    } catch (error) {
      console.error('Reorder failed:', error);
      throw error;
    }
  }

  // Get order notifications
  async getOrderNotifications() {
    try {
      const response = await apiGet('/orders/notifications');
      return response;
    } catch (error) {
      console.error('Get order notifications failed:', error);
      throw error;
    }
  }

  // Mark notification as read
  async markNotificationAsRead(notificationId) {
    try {
      const response = await apiPut(`/orders/notifications/${notificationId}/read`);
      return response;
    } catch (error) {
      console.error('Mark notification as read failed:', error);
      throw error;
    }
  }
}

const orderService = new OrderService();
export default orderService;
