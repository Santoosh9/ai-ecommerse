import { useState, useEffect, useCallback } from 'react';
import { productService } from '../services';

// Custom hook for product operations
export const useProducts = (initialFilters = {}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState(initialFilters);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 12,
    total: 0,
    totalPages: 0
  });

  // Load products on mount and when filters change
  useEffect(() => {
    loadProducts();
  }, [filters, pagination.page]);

  // Load products from API
  const loadProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const params = {
        ...filters,
        page: pagination.page,
        limit: pagination.limit
      };
      
      const response = await productService.getAllProducts(params);
      setProducts(response.products || response.data || response);
      
      // Update pagination if response includes pagination info
      if (response.pagination) {
        setPagination(prev => ({
          ...prev,
          total: response.pagination.total,
          totalPages: response.pagination.totalPages
        }));
      }
    } catch (err) {
      setError(err.message);
      console.error('Load products failed:', err);
    } finally {
      setLoading(false);
    }
  }, [filters, pagination.page, pagination.limit]);

  // Search products
  const searchProducts = useCallback(async (query, searchFilters = {}) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await productService.searchProducts(query, searchFilters);
      setProducts(response.products || response.data || response);
    } catch (err) {
      setError(err.message);
      console.error('Search products failed:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Get products by category
  const getProductsByCategory = useCallback(async (categoryId, categoryFilters = {}) => {
    setLoading(true);
    setError(null);
    
    try {
      const params = {
        ...categoryFilters,
        page: pagination.page,
        limit: pagination.limit
      };
      
      const response = await productService.getProductsByCategory(categoryId, params);
      setProducts(response.products || response.data || response);
    } catch (err) {
      setError(err.message);
      console.error('Get products by category failed:', err);
    } finally {
      setLoading(false);
    }
  }, [pagination.page, pagination.limit]);

  // Get featured products
  const getFeaturedProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await productService.getFeaturedProducts();
      setProducts(response.products || response.data || response);
    } catch (err) {
      setError(err.message);
      console.error('Get featured products failed:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Get new arrivals
  const getNewArrivals = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await productService.getNewArrivals();
      setProducts(response.products || response.data || response);
    } catch (err) {
      setError(err.message);
      console.error('Get new arrivals failed:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Get best sellers
  const getBestSellers = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await productService.getBestSellers();
      setProducts(response.products || response.data || response);
    } catch (err) {
      setError(err.message);
      console.error('Get best sellers failed:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Update filters
  const updateFilters = useCallback((newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
    setPagination(prev => ({ ...prev, page: 1 })); // Reset to first page
  }, []);

  // Clear filters
  const clearFilters = useCallback(() => {
    setFilters(initialFilters);
    setPagination(prev => ({ ...prev, page: 1 }));
  }, [initialFilters]);

  // Go to next page
  const nextPage = useCallback(() => {
    if (pagination.page < pagination.totalPages) {
      setPagination(prev => ({ ...prev, page: prev.page + 1 }));
    }
  }, [pagination.page, pagination.totalPages]);

  // Go to previous page
  const prevPage = useCallback(() => {
    if (pagination.page > 1) {
      setPagination(prev => ({ ...prev, page: prev.page - 1 }));
    }
  }, [pagination.page]);

  // Go to specific page
  const goToPage = useCallback((page) => {
    if (page >= 1 && page <= pagination.totalPages) {
      setPagination(prev => ({ ...prev, page }));
    }
  }, [pagination.totalPages]);

  return {
    products,
    loading,
    error,
    filters,
    pagination,
    loadProducts,
    searchProducts,
    getProductsByCategory,
    getFeaturedProducts,
    getNewArrivals,
    getBestSellers,
    updateFilters,
    clearFilters,
    nextPage,
    prevPage,
    goToPage
  };
};

export default useProducts;
