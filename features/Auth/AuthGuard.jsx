"use client";
import React from "react";
import { useAuth } from "./AuthContext";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

const AUTH_ROUTES = ["/login", "/register", "/forgot-password"];
const DEFAULT_PRIVATE_ROUTE = "/admin";
const DEFAULT_PUBLIC_ROUTE = "/login";

export default function AuthGuard({ children }) {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const callbackUrl = decodeURIComponent(params.get("callbackUrl") || "");
  const isAuthRoute = AUTH_ROUTES.includes(pathname);

  React.useEffect(() => {
    if (loading) return; // Wait for auth state to load

    if (isAuthenticated && isAuthRoute) {
			// Redirect authenticated users away from auth pages
			console.log("user presenttttt")
      const redirectTo = callbackUrl && callbackUrl !== "null" 
        ? callbackUrl 
        : DEFAULT_PRIVATE_ROUTE;
      router.push(redirectTo);
    }

    if (!isAuthenticated && !isAuthRoute) {
			// Redirect unauthenticated users to login
			console.log("no tokeeeeeeeeeeen")
      const callbackUrl = encodeURIComponent(pathname);
      router.push(`${DEFAULT_PUBLIC_ROUTE}?callbackUrl=${callbackUrl}`);
    }
  }, [isAuthenticated, loading, pathname, router, isAuthRoute, callbackUrl]);

  // Show loading while determining auth state
  if (loading || 
      (isAuthenticated && isAuthRoute) || 
      (!isAuthenticated && !isAuthRoute)) {
    return (
      <div className="flex items-center bg-transparent justify-center h-screen">
        <div>Loading...</div>
      </div>
    );
  }

  return <>{children}</>;
}
