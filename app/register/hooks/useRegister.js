import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useToast } from "@/components/ui/Toast/ToastProvider";
import { useAuth } from "@/features/Auth/AuthContext";

export function useRegister() {
  const params = useSearchParams();
  const router = useRouter();
  const invite = params.get("invite") || "";
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const { showToast } = useToast();
	const { register } = useAuth()

  const callbackUrl = decodeURIComponent(params.get("callbackUrl") || "/admin");

  useEffect(() => {
    if (!invite) {
      setError("Missing invite token.");
    }
  }, [invite]);

  async function onSubmit(e) {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    setMsg("");

    if (!invite) {
      setError("Missing invite token");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await register(invite, name, password);
      if (response.success) {
        setMsg("Account created. You can sign in now.");
        setTimeout(() => router.push("/login"), 1200);
      } else {
        setError(response.error || "Registration failed.");
      }
    } catch (error) {
      setError("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (error) {
    setTimeout(() => {
      showToast(error);
      setError("");
    }, 500);
  }

  const resetForm = () => {
    setName("");
    setPassword("");
    setError("");
  };

  return {
    name,
    setName,
    password,
    setPassword,
    error,
    setError,
    isSubmitting,
    onSubmit,
    resetForm,
    msg,
  };
}
