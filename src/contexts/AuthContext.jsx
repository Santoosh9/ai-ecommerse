import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocalStorage } from '../hooks';
import { authService } from '../services';
import mockAuthService from '../services/mockAuthService'; // Added for temporary use

// Toggle this to switch between mock and real API
const USE_MOCK_SERVICE = true; // Set to true to use mock API (backend has issues)

const AuthContext = createContext();

export { AuthContext };

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage('user', null);
  // Use mock service temporarily until backend is ready
  const [isAuthenticated, setIsAuthenticated] = useState(
    USE_MOCK_SERVICE ? mockAuthService.isAuthenticated() : authService.isAuthenticated()
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check if user is authenticated on mount
    const checkAuth = () => {
      const service = USE_MOCK_SERVICE ? mockAuthService : authService;
      const isAuth = service.isAuthenticated();
      setIsAuthenticated(isAuth);
      
      if (isAuth && !user) {
        const currentUser = service.getCurrentUser();
        setUser(currentUser);
      }
    };
    
    checkAuth();
  }, [user]);

  const login = async (credentials) => {
    setLoading(true);
    setError(null);
    
    try {
      // Transform credentials to match service expectations
      const loginData = {
        username: credentials.username || credentials.userName, // Handle both userName and username
        email: credentials.email,
        password: credentials.password
      };
      
      const service = USE_MOCK_SERVICE ? mockAuthService : authService;
      const response = await service.login(loginData);
      setUser(response.user);
      setIsAuthenticated(true);
      return response;
    } catch (error) {
      const service = USE_MOCK_SERVICE ? mockAuthService : authService;
      const errorMessages = service.formatError(error);
      setError(errorMessages);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    setLoading(true);
    setError(null);
    
    try {
      console.log('📤 Sending registration data:', userData);
      // Transform the form data to match API expectations
      const registrationData = {
        username: userData.userName,
        email: userData.email,
        password: userData.password,
        address: userData.address
      };
      
      const service = USE_MOCK_SERVICE ? mockAuthService : authService;
      const response = await service.register(registrationData);
      
      // Don't auto-login after registration - just return success
      // User needs to login separately
      return response;
    } catch (error) {
      const service = USE_MOCK_SERVICE ? mockAuthService : authService;
      const errorMessages = service.formatError(error);
      setError(errorMessages);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const service = USE_MOCK_SERVICE ? mockAuthService : authService;
      await service.logout();
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Logout error:', error);
      // Even if logout fails, clear local state
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => {
    setError(null);
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    error,
    login,
    register,
    logout,
    clearError
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
