// API Configuration
const API_CONFIG = {
  // Base URL for API calls
  BASE_URL: 'https://localhost:7001/api', // Default .NET port
  
  // API Endpoints
  ENDPOINTS: {
    // Authentication
    AUTH: {
      LOGIN: '/auth/login',
      REGISTER: '/auth/register',
      LOGOUT: '/auth/logout',
      REFRESH_TOKEN: '/auth/refresh-token',
      FORGOT_PASSWORD: '/auth/forgot-password',
      RESET_PASSWORD: '/auth/reset-password',
      VERIFY_EMAIL: '/auth/verify-email',
      CHANGE_PASSWORD: '/auth/change-password',
      PROFILE: '/auth/profile',
      UPDATE_PROFILE: '/auth/update-profile'
    },
    
    // User Management
    USERS: {
      GET_ALL: '/users',
      GET_BY_ID: '/users',
      CREATE: '/users',
      UPDATE: '/users',
      DELETE: '/users',
      UPLOAD_AVATAR: '/users/avatar'
    },
    
    // Products
    PRODUCTS: {
      GET_ALL: '/products',
      GET_BY_ID: '/products',
      CREATE: '/products',
      UPDATE: '/products',
      DELETE: '/products',
      GET_BY_CATEGORY: '/products/category',
      SEARCH: '/products/search'
    },
    
    // Categories
    CATEGORIES: {
      GET_ALL: '/categories',
      GET_BY_ID: '/categories',
      CREATE: '/categories',
      UPDATE: '/categories',
      DELETE: '/categories'
    },
    
    // Orders
    ORDERS: {
      GET_ALL: '/orders',
      GET_BY_ID: '/orders',
      CREATE: '/orders',
      UPDATE: '/orders',
      DELETE: '/orders',
      GET_USER_ORDERS: '/orders/user',
      TRACK_ORDER: '/orders/track'
    },
    
    // Cart
    CART: {
      GET: '/cart',
      ADD_ITEM: '/cart/add',
      UPDATE_ITEM: '/cart/update',
      REMOVE_ITEM: '/cart/remove',
      CLEAR: '/cart/clear'
    },
    
    // Local Products
    LOCAL_PRODUCTS: {
      GET_ALL: '/local-products',
      GET_BY_ID: '/local-products',
      CREATE: '/local-products',
      UPDATE: '/local-products',
      DELETE: '/local-products',
      GET_BY_LOCATION: '/local-products/location'
    }
  },
  
  // HTTP Status Codes
  STATUS_CODES: {
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    UNPROCESSABLE_ENTITY: 422,
    INTERNAL_SERVER_ERROR: 500
  },
  
  // Request Timeout (in milliseconds)
  TIMEOUT: 10000,
  
  // Retry Configuration
  RETRY: {
    MAX_ATTEMPTS: 3,
    DELAY: 1000
  }
};

// Environment-specific configuration
const getApiConfig = () => {
  // Use import.meta.env for Vite instead of process.env
  const environment = import.meta.env?.MODE || 'development';
  const apiUrl = import.meta.env?.VITE_API_URL;
  
  switch (environment) {
    case 'production':
      return {
        ...API_CONFIG,
        BASE_URL: apiUrl || 'https://api.smartlocal.com/api'
      };
    case 'staging':
      return {
        ...API_CONFIG,
        BASE_URL: apiUrl || 'https://staging-api.smartlocal.com/api'
      };
    case 'development':
    default:
      return {
        ...API_CONFIG,
        BASE_URL: apiUrl || 'https://localhost:7001/api'
      };
  }
};

export const apiConfig = getApiConfig();

// Helper function to build full URL
export const buildUrl = (endpoint) => {
  return `${apiConfig.BASE_URL}${endpoint}`;
};

// Helper function to get endpoint
export const getEndpoint = (path) => {
  const keys = path.split('.');
  let endpoint = apiConfig.ENDPOINTS;
  
  for (const key of keys) {
    if (endpoint[key]) {
      endpoint = endpoint[key];
    } else {
      throw new Error(`Endpoint not found: ${path}`);
    }
  }
  
  return endpoint;
};

export default apiConfig;
