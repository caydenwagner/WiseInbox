// constants/index.ts

// Routes
export const ROUTES = {
  LOGIN_SCREEN: 'LoginScreen',
  VIEW_EMAIL_SCREEN: 'ViewEmailScreen',
};

// API URLs
export const API_URLS = {
  BASE_URL: 'https://hopelessly-summary-chow.ngrok-free.app',
  GOOGLE_LOGIN: '/user/login/google',
  GOOGLE_LOGIN_NEW_USER: '/user/login/google/newuser',
};

// AsyncStorage keys
export const STORAGE_KEYS = {
  USER: 'User',
  LAST_LOGIN: 'LastLogin',
};

// Error messages
export const ERROR_MESSAGES = {
  LOGIN_FAILED: 'Failed to initiate login. Please try again.',
  SAVE_USER_FAILED: 'Failed to save user data. Please try again.',
  INVALID_AUTH_RESPONSE: 'Invalid authentication response. Please try again.',
  AUTH_FAILED: 'Authentication failed. Please try again.',
};

// Other app-specific constants
export const APP_CONFIG = {
  VERSION: '1.0.0',
  BUILD_NUMBER: '1',
  // Add other app-wide configuration here
};