// Mock Authentication Service - Temporary until backend is ready
class MockAuthService {
  constructor() {
    this.users = [
      {
        id: 1,
        username: 'demo',
        email: 'demo@example.com',
        address: '123 Demo Street, London, UK'
      }
    ];
  }

  // Simulate API delay
  async delay(ms = 1000) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Mock login
  async login(credentials) {
    await this.delay(800);
    
    const { email, password } = credentials;
    
    // Simple validation
    if (!email || !password) {
      throw new Error('Email and password are required');
    }
    
    // Check if user exists (demo user)
    if (email === 'demo@example.com' && password === 'demo123') {
      const user = this.users.find(u => u.email === email);
      const mockToken = 'mock-jwt-token-' + Date.now();
      
      // Store in localStorage
      localStorage.setItem('accessToken', mockToken);
      localStorage.setItem('user', JSON.stringify(user));
      
      return {
        user,
        accessToken: mockToken,
        message: 'Login successful (Mock)'
      };
    } else {
      throw new Error('Invalid email or password');
    }
  }

  // Mock register
  async register(userData) {
    await this.delay(1000);
    
    const { username, email, password, address } = userData;
    
    // Validation
    if (!username || !email || !password || !address) {
      throw new Error('All fields are required');
    }
    
    if (password.length < 6) {
      throw new Error('Password must be at least 6 characters');
    }
    
    // Check if user already exists
    if (this.users.find(u => u.email === email)) {
      throw new Error('User with this email already exists');
    }
    
    // Create new user
    const newUser = {
      id: this.users.length + 1,
      username,
      email,
      address
    };
    
    this.users.push(newUser);
    
    // Don't auto-login after registration - just return success message
    return {
      message: 'Registration successful! Please login with your credentials.',
      user: null // No user object returned
    };
  }

  // Mock logout
  async logout() {
    await this.delay(300);
    this.clearAuthData();
    return { message: 'Logout successful (Mock)' };
  }

  // Check if user is authenticated
  isAuthenticated() {
    const token = localStorage.getItem('accessToken');
    const user = localStorage.getItem('user');
    return !!(token && user);
  }

  // Get current user
  getCurrentUser() {
    try {
      const user = localStorage.getItem('user');
      return user ? JSON.parse(user) : null;
    } catch (error) {
      return null;
    }
  }

  // Get access token
  getAccessToken() {
    return localStorage.getItem('accessToken');
  }

  // Clear auth data
  clearAuthData() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
  }

  // Format errors (for consistency)
  formatError(error) {
    return [error.message || 'An unexpected error occurred'];
  }
}

const mockAuthService = new MockAuthService();
export default mockAuthService;
