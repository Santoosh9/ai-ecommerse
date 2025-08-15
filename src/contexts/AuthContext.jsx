import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocalStorage } from '../hooks';
import AuthModal from '../components/AuthModal';
import { authService } from '../services';
import mockAuthService from '../services/mockAuthService'; // Added for temporary use

// Toggle this to switch between mock and real API
const USE_MOCK_SERVICE = false; // Set to false to use real API

const AuthContext = createContext();

export { AuthContext };

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage('user', null);
  // Use mock service temporarily until backend is ready
  const [isAuthenticated, setIsAuthenticated] = useState(
    USE_MOCK_SERVICE ? mockAuthService.isAuthenticated() : authService.isAuthenticated()
  );
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login');
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
      const service = USE_MOCK_SERVICE ? mockAuthService : authService;
      const response = await service.login(credentials);
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
      // Transform the form data to match API expectations
      const registrationData = {
        username: userData.username,
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
    
    try {
      const service = USE_MOCK_SERVICE ? mockAuthService : authService;
      await service.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
      setIsAuthenticated(false);
      setLoading(false);
    }
  };

  const openAuthModal = (mode = 'login') => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  const closeAuthModal = () => {
    setShowAuthModal(false);
  };

  const value = {
    user,
    isAuthenticated,
    login,
    register,
    logout,
    loading,
    error,
    showAuthModal,
    authMode,
    openAuthModal,
    closeAuthModal,
    clearError: () => setError(null)
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={closeAuthModal} 
        initialMode={authMode}
      />
    </AuthContext.Provider>
  );
};
