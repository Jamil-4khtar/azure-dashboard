import ThemeToggle from "@/features/Theme/ThemeToggle";
import RegisterForm from "./RegisterForm";

export default function RegisterLayout() {
  return (
    <div className="w-full max-w-[1100px] grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-4 lg:gap-12 items-center">
      <div className={`absolute right-0 top-0 m-5 zoomIn`}>
        <ThemeToggle />
      </div>

      <div className="lg:min-h-[220px] max-md:h-[100px] max-md:mt-5 slideLeft">
        <h1
          className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight m-0`}
        >
          Create Your Account
        </h1>
        <p className="mt-2.5 font-light text-sm sm:text-base lg:text-lg">
          Accept your invite to continue
        </p>
      </div>

      <div className="slideRight">
        <RegisterForm />
      </div>
    </div>
  );
}
