# Backend Integration Services

This folder contains all the backend integration services for connecting the React frontend to the .NET backend API.

## 📁 File Structure

```
src/services/
├── config.js           # API configuration and endpoints
├── apiClient.js        # Axios client with interceptors
├── authService.js      # Authentication service
├── index.js           # Service exports
└── README.md          # This documentation
```

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install axios
```

### 2. Configure Base URL

Update the base URL in `config.js` to match your .NET backend:

```javascript
// Development
BASE_URL: 'https://localhost:7001/api'

// Production
BASE_URL: 'https://api.smartlocal.com/api'
```

### 3. Use Services in Components

```javascript
import { authService, login, register } from '../services';

// Login
const handleLogin = async (credentials) => {
  try {
    const response = await login(credentials);
    console.log('Login successful:', response);
  } catch (error) {
    console.error('Login failed:', error);
  }
};

// Register
const handleRegister = async (userData) => {
  try {
    const response = await register(userData);
    console.log('Registration successful:', response);
  } catch (error) {
    console.error('Registration failed:', error);
  }
};
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in your project root:

```env
# Vite Environment Variables (must be prefixed with VITE_)
# Development
VITE_API_URL=https://localhost:7001/api

# Production
VITE_API_URL=https://api.smartlocal.com/api
```

### API Endpoints

The configuration includes endpoints for:

- **Authentication**: Login, Register, Logout, Token Refresh
- **User Management**: Profile, Update Profile, Change Password
- **Products**: CRUD operations, Search, Categories
- **Orders**: Order management and tracking
- **Cart**: Shopping cart operations
- **Local Products**: Local product management

## 🔐 Authentication

### Token Management

The service automatically handles:

- **Access Token**: Stored in localStorage
- **Refresh Token**: Stored in localStorage
- **Token Refresh**: Automatic token refresh on 401 errors
- **Token Expiration**: Basic JWT expiration checking

### Authentication Flow

1. **Login**: POST `/auth/login`
2. **Register**: POST `/auth/register`
3. **Token Refresh**: POST `/auth/refresh-token`
4. **Logout**: POST `/auth/logout`

### Usage Example

```javascript
import { useAuth } from '../contexts/AuthContext';

const MyComponent = () => {
  const { login, register, logout, isAuthenticated, user } = useAuth();

  const handleLogin = async (email, password) => {
    try {
      await login({ email, password });
      // User is now logged in
    } catch (error) {
      // Handle error
    }
  };

  return (
    <div>
      {isAuthenticated ? (
        <button onClick={logout}>Logout</button>
      ) : (
        <button onClick={() => handleLogin('user@example.com', 'password')}>
          Login
        </button>
      )}
    </div>
  );
};
```

## 🌐 API Client Features

### Request Interceptors

- **Authentication**: Automatically adds Bearer token
- **Logging**: Logs all API requests with timing
- **Error Handling**: Centralized error processing

### Response Interceptors

- **Token Refresh**: Automatic token refresh on 401
- **Error Logging**: Detailed error logging
- **Performance**: Request duration tracking

### Retry Logic

- **Automatic Retry**: Retries failed requests (5xx errors)
- **Configurable**: Max 3 attempts with exponential backoff
- **Network Errors**: Handles network connectivity issues

## 📡 API Methods

### Basic HTTP Methods

```javascript
import { apiGet, apiPost, apiPut, apiPatch, apiDelete } from '../services';

// GET request
const data = await apiGet('/users');

// POST request
const response = await apiPost('/users', { name: 'John', email: 'john@example.com' });

// PUT request
const updated = await apiPut('/users/1', { name: 'John Updated' });

// PATCH request
const patched = await apiPatch('/users/1', { name: 'John Patched' });

// DELETE request
await apiDelete('/users/1');
```

### File Upload

```javascript
import { apiUpload } from '../services';

const handleFileUpload = async (file) => {
  try {
    const response = await apiUpload('/users/avatar', file);
    console.log('File uploaded:', response);
  } catch (error) {
    console.error('Upload failed:', error);
  }
};
```

## 🔍 Error Handling

### Error Formatting

```javascript
import { authService } from '../services';

try {
  await authService.login(credentials);
} catch (error) {
  const errorMessages = authService.formatError(error);
  // errorMessages is an array of user-friendly error messages
  console.error('Login errors:', errorMessages);
}
```

### Common Error Types

- **400 Bad Request**: Validation errors
- **401 Unauthorized**: Invalid or expired token
- **403 Forbidden**: Insufficient permissions
- **404 Not Found**: Resource not found
- **422 Unprocessable Entity**: Business logic errors
- **500 Internal Server Error**: Server errors

## 🛡️ Security Features

### Token Security

- **Secure Storage**: Tokens stored in localStorage
- **Automatic Refresh**: Tokens refreshed before expiration
- **Logout Cleanup**: All tokens cleared on logout

### Request Security

- **HTTPS Only**: All requests use HTTPS
- **CORS Handling**: Proper CORS configuration
- **Content-Type**: JSON content type enforcement

## 📊 Monitoring & Debugging

### Console Logging

The API client provides detailed logging:

```
🚀 API Request: POST /auth/login
✅ API Response: POST /auth/login (245ms)
❌ API Error: GET /users (timeout)
```

### Performance Tracking

- **Request Duration**: Each request is timed
- **Retry Attempts**: Failed requests are logged
- **Error Details**: Comprehensive error information

## 🔄 State Management Integration

### AuthContext Integration

The services integrate seamlessly with the AuthContext:

```javascript
// AuthContext automatically uses authService
const { login, register, logout, isAuthenticated, user } = useAuth();

// All authentication state is managed automatically
```

### Local Storage Sync

- **User Data**: Automatically synced with localStorage
- **Token Management**: Tokens managed transparently
- **Session Persistence**: User sessions persist across browser restarts

## 🚀 .NET Backend Requirements

### Expected API Structure

```csharp
// Authentication Controller
[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginRequest request)
    {
        // Return: { accessToken, refreshToken, user }
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register(RegisterRequest request)
    {
        // Return: { accessToken, refreshToken, user }
    }

    [HttpPost("refresh-token")]
    public async Task<IActionResult> RefreshToken(RefreshTokenRequest request)
    {
        // Return: { accessToken, refreshToken }
    }

    [HttpPost("logout")]
    public async Task<IActionResult> Logout()
    {
        // Invalidate token
    }
}
```

### Response Format

```json
{
  "success": true,
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": 1,
      "email": "user@example.com",
      "name": "John Doe",
      "avatar": "https://example.com/avatar.jpg"
    }
  },
  "message": "Login successful"
}
```

### Error Response Format

```json
{
  "success": false,
  "errors": {
    "email": ["Email is required"],
    "password": ["Password must be at least 8 characters"]
  },
  "message": "Validation failed"
}
```

## 🔧 Customization

### Adding New Services

1. Create a new service file (e.g., `productService.js`)
2. Import the API client methods
3. Define your service methods
4. Export from `index.js`

### Custom Endpoints

Add new endpoints to `config.js`:

```javascript
ENDPOINTS: {
  // ... existing endpoints
  CUSTOM: {
    GET_DATA: '/custom/data',
    POST_DATA: '/custom/data'
  }
}
```

## 📝 Best Practices

1. **Error Handling**: Always wrap API calls in try-catch
2. **Loading States**: Use loading states for better UX
3. **Validation**: Validate data before sending to API
4. **Caching**: Implement caching for frequently accessed data
5. **Security**: Never store sensitive data in localStorage
6. **Testing**: Write tests for your service methods

## 🐛 Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure backend allows your frontend domain
2. **Token Expiration**: Check token expiration handling
3. **Network Errors**: Verify API URL and connectivity
4. **Validation Errors**: Check request data format

### Debug Mode

Enable detailed logging by setting:

```javascript
localStorage.setItem('debug', 'true');
```

This will show detailed request/response information in the console.

