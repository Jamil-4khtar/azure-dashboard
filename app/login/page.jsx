"use client";
import LoginIntro from "./components/LoginIntro";
import LoginLayout from "./components/LoginLayout";
import { useLoginAnimation } from "./hooks/useLoginAnimation";

export default function LoginPage() {
  const { phase } = useLoginAnimation();

  return (
    <>
      <main className="min-h-dvh grid place-items-center p-6 font-sans">
        {phase === "intro" ? <LoginIntro /> : <LoginLayout />}
      </main>
    </>
  );
}
