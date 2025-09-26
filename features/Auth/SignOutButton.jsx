"use client";
import { useAuth } from "./AuthContext";

export default function SignOutButton() {
  const { signOut } = useAuth();
  return (
    <button
      onClick={() => signOut()}
      className="px-3 py-2 border rounded-lg cursor-pointer"
    >
      Sign out
    </button>
  );
}
