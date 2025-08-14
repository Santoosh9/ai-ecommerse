import axios from 'axios';
import { apiConfig, buildUrl } from './config';

// Create axios instance with default configuration
const apiClient = axios.create({
  baseURL: apiConfig.BASE_URL,
  timeout: apiConfig.TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Request interceptor for adding auth token
apiClient.interceptors.request.use(
  (config) => {
    // Get token from localStorage
    const token = localStorage.getItem('accessToken');
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Add request timestamp for debugging
    config.metadata = { startTime: new Date() };
    
    console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`);
    
    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for handling responses and errors
apiClient.interceptors.response.use(
  (response) => {
    // Calculate request duration
    const endTime = new Date();
    const duration = endTime - response.config.metadata.startTime;
    
    console.log(`✅ API Response: ${response.config.method?.toUpperCase()} ${response.config.url} (${duration}ms)`);
    
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    
    // Calculate request duration for failed requests
    if (originalRequest.metadata) {
      const endTime = new Date();
      const duration = endTime - originalRequest.metadata.startTime;
      console.log(`❌ API Error: ${originalRequest.method?.toUpperCase()} ${originalRequest.url} (${duration}ms)`);
    }
    
    // Handle 401 Unauthorized errors
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // Try to refresh the token
        const refreshToken = localStorage.getItem('refreshToken');
        
        if (refreshToken) {
          const response = await axios.post(buildUrl('/auth/refresh-token'), {
            refreshToken: refreshToken
          });
          
          const { accessToken, refreshToken: newRefreshToken } = response.data;
          
          // Update tokens in localStorage
          localStorage.setItem('accessToken', accessToken);
          localStorage.setItem('refreshToken', newRefreshToken);
          
          // Retry the original request with new token
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return apiClient(originalRequest);
        }
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);
        
        // Clear tokens and redirect to login
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        
        // Redirect to login page
        window.location.href = '/';
        return Promise.reject(refreshError);
      }
    }
    
    // Handle other errors
    if (error.response) {
      // Server responded with error status
      console.error('Server Error:', {
        status: error.response.status,
        statusText: error.response.statusText,
        data: error.response.data,
        url: error.config.url
      });
      
      // Handle specific error cases
      switch (error.response.status) {
        case 400:
          console.error('Bad Request:', error.response.data);
          break;
        case 403:
          console.error('Forbidden: Access denied');
          break;
        case 404:
          console.error('Not Found:', error.config.url);
          break;
        case 422:
          console.error('Validation Error:', error.response.data);
          break;
        case 500:
          console.error('Internal Server Error');
          break;
        default:
          console.error('Unknown Error:', error.response.status);
      }
    } else if (error.request) {
      // Request was made but no response received
      console.error('Network Error: No response received');
    } else {
      // Something else happened
      console.error('Request Setup Error:', error.message);
    }
    
    return Promise.reject(error);
  }
);

// Helper function for making API calls with retry logic
export const apiCall = async (config, retryCount = 0) => {
  try {
    const response = await apiClient(config);
    return response.data;
  } catch (error) {
    // Retry logic for network errors
    if (retryCount < apiConfig.RETRY.MAX_ATTEMPTS && 
        (!error.response || error.response.status >= 500)) {
      console.log(`Retrying request (${retryCount + 1}/${apiConfig.RETRY.MAX_ATTEMPTS})...`);
      
      await new Promise(resolve => setTimeout(resolve, apiConfig.RETRY.DELAY * (retryCount + 1)));
      return apiCall(config, retryCount + 1);
    }
    
    throw error;
  }
};

// Helper functions for common HTTP methods
export const apiGet = (url, config = {}) => {
  return apiCall({ method: 'GET', url, ...config });
};

export const apiPost = (url, data = {}, config = {}) => {
  return apiCall({ method: 'POST', url, data, ...config });
};

export const apiPut = (url, data = {}, config = {}) => {
  return apiCall({ method: 'PUT', url, data, ...config });
};

export const apiPatch = (url, data = {}, config = {}) => {
  return apiCall({ method: 'PATCH', url, data, ...config });
};

export const apiDelete = (url, config = {}) => {
  return apiCall({ method: 'DELETE', url, ...config });
};

// File upload helper
export const apiUpload = (url, file, config = {}) => {
  const formData = new FormData();
  formData.append('file', file);
  
  return apiCall({
    method: 'POST',
    url,
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    ...config
  });
};

export default apiClient;
