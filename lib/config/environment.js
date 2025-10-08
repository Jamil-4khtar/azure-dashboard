/**
 * Environment configuration
 */
export const env = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
  APP_URL: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3001',
  
  // Feature flags
  FEATURES: {
    DARK_MODE: true,
    ANALYTICS: process.env.NODE_ENV === 'production',
    DEBUG_MODE: process.env.NODE_ENV === 'development',
  },
  
  // API Configuration
  API: {
    TIMEOUT: 10000, // 10 seconds
    RETRY_ATTEMPTS: 3,
    RETRY_DELAY: 1000, // 1 second
  },
};

export const isProduction = () => env.NODE_ENV === 'production';
export const isDevelopment = () => env.NODE_ENV === 'development';

export default env;
