import { apiPost, apiGet, apiPut, apiPatch } from './apiClient';
import { getEndpoint, buildUrl } from './config';

// Authentication Service
class AuthService {
  // Login user
  async login(credentials) {
    try {
      const response = await apiPost(getEndpoint('AUTH.LOGIN'), credentials);
      
      // Store tokens in localStorage
      if (response.accessToken) {
        localStorage.setItem('accessToken', response.accessToken);
        localStorage.setItem('refreshToken', response.refreshToken);
        localStorage.setItem('user', JSON.stringify(response.user));
      }
      
      return response;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  }

  // Register new user
  async register(userData) {
    try {
      const response = await apiPost(getEndpoint('AUTH.REGISTER'), userData);
      
      // If registration includes auto-login, store tokens
      if (response.accessToken) {
        localStorage.setItem('accessToken', response.accessToken);
        localStorage.setItem('refreshToken', response.refreshToken);
        localStorage.setItem('user', JSON.stringify(response.user));
      }
      
      return response;
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  }

  // Logout user
  async logout() {
    try {
      // Call logout endpoint to invalidate token on server
      await apiPost(getEndpoint('AUTH.LOGOUT'));
    } catch (error) {
      console.error('Logout API call failed:', error);
    } finally {
      // Clear local storage regardless of API call success
      this.clearAuthData();
    }
  }

  // Get current user profile
  async getProfile() {
    try {
      const response = await apiGet(getEndpoint('AUTH.PROFILE'));
      
      // Update user data in localStorage
      localStorage.setItem('user', JSON.stringify(response));
      
      return response;
    } catch (error) {
      console.error('Get profile failed:', error);
      throw error;
    }
  }

  // Update user profile
  async updateProfile(profileData) {
    try {
      const response = await apiPut(getEndpoint('AUTH.UPDATE_PROFILE'), profileData);
      
      // Update user data in localStorage
      localStorage.setItem('user', JSON.stringify(response));
      
      return response;
    } catch (error) {
      console.error('Update profile failed:', error);
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

  // Forgot password
  async forgotPassword(email) {
    try {
      const response = await apiPost(getEndpoint('AUTH.FORGOT_PASSWORD'), { email });
      return response;
    } catch (error) {
      console.error('Forgot password failed:', error);
      throw error;
    }
  }

  // Reset password
  async resetPassword(resetData) {
    try {
      const response = await apiPost(getEndpoint('AUTH.RESET_PASSWORD'), resetData);
      return response;
    } catch (error) {
      console.error('Reset password failed:', error);
      throw error;
    }
  }

  // Verify email
  async verifyEmail(token) {
    try {
      const response = await apiPost(getEndpoint('AUTH.VERIFY_EMAIL'), { token });
      return response;
    } catch (error) {
      console.error('Email verification failed:', error);
      throw error;
    }
  }

  // Refresh token
  async refreshToken() {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }
      
      const response = await apiPost(getEndpoint('AUTH.REFRESH_TOKEN'), {
        refreshToken: refreshToken
      });
      
      // Update tokens in localStorage
      localStorage.setItem('accessToken', response.accessToken);
      localStorage.setItem('refreshToken', response.refreshToken);
      
      return response;
    } catch (error) {
      console.error('Token refresh failed:', error);
      this.clearAuthData();
      throw error;
    }
  }

  // Check if user is authenticated
  isAuthenticated() {
    const token = localStorage.getItem('accessToken');
    const user = localStorage.getItem('user');
    
    if (!token || !user) {
      return false;
    }
    
    // Check if token is expired (optional - you can add JWT decode here)
    try {
      const userData = JSON.parse(user);
      return !!userData;
    } catch (error) {
      console.error('Error parsing user data:', error);
      return false;
    }
  }

  // Get current user data
  getCurrentUser() {
    try {
      const user = localStorage.getItem('user');
      return user ? JSON.parse(user) : null;
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  }

  // Get access token
  getAccessToken() {
    return localStorage.getItem('accessToken');
  }

  // Get refresh token
  getRefreshToken() {
    return localStorage.getItem('refreshToken');
  }

  // Clear all authentication data
  clearAuthData() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
  }

  // Check if token is expired (basic implementation)
  isTokenExpired() {
    const token = this.getAccessToken();
    
    if (!token) {
      return true;
    }
    
    try {
      // Decode JWT token (basic implementation)
      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Date.now() / 1000;
      
      return payload.exp < currentTime;
    } catch (error) {
      console.error('Error checking token expiration:', error);
      return true;
    }
  }

  // Validate email format
  validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Validate password strength
  validatePassword(password) {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    return {
      isValid: password.length >= minLength && hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar,
      errors: {
        length: password.length < minLength ? `Password must be at least ${minLength} characters` : null,
        uppercase: !hasUpperCase ? 'Password must contain at least one uppercase letter' : null,
        lowercase: !hasLowerCase ? 'Password must contain at least one lowercase letter' : null,
        numbers: !hasNumbers ? 'Password must contain at least one number' : null,
        specialChar: !hasSpecialChar ? 'Password must contain at least one special character' : null
      }
    };
  }

  // Format API errors for display
  formatError(error) {
    if (error.response?.data?.errors) {
      // Validation errors
      return Object.values(error.response.data.errors).flat();
    } else if (error.response?.data?.message) {
      // Single error message
      return [error.response.data.message];
    } else if (error.message) {
      // Network or other errors
      return [error.message];
    } else {
      return ['An unexpected error occurred'];
    }
  }
}

// Create and export a single instance
const authService = new AuthService();
export default authService;
