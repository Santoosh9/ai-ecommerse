import React, { useState } from 'react';
import { apiConfig } from '../services/config';

const BackendTest = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');

  const testBackend = async () => {
    setLoading(true);
    setResult('Testing backend connectivity...');
    
    try {
      // Test 1: Basic connectivity
      console.log('🔍 Testing basic connectivity to:', apiConfig.BASE_URL);
      
      const response = await fetch(apiConfig.BASE_URL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'cors',
      });
      
      console.log('📡 Response status:', response.status);
      console.log('📡 Response headers:', response.headers);
      
      if (response.ok) {
        setResult('✅ Backend is reachable! Status: ' + response.status);
      } else {
        setResult('⚠️ Backend responded but with status: ' + response.status);
      }
      
    } catch (error) {
      console.error('❌ Backend test failed:', error);
      setResult('❌ Cannot reach backend: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const testRegistrationEndpoint = async () => {
    setLoading(true);
    setResult('Testing registration endpoint...');
    
    try {
      const testData = {
        userName: 'testuser',
        email: 'test@example.com',
        password: 'TestPassword123!',
        address: 'Test Address'
      };
      
      console.log('🔍 Testing registration endpoint:', apiConfig.BASE_URL + '/api/Account/UserRegister');
      console.log('📤 Sending data:', testData);
      
      const response = await fetch(apiConfig.BASE_URL + '/api/Account/UserRegister', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(testData),
        mode: 'cors',
      });
      
      console.log('📡 Registration response status:', response.status);
      
      if (response.ok) {
        const data = await response.json();
        setResult('✅ Registration endpoint working! Response: ' + JSON.stringify(data));
      } else {
        const errorData = await response.text();
        setResult('⚠️ Registration endpoint responded with status ' + response.status + ': ' + errorData);
      }
      
    } catch (error) {
      console.error('❌ Registration test failed:', error);
      setResult('❌ Registration endpoint error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const testLoginEndpoint = async () => {
    setLoading(true);
    setResult('Testing login endpoint...');
    
    try {
      const testData = {
        userName: 'testuser',
        password: 'TestPassword123!'
      };
      
      console.log('🔍 Testing login endpoint:', apiConfig.BASE_URL + '/api/Account/Login');
      console.log('📤 Sending data:', testData);
      
      const response = await fetch(apiConfig.BASE_URL + '/api/Account/Login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(testData),
        mode: 'cors',
      });
      
      console.log('📡 Login response status:', response.status);
      
      if (response.ok) {
        const data = await response.json();
        setResult('✅ Login endpoint working! Response: ' + JSON.stringify(data));
      } else {
        const errorData = await response.text();
        setResult('⚠️ Login endpoint responded with status ' + response.status + ': ' + errorData);
      }
      
    } catch (error) {
      console.error('❌ Login test failed:', error);
      setResult('❌ Login endpoint error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-md mx-auto mt-8">
      <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
        Backend Connectivity Test
      </h2>
      
      <div className="mb-4">
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
          Base URL: <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-xs">
            {apiConfig.BASE_URL}
          </code>
        </p>
      </div>
      
      <div className="space-y-3">
        <button
          onClick={testBackend}
          disabled={loading}
          className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? 'Testing...' : 'Test Basic Connectivity'}
        </button>
        
        <button
          onClick={testRegistrationEndpoint}
          disabled={loading}
          className="w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50"
        >
          {loading ? 'Testing...' : 'Test Registration Endpoint'}
        </button>
        
        <button
          onClick={testLoginEndpoint}
          disabled={loading}
          className="w-full px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 disabled:opacity-50"
        >
          {loading ? 'Testing...' : 'Test Login Endpoint'}
        </button>
      </div>
      
      {result && (
        <div className="mt-4 p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
          <p className="text-sm text-gray-800 dark:text-gray-200 whitespace-pre-wrap">
            {result}
          </p>
        </div>
      )}
    </div>
  );
};

export default BackendTest;
