export const env = {
  // App
  NODE_ENV: process.env.NODE_ENV || "development",
  APP_URL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3001",

  // API
  API_URL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api",


  // Validation
  isProduction: process.env.NODE_ENV === "production",
  isDevelopment: process.env.NODE_ENV === "development",
};

// Validate required environment variables
const requiredEnvVars = ["NEXT_PUBLIC_API_URL"];

requiredEnvVars.forEach((envVar) => {
  if (!process.env[envVar]) {
    console.warn(`⚠️  Environment variable ${envVar} is not set`);
  }
});
