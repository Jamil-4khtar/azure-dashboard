// features/Auth/AuthGuard.jsx
"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { authService } from '@/lib/services';
import Cookies from 'js-cookie';

// Create context for global auth state
const AuthContext = createContext({});

// Custom hook to use auth state
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthGuard');
  }
  return context;
};

// Combined AuthGuard + Global State Provider
export default function AuthGuard({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  // Public routes that don't require authentication
  const publicRoutes = ['/login', '/register', '/forgot-password', '/reset-password'];
  const isPublicRoute = publicRoutes.includes(pathname);

  useEffect(() => {
    initializeAuth();
  }, []);

  const initializeAuth = async () => {
    try {
      const token = Cookies.get('auth-token');
      if (token) {
        const result = await authService.getCurrentUser();
        if (result.success) {
          setUser(result.user);
        } else {
          // Token invalid, clear it
          await signOut();
        }
      }
    } catch (error) {
      console.error('Auth initialization failed:', error);
      await signOut();
    } finally {
      setLoading(false);
    }
  };

  const updateUser = (userData) => {
    setUser(userData);
  };

  const signOut = async () => {
    authService.logout();
    setUser(null);
    router.push('/login');
  };

  // Route protection logic
  useEffect(() => {
    if (!loading) {
      if (!user && !isPublicRoute) {
        // User not authenticated, redirect to login with callback
        const callbackUrl = encodeURIComponent(pathname);
        router.push(`/login?callbackUrl=${callbackUrl}`);
      } else if (user && (pathname === '/login' || pathname === '/register')) {
        // User authenticated but on auth pages, redirect to dashboard
        router.push('/admin');
      }
    }
  }, [user, loading, pathname, isPublicRoute, router]);

  // Show loading while checking auth
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Prevent flash of protected content
  if (!user && !isPublicRoute) {
    return null; // Will redirect
  }

  // Provide auth context to entire app
  const authValue = {
    user,
    loading,
    isAuthenticated: !!user,
    updateUser,
    signOut,
  };

  return (
    <AuthContext.Provider value={authValue}>
      {children}
    </AuthContext.Provider>
  );
}
