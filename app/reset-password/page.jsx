"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AuthLayout from "../login/components/AuthLayout";
import Input from "@/components/inputs/Input";
import StyledLink from "@/components/links/StyledLink";
import Button from "@/components/buttons/Button";
import { useToast } from "@/features/Toast/ToastProvider";

export default function ResetPassword() {
  const params = useSearchParams();
  const router = useRouter();
  const token = params.get("token") || "";
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");
  const { showToast } = useToast();

  async function onSubmit(e) {
    e.preventDefault();
    setBusy(true);
    setErr("");
    setMsg("");
    const res = await fetch("/api/auth/reset-password", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ token, password }),
    }).then((r) => r.json());
    setBusy(false);
    if (res?.ok) {
      setMsg("Password updated. You can now sign in.");
      setTimeout(() => router.push("/login"), 1200);
    } else {
      setErr(res?.error || "Reset failed.");
    }
  }

  useEffect(() => {
    if (err) {
      showToast(err);
    }
  }, [err]);

  return (
    <div className="flex h-screen justify-center items-center">
      <AuthLayout />
      <div
        className="lg:w-[600px] lg:p-10 space-6 bg-black/10 shadow-2xl border-1 w border-[var(--border)] rounded-4xl space-y-5
      zoomInLess
      "
      >
        <h1 className="m-0 mb-3.5 text-xl font-bold">Set a new password</h1>
        <form onSubmit={onSubmit} className="space-y-4">
          <Input
            label={"New Password"}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {err && <div className="text-xs text-red-600">{err}</div>}
          {err && (
            <div className="text-xs text-[var(--text-muted)]">
              Your link looks invalid or expired.{" "}
              {/* <a className="underline" href="/forgot-password">
                Request a new reset link.
              </a> */}
              <StyledLink href={"/forgot-password"}>
                Request a new reset link.
              </StyledLink>
            </div>
          )}
          {msg && <div className="text-xs text-green-700">{msg}</div>}
          
          <Button loading={busy} type="submit">
            {busy ? "Updating..." : "Update password"}
          </Button>
          <div className="mt-2 text-center text-sm">
            <StyledLink href="/login">Go to login</StyledLink>
          </div>
        </form>
      </div>
    </div>
  );
}
