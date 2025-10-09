"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Input, Button, StyledLink } from "@/components/ui";
import { useToast } from "@/components/ui/Toast"
import { authService } from "@/features/Auth/services/authService";

export default function ResetPassword() {
  const params = useSearchParams();
  const router = useRouter();
  const token = params.get("token") || "";
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");
  const { showToast } = useToast();

  // Validate token on component mount
  useEffect(() => {
    if (!token) {
      setErr("Missing or invalid reset token.");
    }
  }, [token]);

  // Password validation
  const validatePasswords = () => {
    if (password.length < 6) {
      setErr("Password must be at least 6 characters long.");
      return false;
    }
    if (password !== confirmPassword) {
      setErr("Passwords do not match.");
      return false;
    }
    return true;
  };

  async function onSubmit(e) {
    e.preventDefault();
    setBusy(true);
    setErr("");
    setMsg("");

    // Validate token exists
    if (!token) {
      setErr("Missing or invalid reset token.");
      setBusy(false);
      return;
    }

    // Validate passwords
    if (!validatePasswords()) {
      setBusy(false);
      return;
    }
    
    try {
      // Use authService instead of direct fetch
      const result = await authService.resetPassword(token, password);
      
      setBusy(false);
      
      if (result.success) {
        setMsg(result.message || "Password updated successfully. You can now sign in.");
        // Clear form
        setPassword("");
        setConfirmPassword("");
        // Redirect to login after success
        setTimeout(() => router.push("/login"), 1500);
      } else {
        setErr(result.error || "Failed to reset password. Please try again.");
      }
    } catch (error) {
      setBusy(false);
      setErr("Network error. Please check your connection and try again.");
    }
  }

  // Show toast for errors
  useEffect(() => {
    if (err) {
      showToast(err);
    }
  }, [err, showToast]);

  return (
    <div className="flex h-screen justify-center items-center">
      <div
        className="lg:w-[600px] lg:p-10 space-6 bg-black/10 shadow-2xl border-1 w border-[var(--border)] rounded-4xl space-y-5
      zoomInLess
      "
      >
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tighter">Set New Password</h1>
          <p className="mt-2 text-sm text-gray-400">
            Enter your new password below
          </p>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <Input
            label="New Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter new password"
            required
            minLength={6}
          />

          <Input
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm new password"
            required
            minLength={6}
          />

          {err && <div className="text-xs text-red-600">{err}</div>}
          
          {err && (
            <div className="text-xs text-[var(--text-muted)]">
              Your link looks invalid or expired.{" "}
              <StyledLink href="/forgot-password">
                Request a new reset link.
              </StyledLink>
            </div>
          )}
          
          {msg && <div className="text-xs text-green-700">{msg}</div>}

          <Button 
            loading={busy} 
            type="submit"
            disabled={!token || !password || !confirmPassword}
          >
            {busy ? "Updating..." : "Update Password"}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm space-y-2">
          <div>
            <StyledLink href="/login">Back to Login</StyledLink>
          </div>
          {/* <div>
            <StyledLink href="/forgot-password">Request New Reset Link</StyledLink>
          </div> */}
        </div>
      </div>
    </div>
  );
}
