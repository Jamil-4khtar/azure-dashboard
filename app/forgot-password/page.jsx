"use client";
import { useEffect, useRef, useState } from "react";
import { HiMail } from "react-icons/hi";
import Input from "@/components/ui/inputs/Input";
import Button from "@/components/ui/buttons/Button";
import StyledLink from "@/components/ui/links/StyledLink";
import AuthLayout from "../login/components/AuthLayout";

const DEFAULT_COOLDOWN = 60; // seconds, only for initial UX; server is authoritative

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const timerRef = useRef(null);
  const [info, setInfo] = useState("");

  // countdown
  useEffect(() => {
    if (cooldown <= 0) return;
    timerRef.current && clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCooldown((s) => {
        if (s <= 1) {
          clearInterval(timerRef.current);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [cooldown]);

  async function requestLink(e) {
    e?.preventDefault?.();
    setBusy(true);
    setInfo("");
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/forgot-passwor`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email }),
    });
    setBusy(false);
    setSent(true);
    setCooldown(DEFAULT_COOLDOWN); // UX only; server enforces real cooldown on resend
    setInfo("If an account exists, a reset link has been sent.");
  }

  async function resend() {
    if (!email || cooldown > 0) return;
    setBusy(true);
    setInfo("");
    const res = await fetch("/api/auth/forgot-password/resend", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email }),
    }).then((r) => r.json());
    setBusy(false);

    const msLeft = Number(res?.cooldownMsLeft || 0);
    if (msLeft > 0) {
      setCooldown(Math.ceil(msLeft / 1000));
    } else {
      setCooldown(DEFAULT_COOLDOWN);
    }

    if (res?.resent) {
      setInfo("A reset email was sent. Please check your inbox.");
    } else {
      setInfo(
        `Please wait ${Math.ceil(
          (res?.cooldownMsLeft ?? 0) / 1000
        )}s before resending.`
      );
    }
  }

  return (
    <div className="flex h-screen justify-center items-center">
      <AuthLayout />
      <div
        className="lg:w-[600px] lg:px-10 lg:py-20 space-6 bg-black/10 shadow-2xl border-1 w border-[var(--border)] rounded-4xl space-y-5
      zoomInLess
      "
      >
        <div className="text-center">
          <h2 className="text-4xl font-bold tracking-tighter">
            {sent ? "Check Your Email" : "Forgot Password"}
          </h2>
          <p className="mt-2 text-sm text-gray-400">
            {sent
              ? "Follow the link we sent to reset your password."
              : "Enter your email and we’ll send you a reset link."}
          </p>
        </div>

        {!sent ? (
          <form onSubmit={requestLink} className="space-y-4">
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
            />
            <Button loading={busy}>
              {busy ? "Sending..." : "Send reset link"}
            </Button>

            {info && <div className="text-xs text-green-700">{info}</div>}
          </form>
        ) : (
          <div className="space-y-6 text-center">
            <div className="flex justify-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                <HiMail size={38} />
              </div>
            </div>
            <p className="text-sm text-gray-300">
              We sent a password reset link to{" "}
              <span className="font-semibold text-white">{email}</span> (if an
              account exists).
            </p>

            <Button loading={busy || cooldown > 0} onClick={resend}>
              {busy
                ? "Sending..."
                : cooldown > 0
                ? `Resend in ${cooldown}s`
                : "Resend email"}
            </Button>

            <Button onClick={() => setSent(false)}>Try another email</Button>
            {info && <p className="text-xs text-green-400">{info}</p>}
          </div>
        )}
        <div className="mt-6 text-center text-sm">
          <StyledLink href="/login">Back to Login</StyledLink>
        </div>
      </div>
    </div>
  );
}
