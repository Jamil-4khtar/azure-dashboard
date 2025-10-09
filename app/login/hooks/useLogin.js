// app/login/hooks/useLogin.js
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useToast } from "@/components/ui/Toast";
import { useAuth } from "@/features/Auth/components/AuthGuard"; // Import from AuthGuard now
import { authService } from "@/features/Auth/services/authService";

export function useLogin() {
  const router = useRouter();
  const params = useSearchParams();
  const { updateUser } = useAuth(); // Get from AuthGuard
  const { showToast } = useToast();

  const callbackUrl = decodeURIComponent(params.get("callbackUrl") || "/admin");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const result = await authService.login(email, password);
      if (result.success) {
        updateUser(result.user); // Update global state
        router.push(callbackUrl);
      } else {
        const errorMsg = result.error?.includes("ACCOUNT_DISABLED")
          ? "Your account is disabled. Contact an admin."
          : "Invalid credentials";
        setError(errorMsg);
      }
    } catch (err) {
      setError("An error occurred during login");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Show toast on error
  if (error) {
    setTimeout(() => {
      showToast(error);
      setError("");
    }, 500);
  }

  return {
    email,
    setEmail,
    password,
    setPassword,
    error,
    isSubmitting,
    handleLogin,
  };
}
