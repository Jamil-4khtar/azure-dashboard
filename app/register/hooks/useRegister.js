import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useToast } from "@/features/Toast/ToastProvider";

export function useRegister() {
  const params = useSearchParams();
  const router = useRouter();
  const invite = params.get("invite") || "";
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
	const {showToast} = useToast(); 

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
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ token: invite, name, password }), // Changed 'invite' to 'token' to match backend
        }
      );

      const data = await response.json();
      setIsSubmitting(false);

      if (response.ok) {
        // Check response.ok, not data.ok
        setMsg("Account created. You can sign in now.");
        setTimeout(() => router.push("/login"), 1200);
      } else {
        setError(data?.error || "Registration failed.");
      }
    } catch (error) {
      setIsSubmitting(false);
      setError("Network error. Please try again.");
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
