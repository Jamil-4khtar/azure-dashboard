"use client";
import { useLogin } from "../hooks/useLogin";
import Input from "@/components/inputs/Input";
import StyledLink from "@/components/links/StyledLink";
import Button from "@/components/buttons/Button";

export default function LoginForm() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    error,
    setError,
    isSubmitting,
    handleLogin,
  } = useLogin();

  // const { showToast } = useToast();

  // if (error) {
  //   setTimeout(() => {
  //     showToast(error);
  //     setError("");
  //   }, 500);
  // }

  return (
    <form
      className="space-6 bg-black/10 shadow-2xl border-1 border-[var(--border)] rounded-2xl lg:p-7 p-5 space-y-5"
      aria-labelledby="loginTitle"
      onSubmit={handleLogin}
    >
      <h1 id="loginTitle" className="m-0 mb-3.5 text-xl font-bold">Login</h1>
      <Input
        type="email"
        label={"Email"}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
        required
      />
      <Input
        type="password"
        label={"Password"}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter your password"
        required
      />
      <StyledLink
        href="/forgot-password"
        className="text-sm font-light"
      >
        Forgot Password?
      </StyledLink>
      <Button type="submit" loading={isSubmitting}>
        {isSubmitting ? "Loging..." : "Login"}
      </Button>
    </form>
  );
}
