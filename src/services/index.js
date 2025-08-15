// Import services
import apiClient, { apiGet, apiPost, apiPut, apiPatch, apiDelete, apiUpload, apiCall } from './apiClient';
import apiConfig, { buildUrl, getEndpoint } from './config';
import authService from './authService';
import userService from './userService';
import productService from './productService';
import cartService from './cartService';
import orderService from './orderService';
import paymentService from './paymentService';
import adminService from './adminService';

// Export main services
export { default as apiClient } from './apiClient';
export { apiGet, apiPost, apiPut, apiPatch, apiDelete, apiUpload, apiCall } from './apiClient';
export { default as apiConfig } from './config';
export { buildUrl, getEndpoint } from './config';
export { default as authService } from './authService';
export { default as userService } from './userService';
export { default as productService } from './productService';
export { default as cartService } from './cartService';
export { default as orderService } from './orderService';
export { default as paymentService } from './paymentService';
export { default as adminService } from './adminService';

// Re-export commonly used auth functions
export const {
  login,
  register,
  logout,
  getProfile,
  updateProfile,
  changePassword,
  forgotPassword,
  resetPassword,
  verifyEmail,
  refreshToken,
  isAuthenticated,
  getCurrentUser,
  getAccessToken,
  getRefreshToken,
  clearAuthData,
  isTokenExpired,
  validateEmail,
  validatePassword,
  formatError
} = authService;
