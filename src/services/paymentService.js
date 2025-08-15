import { apiGet, apiPost, apiPut } from './apiClient';

// Payment Service - Handles payment processing
class PaymentService {
  // Create payment intent
  async createPaymentIntent(amount, currency = 'GBP', metadata = {}) {
    try {
      const response = await apiPost('/payment/create-intent', {
        amount,
        currency,
        metadata
      });
      return response;
    } catch (error) {
      console.error('Create payment intent failed:', error);
      throw error;
    }
  }

  // Confirm payment
  async confirmPayment(paymentIntentId, paymentMethodId) {
    try {
      const response = await apiPost('/payment/confirm', {
        paymentIntentId,
        paymentMethodId
      });
      return response;
    } catch (error) {
      console.error('Confirm payment failed:', error);
      throw error;
    }
  }

  // Process payment
  async processPayment(paymentData) {
    try {
      const response = await apiPost('/payment/process', paymentData);
      return response;
    } catch (error) {
      console.error('Process payment failed:', error);
      throw error;
    }
  }

  // Get payment methods
  async getPaymentMethods() {
    try {
      const response = await apiGet('/payment/methods');
      return response;
    } catch (error) {
      console.error('Get payment methods failed:', error);
      throw error;
    }
  }

  // Add payment method
  async addPaymentMethod(paymentMethodData) {
    try {
      const response = await apiPost('/payment/methods', paymentMethodData);
      return response;
    } catch (error) {
      console.error('Add payment method failed:', error);
      throw error;
    }
  }

  // Remove payment method
  async removePaymentMethod(paymentMethodId) {
    try {
      const response = await apiDelete(`/payment/methods/${paymentMethodId}`);
      return response;
    } catch (error) {
      console.error('Remove payment method failed:', error);
      throw error;
    }
  }

  // Set default payment method
  async setDefaultPaymentMethod(paymentMethodId) {
    try {
      const response = await apiPut(`/payment/methods/${paymentMethodId}/default`);
      return response;
    } catch (error) {
      console.error('Set default payment method failed:', error);
      throw error;
    }
  }

  // Get payment history
  async getPaymentHistory(params = {}) {
    try {
      const queryString = new URLSearchParams(params).toString();
      const url = queryString ? `/payment/history?${queryString}` : '/payment/history';
      const response = await apiGet(url);
      return response;
    } catch (error) {
      console.error('Get payment history failed:', error);
      throw error;
    }
  }

  // Get payment by ID
  async getPaymentById(paymentId) {
    try {
      const response = await apiGet(`/payment/${paymentId}`);
      return response;
    } catch (error) {
      console.error('Get payment by ID failed:', error);
      throw error;
    }
  }

  // Request refund
  async requestRefund(paymentId, amount, reason = '') {
    try {
      const response = await apiPost(`/payment/${paymentId}/refund`, {
        amount,
        reason
      });
      return response;
    } catch (error) {
      console.error('Request refund failed:', error);
      throw error;
    }
  }

  // Get refund status
  async getRefundStatus(paymentId) {
    try {
      const response = await apiGet(`/payment/${paymentId}/refund-status`);
      return response;
    } catch (error) {
      console.error('Get refund status failed:', error);
      throw error;
    }
  }

  // Validate payment method
  async validatePaymentMethod(paymentMethodData) {
    try {
      const response = await apiPost('/payment/validate-method', paymentMethodData);
      return response;
    } catch (error) {
      console.error('Validate payment method failed:', error);
      throw error;
    }
  }

  // Get payment analytics
  async getPaymentAnalytics(params = {}) {
    try {
      const queryString = new URLSearchParams(params).toString();
      const url = queryString ? `/payment/analytics?${queryString}` : '/payment/analytics';
      const response = await apiGet(url);
      return response;
    } catch (error) {
      console.error('Get payment analytics failed:', error);
      throw error;
    }
  }

  // Setup recurring payment
  async setupRecurringPayment(recurringPaymentData) {
    try {
      const response = await apiPost('/payment/recurring/setup', recurringPaymentData);
      return response;
    } catch (error) {
      console.error('Setup recurring payment failed:', error);
      throw error;
    }
  }

  // Cancel recurring payment
  async cancelRecurringPayment(subscriptionId) {
    try {
      const response = await apiPost(`/payment/recurring/${subscriptionId}/cancel`);
      return response;
    } catch (error) {
      console.error('Cancel recurring payment failed:', error);
      throw error;
    }
  }

  // Get subscription details
  async getSubscriptionDetails(subscriptionId) {
    try {
      const response = await apiGet(`/payment/recurring/${subscriptionId}`);
      return response;
    } catch (error) {
      console.error('Get subscription details failed:', error);
      throw error;
    }
  }

  // Update subscription
  async updateSubscription(subscriptionId, updateData) {
    try {
      const response = await apiPut(`/payment/recurring/${subscriptionId}`, updateData);
      return response;
    } catch (error) {
      console.error('Update subscription failed:', error);
      throw error;
    }
  }
}

const paymentService = new PaymentService();
export default paymentService;
