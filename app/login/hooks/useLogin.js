import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useToast } from "@/features/Toast/ToastProvider";
import { useAuth as useAuthContext } from "@/features/Auth/AuthContext";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export function useLogin() {
  const params = useSearchParams();
  const router = useRouter();
  const { signIn } = useAuthContext();

  // Get and decode callbackUrl from query parameters (if encoded)
  const callbackUrl = decodeURIComponent(params.get("callbackUrl") || "/admin");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);
    setMsg("");

    try {
      
      // Use the context's signIn method (calls your Node.js backend)
      const result = await signIn(email, password);

      if (result.success) {
        // Redirect to the callback URL (user's original requested page)
        console.log(callbackUrl);
        router.push(callbackUrl);
      } else {
        if (result.error?.includes("ACCOUNT_DISABLED")) {
          setError("Your account is disabled. Contact an admin.");
        } else {
          setError("Invalid credentials");
        }
      }
    } catch (err) {
      setError("An error occurred during login");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setError("");
  };

  const { showToast } = useToast();

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
    resetForm,
    setError,
    msg,
  };
}
