import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export function useRegister() {
  const params = useSearchParams();
  const router = useRouter();
  const invite = params.get("invite") || "";
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

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

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ invite, name, password }),
      }
    ).then((r) => r.json());
    setIsSubmitting(false);
    if (res?.ok) {
      setMsg("Account created. You can sign in now.");
      setTimeout(() => router.push("/login"), 1200);
    } else {
      setError(res?.error || "Registration failed.");
    }
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
