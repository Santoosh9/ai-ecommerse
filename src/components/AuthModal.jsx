import React, { useState } from 'react';
import { XMarkIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../contexts/AuthContext';

const AuthModal = ({ isOpen, onClose, initialMode = 'login' }) => {
  const [mode, setMode] = useState(initialMode); // 'login' or 'register'
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    password: '',
    address: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const { login, register, loading, error: authError, clearError } = useAuth();

  const handleInputChange = (e) => {
    const newFormData = {
      ...formData,
      [e.target.name]: e.target.value
    };
    console.log('🔄 AuthModal form data updated:', newFormData);
    setFormData(newFormData);
    setError(''); // Clear error when user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    clearError();

    try {
      if (mode === 'register') {
        if (formData.password.length < 6) {
          throw new Error('Password must be at least 6 characters');
        }
        
        // Call register API
        console.log('📤 Sending registration data:', formData);
        const response = await register(formData);
        console.log('Registration successful:', response);
        
        // After successful registration, switch to login mode
        setMode('login');
        setFormData({ userName: '', email: '', password: '', address: '' });
        setError(''); // Clear any errors
        setSuccessMessage('Registration successful! Please login with your credentials.');
        return; // Don't close modal, just switch to login
      } else {
        // Call login API
        const response = await login({
          username: formData.userName,
          password: formData.password
        });
        console.log('Login successful:', response);
        
        // Only close modal after successful login
        onClose();
        setFormData({ userName: '', email: '', password: '', address: '' });
      }
    } catch (err) {
      console.error('Auth error:', err);
      setError(err.message || 'An error occurred during authentication');
    } finally {
      setIsLoading(false);
    }
  };

  const switchMode = () => {
    setMode(mode === 'login' ? 'register' : 'login');
    setError('');
    setSuccessMessage('');
    setFormData({ userName: '', email: '', password: '', address: '' });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors z-10"
      >
        <XMarkIcon className="w-8 h-8" />
      </button>
      
      {/* Main Container */}
      <div className="w-full max-w-md mx-4 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-2">
            {mode === 'login' ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="text-indigo-100 text-lg">
            {mode === 'login' ? 'Sign in to your account' : 'Join us today'}
          </p>
          
          {/* Progress indicator for registration */}
          {mode === 'register' && (
            <div className="mt-6">
              <div className="flex justify-center space-x-2">
                <div className="w-3 h-3 bg-white rounded-full"></div>
                <div className="w-3 h-3 bg-white/50 rounded-full"></div>
                <div className="w-3 h-3 bg-white/50 rounded-full"></div>
              </div>
              <p className="text-indigo-100 text-sm mt-2">Step 1 of 3</p>
            </div>
          )}
        </div>

        {/* Form */}
        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {successMessage && (
              <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl">
                <p className="text-green-600 dark:text-green-400 text-center font-medium">
                  {successMessage}
                </p>
              </div>
            )}
            
            {(error || authError) && (
              <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
                <p className="text-red-600 dark:text-red-400 text-center font-medium">
                  {error || (Array.isArray(authError) ? authError.join(', ') : authError)}
                </p>
              </div>
            )}

            {/* Username Field - Always visible */}
            <div className="space-y-2">
              <label className="block text-lg font-semibold text-gray-700 dark:text-gray-300">
                Username
              </label>
              <input
                type="text"
                name="userName"
                value={formData.userName}
                onChange={handleInputChange}
                required
                className="w-full px-6 py-4 text-lg border-2 border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-300"
                placeholder="Enter your username"
              />
            </div>

            {/* Email Field - Only for registration */}
            {mode === 'register' && (
              <div className="space-y-2">
                <label className="block text-lg font-semibold text-gray-700 dark:text-gray-300">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-6 py-4 text-lg border-2 border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-300"
                  placeholder="Enter your email"
                />
              </div>
            )}

            {/* Password Field */}
            <div className="space-y-2">
              <label className="block text-lg font-semibold text-gray-700 dark:text-gray-300">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="w-full px-6 py-4 pr-16 text-lg border-2 border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-300"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                >
                  {showPassword ? (
                    <EyeSlashIcon className="w-6 h-6" />
                  ) : (
                    <EyeIcon className="w-6 h-6" />
                  )}
                </button>
              </div>
            </div>

            {/* Address Field - Only for registration */}
            {mode === 'register' && (
              <div className="space-y-2">
                <label className="block text-lg font-semibold text-gray-700 dark:text-gray-300">
                  Address
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                  rows="3"
                  className="w-full px-6 py-4 text-lg border-2 border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-300 resize-none"
                  placeholder="Enter your address"
                />
              </div>
            )}

            {/* Remember me and Forgot password - Only for login */}
            {mode === 'login' && (
              <div className="flex items-center justify-between pt-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                  />
                  <span className="ml-3 text-lg text-gray-600 dark:text-gray-400">
                    Remember me
                  </span>
                </label>
                <button
                  type="button"
                  className="text-lg text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 font-medium"
                >
                  Forgot password?
                </button>
              </div>
            )}

            {/* Registration Options - Only for register */}
            {mode === 'register' && (
              <div className="space-y-4 pt-4">
                {/* Terms and Conditions */}
                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    id="terms"
                    className="w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 mt-1"
                  />
                  <label htmlFor="terms" className="text-lg text-gray-600 dark:text-gray-400">
                    I agree to the{' '}
                    <button
                      type="button"
                      className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 font-medium underline"
                    >
                      Terms of Service
                    </button>{' '}
                    and{' '}
                    <button
                      type="button"
                      className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 font-medium underline"
                    >
                      Privacy Policy
                    </button>
                  </label>
                </div>

                {/* Newsletter Subscription */}
                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    id="newsletter"
                    className="w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 mt-1"
                  />
                  <label htmlFor="newsletter" className="text-lg text-gray-600 dark:text-gray-400">
                    Subscribe to our newsletter for updates and special offers
                  </label>
                </div>

                {/* Password Requirements */}
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
                  <h4 className="text-lg font-semibold text-blue-800 dark:text-blue-300 mb-2">
                    Password Requirements:
                  </h4>
                  <ul className="text-sm text-blue-700 dark:text-blue-400 space-y-1">
                    <li>• At least 6 characters long</li>
                    <li>• Include uppercase and lowercase letters</li>
                    <li>• Include at least one number</li>
                    <li>• Include at least one special character</li>
                  </ul>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || loading}
              className="w-full py-4 px-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-bold text-lg hover:from-indigo-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none mt-8"
            >
              {(isLoading || loading) ? (
                <div className="flex items-center justify-center">
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                  {mode === 'login' ? 'Signing in...' : 'Creating account...'}
                </div>
              ) : (
                mode === 'login' ? 'Sign In' : 'Create Account'
              )}
            </button>

            {/* Switch Mode */}
            <div className="text-center pt-6">
              <p className="text-lg text-gray-600 dark:text-gray-400">
                {mode === 'login' ? "Don't have an account?" : "Already have an account?"}
                <button
                  type="button"
                  onClick={switchMode}
                  className="ml-2 text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 font-bold text-lg"
                >
                  {mode === 'login' ? 'Sign up' : 'Sign in'}
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;


