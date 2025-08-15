import React, { useState } from 'react';
import { authService, apiConfig } from '../services';
import mockAuthService from '../services/mockAuthService';

const ApiTest = () => {
  const [testResult, setTestResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [useMock, setUseMock] = useState(false); // Default to real API now

  const testConnection = async () => {
    setLoading(true);
    setTestResult('Testing connection...');
    
    try {
      // Test basic connection to root endpoint
      const response = await fetch(`${apiConfig.BASE_URL}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (response.ok) {
        setTestResult('✅ Connection successful! Backend is reachable.');
      } else {
        setTestResult(`⚠️ Connection established but endpoint returned ${response.status}`);
      }
    } catch (error) {
      setTestResult(`❌ Connection failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const testLogin = async () => {
    setLoading(true);
    setTestResult('Testing login endpoint...');
    
    try {
      const testCredentials = {
        email: 'demo@example.com',
        password: 'demo123'
      };
      
      const service = useMock ? mockAuthService : authService;
      const response = await service.login(testCredentials);
      setTestResult(`✅ Login successful! ${useMock ? '(Mock)' : '(Real API)'}`);
    } catch (error) {
      if (useMock) {
        setTestResult(`❌ Mock login error: ${error.message}`);
      } else if (error.response?.status === 400 || error.response?.status === 401) {
        setTestResult('✅ Login endpoint is working! (Invalid credentials as expected)');
      } else {
        setTestResult(`❌ Login endpoint error: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const testRegister = async () => {
    setLoading(true);
    setTestResult('Testing register endpoint...');
    
    try {
      const testUserData = {
        username: 'newuser',
        email: 'newuser@example.com',
        password: 'newpassword123',
        address: '456 New Street, London, UK'
      };
      
      const service = useMock ? mockAuthService : authService;
      const response = await service.register(testUserData);
      setTestResult(`✅ Registration successful! ${useMock ? '(Mock)' : '(Real API)'} - User needs to login separately.`);
    } catch (error) {
      if (useMock) {
        setTestResult(`❌ Mock registration error: ${error.message}`);
      } else if (error.response?.status === 400) {
        setTestResult('✅ Register endpoint is working! (Validation error as expected)');
      } else {
        setTestResult(`❌ Register endpoint error: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const discoverEndpoints = async () => {
    setLoading(true);
    setTestResult('Discovering available endpoints...');
    
    const endpointsToTest = [
      '/api/Account/UserRegister',
      '/api/Account/Login',
      '/api/auth/register',
      '/api/auth/login',
      '/api/register',
      '/api/login',
      '/auth/register',
      '/auth/login',
      '/register',
      '/login',
      '/api/users',
      '/api/products',
      '/swagger',
      '/swagger/v1/swagger.json',
      '/api',
      '/',
      '/health',
      '/weatherforecast',
      '/api/weatherforecast'
    ];
    
    const results = [];
    
    for (const endpoint of endpointsToTest) {
      try {
        const response = await fetch(`${apiConfig.BASE_URL}${endpoint}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        if (response.status !== 404) {
          results.push(`✅ ${endpoint} - Status: ${response.status}`);
        }
      } catch (error) {
        // Ignore errors for discovery
      }
    }
    
    if (results.length > 0) {
      setTestResult(`Found available endpoints:\n${results.join('\n')}`);
    } else {
      setTestResult('❌ No common endpoints found. Please check your backend configuration.');
    }
    
    setLoading(false);
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
        API Connection Test
      </h2>
      
      <div className="mb-4">
        <p className="text-gray-600 dark:text-gray-400 mb-2">
          Base URL: <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
            {apiConfig.BASE_URL}
          </code>
        </p>
        
        <div className="flex items-center space-x-4 mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={useMock}
              onChange={(e) => setUseMock(e.target.checked)}
              className="mr-2"
            />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Use Mock Service (for testing)
            </span>
          </label>
        </div>
      
        
        {useMock && (
          <div className="p-3 bg-yellow-100 dark:bg-yellow-900/20 border border-yellow-300 dark:border-yellow-700 rounded-lg mb-4">
            <p className="text-sm text-yellow-800 dark:text-yellow-200">
              🔧 <strong>Mock Mode Active:</strong> Using simulated authentication. 
              Demo login: <code>demo@example.com</code> / <code>demo123</code>
            </p>
          </div>
        )}
      </div>
      
      <div className="space-y-3">
        <button
          onClick={testConnection}
          disabled={loading}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          Test Connection
        </button>
        
        <button
          onClick={testLogin}
          disabled={loading}
          className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
        >
          Test Login Endpoint
        </button>
        
        <button
          onClick={testRegister}
          disabled={loading}
          className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50"
        >
          Test Register Endpoint
        </button>
        
        <button
          onClick={discoverEndpoints}
          disabled={loading}
          className="w-full px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:opacity-50"
        >
          Discover Available Endpoints
        </button>
        
        <button
          onClick={() => window.open(`${apiConfig.BASE_URL}/swagger`, '_blank')}
          className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          Open Swagger UI
        </button>
      </div>
      
      {testResult && (
        <div className="mt-4 p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
          <p className="text-sm">{testResult}</p>
        </div>
      )}
    </div>
  );
};

export default ApiTest;
