import { apiGet, apiPost, apiPut, apiDelete } from './apiClient';
import { getEndpoint } from './config';

// Product Service - Handles product-related API calls
class ProductService {
  // Get all products
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

  // Get product by ID
  async getProductById(productId) {
    try {
      const response = await apiGet(`${getEndpoint('PRODUCTS.GET_BY_ID')}/${productId}`);
      return response;
    } catch (error) {
      console.error('Get product by ID failed:', error);
      throw error;
    }
  }

  // Search products
  async searchProducts(query, filters = {}) {
    try {
      const searchParams = { query, ...filters };
      const response = await apiPost(getEndpoint('PRODUCTS.SEARCH'), searchParams);
      return response;
    } catch (error) {
      console.error('Search products failed:', error);
      throw error;
    }
  }

  // Get products by category
  async getProductsByCategory(categoryId, params = {}) {
    try {
      const queryString = new URLSearchParams(params).toString();
      const url = queryString 
        ? `${getEndpoint('PRODUCTS.GET_BY_CATEGORY')}/${categoryId}?${queryString}`
        : `${getEndpoint('PRODUCTS.GET_BY_CATEGORY')}/${categoryId}`;
      const response = await apiGet(url);
      return response;
    } catch (error) {
      console.error('Get products by category failed:', error);
      throw error;
    }
  }

  // Get featured products
  async getFeaturedProducts() {
    try {
      const response = await apiGet('/products/featured');
      return response;
    } catch (error) {
      console.error('Get featured products failed:', error);
      throw error;
    }
  }

  // Get new arrivals
  async getNewArrivals() {
    try {
      const response = await apiGet('/products/new-arrivals');
      return response;
    } catch (error) {
      console.error('Get new arrivals failed:', error);
      throw error;
    }
  }

  // Get best sellers
  async getBestSellers() {
    try {
      const response = await apiGet('/products/best-sellers');
      return response;
    } catch (error) {
      console.error('Get best sellers failed:', error);
      throw error;
    }
  }

  // Get product reviews
  async getProductReviews(productId) {
    try {
      const response = await apiGet(`/products/${productId}/reviews`);
      return response;
    } catch (error) {
      console.error('Get product reviews failed:', error);
      throw error;
    }
  }

  // Add product review
  async addProductReview(productId, reviewData) {
    try {
      const response = await apiPost(`/products/${productId}/reviews`, reviewData);
      return response;
    } catch (error) {
      console.error('Add product review failed:', error);
      throw error;
    }
  }

  // Get product recommendations
  async getProductRecommendations(productId) {
    try {
      const response = await apiGet(`/products/${productId}/recommendations`);
      return response;
    } catch (error) {
      console.error('Get product recommendations failed:', error);
      throw error;
    }
  }

  // Get product variants
  async getProductVariants(productId) {
    try {
      const response = await apiGet(`/products/${productId}/variants`);
      return response;
    } catch (error) {
      console.error('Get product variants failed:', error);
      throw error;
    }
  }

  // Check product availability
  async checkProductAvailability(productId, variantId = null) {
    try {
      const params = variantId ? { variantId } : {};
      const response = await apiGet(`/products/${productId}/availability`, { params });
      return response;
    } catch (error) {
      console.error('Check product availability failed:', error);
      throw error;
    }
  }
}

const productService = new ProductService();
export default productService;
