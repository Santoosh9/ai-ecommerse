import { useState, useEffect, useCallback } from 'react';
import { orderService } from '../services';

// Custom hook for order operations
export const useOrders = (initialFilters = {}) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState(initialFilters);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0
  });

  // Load orders on mount and when filters change
  useEffect(() => {
    loadOrders();
  }, [filters, pagination.page]);

  // Load user orders from API
  const loadOrders = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const params = {
        ...filters,
        page: pagination.page,
        limit: pagination.limit
      };
      
      const response = await orderService.getUserOrders(params);
      setOrders(response.orders || response.data || response);
      
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
      console.error('Load orders failed:', err);
    } finally {
      setLoading(false);
    }
  }, [filters, pagination.page, pagination.limit]);

  // Create new order
  const createOrder = useCallback(async (orderData) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await orderService.createOrder(orderData);
      await loadOrders(); // Reload orders after creating
      return response;
    } catch (err) {
      setError(err.message);
      console.error('Create order failed:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [loadOrders]);

  // Get order by ID
  const getOrderById = useCallback(async (orderId) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await orderService.getOrderById(orderId);
      return response;
    } catch (err) {
      setError(err.message);
      console.error('Get order by ID failed:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Cancel order
  const cancelOrder = useCallback(async (orderId, reason = '') => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await orderService.cancelOrder(orderId, reason);
      await loadOrders(); // Reload orders after cancelling
      return response;
    } catch (err) {
      setError(err.message);
      console.error('Cancel order failed:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [loadOrders]);

  // Track order
  const trackOrder = useCallback(async (orderId) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await orderService.trackOrder(orderId);
      return response;
    } catch (err) {
      setError(err.message);
      console.error('Track order failed:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Get order history
  const getOrderHistory = useCallback(async (historyFilters = {}) => {
    setLoading(true);
    setError(null);
    
    try {
      const params = {
        ...historyFilters,
        page: pagination.page,
        limit: pagination.limit
      };
      
      const response = await orderService.getOrderHistory(params);
      setOrders(response.orders || response.data || response);
    } catch (err) {
      setError(err.message);
      console.error('Get order history failed:', err);
    } finally {
      setLoading(false);
    }
  }, [pagination.page, pagination.limit]);

  // Request refund
  const requestRefund = useCallback(async (orderId, refundData) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await orderService.requestRefund(orderId, refundData);
      await loadOrders(); // Reload orders after refund request
      return response;
    } catch (err) {
      setError(err.message);
      console.error('Request refund failed:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [loadOrders]);

  // Download invoice
  const downloadInvoice = useCallback(async (orderId) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await orderService.downloadInvoice(orderId);
      return response;
    } catch (err) {
      setError(err.message);
      console.error('Download invoice failed:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Reorder items
  const reorder = useCallback(async (orderId) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await orderService.reorder(orderId);
      return response;
    } catch (err) {
      setError(err.message);
      console.error('Reorder failed:', err);
      throw err;
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
    orders,
    loading,
    error,
    filters,
    pagination,
    loadOrders,
    createOrder,
    getOrderById,
    cancelOrder,
    trackOrder,
    getOrderHistory,
    requestRefund,
    downloadInvoice,
    reorder,
    updateFilters,
    clearFilters,
    nextPage,
    prevPage,
    goToPage
  };
};

export default useOrders;
