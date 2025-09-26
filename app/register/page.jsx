"use client";

import RegisterLayout from "./components/RegisterLayout";
import AuthLayout from "../login/components/AuthLayout";

export default function RegisterPage() {
  return (
    <>
      <AuthLayout/>
        <main className="min-h-dvh grid place-items-center p-6 font-sans">
          <RegisterLayout/>
        </main>
    </>
  );
}
