import { useRegister } from "../hooks/useRegister";
import Input from "@/components/inputs/Input";
import Button from "@/components/buttons/Button";
import { useToast } from "@/features/Toast/ToastProvider";

export default function RegisterForm() {
  const {
    name,
    setName,
    password,
    setPassword,
    error,
    setError,
    isSubmitting,
    onSubmit,
    msg,
  } = useRegister();

  const { showToast } = useToast();

  if (error) {
    setTimeout(() => {
      showToast(error);
      setError("");
    }, 500);
  }

  return (
    <form
      className="space-6 bg-black/10 shadow-2xl border-1 border-[var(--border)] rounded-2xl lg:p-7 p-5 space-y-5"
      aria-labelledby="registerTitle"
      onSubmit={onSubmit}
    >
      <h2 id="registerTitle" className="m-0 mb-3.5 text-xl font-bold">
        Register
      </h2>

      <Input
        type="text"
        label={"Name"}
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Your Name"
        autoComplete="name"
        required
      />

      <Input
        type="password"
        label={"Password"}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter your password"
        autoComplete="new-password"
        required
      />

      <Button type="submit" loading={isSubmitting}>
        {isSubmitting ? "Signing..." : "Sign Up"}
      </Button>

      
    </form>
  );
}
