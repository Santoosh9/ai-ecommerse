import { apiGet, apiPut, apiPatch, apiPost } from './apiClient';
import { getEndpoint } from './config';

// User Service - Handles user-specific operations beyond authentication
class UserService {
  // Get user profile
  async getProfile() {
    try {
      const response = await apiGet(getEndpoint('USERS.GET_BY_ID'));
      return response;
    } catch (error) {
      console.error('Get profile failed:', error);
      throw error;
    }
  }

  // Update user profile
  async updateProfile(profileData) {
    try {
      const response = await apiPut(getEndpoint('USERS.UPDATE'), profileData);
      return response;
    } catch (error) {
      console.error('Update profile failed:', error);
      throw error;
    }
  }

  // Update user avatar
  async uploadAvatar(file) {
    try {
      const formData = new FormData();
      formData.append('avatar', file);
      
      const response = await apiPost(getEndpoint('USERS.UPLOAD_AVATAR'), formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response;
    } catch (error) {
      console.error('Upload avatar failed:', error);
      throw error;
    }
  }

  // Get user orders
  async getUserOrders() {
    try {
      const response = await apiGet(getEndpoint('ORDERS.GET_USER_ORDERS'));
      return response;
    } catch (error) {
      console.error('Get user orders failed:', error);
      throw error;
    }
  }

  // Get user order by ID
  async getUserOrder(orderId) {
    try {
      const response = await apiGet(`${getEndpoint('ORDERS.GET_BY_ID')}/${orderId}`);
      return response;
    } catch (error) {
      console.error('Get user order failed:', error);
      throw error;
    }
  }

  // Change password
  async changePassword(passwordData) {
    try {
      const response = await apiPost(getEndpoint('AUTH.CHANGE_PASSWORD'), passwordData);
      return response;
    } catch (error) {
      console.error('Change password failed:', error);
      throw error;
    }
  }

  // Delete user account
  async deleteAccount() {
    try {
      const response = await apiDelete(getEndpoint('USERS.DELETE'));
      return response;
    } catch (error) {
      console.error('Delete account failed:', error);
      throw error;
    }
  }

  // Get user preferences
  async getPreferences() {
    try {
      const response = await apiGet('/user/preferences');
      return response;
    } catch (error) {
      console.error('Get preferences failed:', error);
      throw error;
    }
  }

  // Update user preferences
  async updatePreferences(preferences) {
    try {
      const response = await apiPut('/user/preferences', preferences);
      return response;
    } catch (error) {
      console.error('Update preferences failed:', error);
      throw error;
    }
  }
}

const userService = new UserService();
export default userService;
