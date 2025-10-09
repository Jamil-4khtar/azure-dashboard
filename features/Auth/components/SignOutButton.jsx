"use client";

import { HiOutlineLogout } from "react-icons/hi";
import { useAuth } from "./AuthGuard";

export default function SignOutButton({ className = "", showIcon = true }) {
  const { signOut } = useAuth();

  const handleSignOut = () => {
    signOut();
  };

  return (
    <button
      onClick={handleSignOut}
      className={`flex items-center space-x-2 text-sm font-medium transition-colors ${className}`}
    >
      {showIcon && <HiOutlineLogout className="w-4 h-4" />}
      <span>Sign out</span>
    </button>
  );
}
