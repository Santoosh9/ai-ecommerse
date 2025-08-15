import { apiGet, apiPost, apiPut, apiDelete } from './apiClient';
import { getEndpoint } from './config';

// Admin Service - Handles administrative operations
class AdminService {
  // ===== PRODUCT MANAGEMENT =====
  
  // Get all products (admin)
  async getAllProducts(params = {}) {
    try {
      const queryString = new URLSearchParams(params).toString();
      const url = queryString ? `${getEndpoint('PRODUCTS.GET_ALL')}?${queryString}` : getEndpoint('PRODUCTS.GET_ALL');
      const response = await apiGet(url);
      return response;
    } catch (error) {
      console.error('Get all products failed:', error);
      throw error;
    }
  }

  // Create new product
  async createProduct(productData) {
    try {
      const response = await apiPost(getEndpoint('PRODUCTS.CREATE'), productData);
      return response;
    } catch (error) {
      console.error('Create product failed:', error);
      throw error;
    }
  }

  // Update product
  async updateProduct(productId, productData) {
    try {
      const response = await apiPut(`${getEndpoint('PRODUCTS.UPDATE')}/${productId}`, productData);
      return response;
    } catch (error) {
      console.error('Update product failed:', error);
      throw error;
    }
  }

  // Delete product
  async deleteProduct(productId) {
    try {
      const response = await apiDelete(`${getEndpoint('PRODUCTS.DELETE')}/${productId}`);
      return response;
    } catch (error) {
      console.error('Delete product failed:', error);
      throw error;
    }
  }

  // Bulk update products
  async bulkUpdateProducts(updates) {
    try {
      const response = await apiPut('/admin/products/bulk-update', updates);
      return response;
    } catch (error) {
      console.error('Bulk update products failed:', error);
      throw error;
    }
  }

  // ===== CATEGORY MANAGEMENT =====
  
  // Get all categories
  async getAllCategories() {
    try {
      const response = await apiGet(getEndpoint('CATEGORIES.GET_ALL'));
      return response;
    } catch (error) {
      console.error('Get all categories failed:', error);
      throw error;
    }
  }

  // Create category
  async createCategory(categoryData) {
    try {
      const response = await apiPost(getEndpoint('CATEGORIES.CREATE'), categoryData);
      return response;
    } catch (error) {
      console.error('Create category failed:', error);
      throw error;
    }
  }

  // Update category
  async updateCategory(categoryId, categoryData) {
    try {
      const response = await apiPut(`${getEndpoint('CATEGORIES.UPDATE')}/${categoryId}`, categoryData);
      return response;
    } catch (error) {
      console.error('Update category failed:', error);
      throw error;
    }
  }

  // Delete category
  async deleteCategory(categoryId) {
    try {
      const response = await apiDelete(`${getEndpoint('CATEGORIES.DELETE')}/${categoryId}`);
      return response;
    } catch (error) {
      console.error('Delete category failed:', error);
      throw error;
    }
  }

  // ===== USER MANAGEMENT =====
  
  // Get all users
  async getAllUsers(params = {}) {
    try {
      const queryString = new URLSearchParams(params).toString();
      const url = queryString ? `${getEndpoint('USERS.GET_ALL')}?${queryString}` : getEndpoint('USERS.GET_ALL');
      const response = await apiGet(url);
      return response;
    } catch (error) {
      console.error('Get all users failed:', error);
      throw error;
    }
  }

  // Get user by ID
  async getUserById(userId) {
    try {
      const response = await apiGet(`${getEndpoint('USERS.GET_BY_ID')}/${userId}`);
      return response;
    } catch (error) {
      console.error('Get user by ID failed:', error);
      throw error;
    }
  }

  // Update user
  async updateUser(userId, userData) {
    try {
      const response = await apiPut(`${getEndpoint('USERS.UPDATE')}/${userId}`, userData);
      return response;
    } catch (error) {
      console.error('Update user failed:', error);
      throw error;
    }
  }

  // Delete user
  async deleteUser(userId) {
    try {
      const response = await apiDelete(`${getEndpoint('USERS.DELETE')}/${userId}`);
      return response;
    } catch (error) {
      console.error('Delete user failed:', error);
      throw error;
    }
  }

  // ===== ORDER MANAGEMENT =====
  
  // Get all orders
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

  // ===== ANALYTICS =====
  
  // Get dashboard analytics
  async getDashboardAnalytics() {
    try {
      const response = await apiGet('/admin/analytics/dashboard');
      return response;
    } catch (error) {
      console.error('Get dashboard analytics failed:', error);
      throw error;
    }
  }

  // Get sales analytics
  async getSalesAnalytics(params = {}) {
    try {
      const queryString = new URLSearchParams(params).toString();
      const url = queryString ? `/admin/analytics/sales?${queryString}` : '/admin/analytics/sales';
      const response = await apiGet(url);
      return response;
    } catch (error) {
      console.error('Get sales analytics failed:', error);
      throw error;
    }
  }

  // Get user analytics
  async getUserAnalytics(params = {}) {
    try {
      const queryString = new URLSearchParams(params).toString();
      const url = queryString ? `/admin/analytics/users?${queryString}` : '/admin/analytics/users';
      const response = await apiGet(url);
      return response;
    } catch (error) {
      console.error('Get user analytics failed:', error);
      throw error;
    }
  }

  // Get product analytics
  async getProductAnalytics(params = {}) {
    try {
      const queryString = new URLSearchParams(params).toString();
      const url = queryString ? `/admin/analytics/products?${queryString}` : '/admin/analytics/products';
      const response = await apiGet(url);
      return response;
    } catch (error) {
      console.error('Get product analytics failed:', error);
      throw error;
    }
  }

  // ===== SYSTEM MANAGEMENT =====
  
  // Get system status
  async getSystemStatus() {
    try {
      const response = await apiGet('/admin/system/status');
      return response;
    } catch (error) {
      console.error('Get system status failed:', error);
      throw error;
    }
  }

  // Get system logs
  async getSystemLogs(params = {}) {
    try {
      const queryString = new URLSearchParams(params).toString();
      const url = queryString ? `/admin/system/logs?${queryString}` : '/admin/system/logs';
      const response = await apiGet(url);
      return response;
    } catch (error) {
      console.error('Get system logs failed:', error);
      throw error;
    }
  }

  // Backup database
  async backupDatabase() {
    try {
      const response = await apiPost('/admin/system/backup');
      return response;
    } catch (error) {
      console.error('Backup database failed:', error);
      throw error;
    }
  }

  // ===== NOTIFICATIONS =====
  
  // Send notification to users
  async sendNotification(notificationData) {
    try {
      const response = await apiPost('/admin/notifications/send', notificationData);
      return response;
    } catch (error) {
      console.error('Send notification failed:', error);
      throw error;
    }
  }

  // Get notification history
  async getNotificationHistory(params = {}) {
    try {
      const queryString = new URLSearchParams(params).toString();
      const url = queryString ? `/admin/notifications/history?${queryString}` : '/admin/notifications/history';
      const response = await apiGet(url);
      return response;
    } catch (error) {
      console.error('Get notification history failed:', error);
      throw error;
    }
  }
}

const adminService = new AdminService();
export default adminService;
