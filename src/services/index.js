// Import services
import apiClient, { apiGet, apiPost, apiPut, apiPatch, apiDelete, apiUpload, apiCall } from './apiClient';
import apiConfig, { buildUrl, getEndpoint } from './config';
import authService from './authService';

// Export main services
export { default as apiClient } from './apiClient';
export { apiGet, apiPost, apiPut, apiPatch, apiDelete, apiUpload, apiCall } from './apiClient';
export { default as apiConfig } from './config';
export { buildUrl, getEndpoint } from './config';
export { default as authService } from './authService';

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
