"use client";
import LoginForm from "./LoginForm";
import Image from "next/image";
import ThemeToggle from "@/features/Theme/ThemeToggle";
import { useTheme } from "next-themes";


export default function LoginLayout() {
  const  { theme } = useTheme()
  return (
    <div className="w-full max-w-[1100px] grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-4 lg:gap-12 items-center">
      <div className={`absolute right-0 top-0 m-5 zoomIn`}>
        <ThemeToggle />
      </div>

      <div className="lg:min-h-[220px] max-md:size-[180px] slideLeft">
        <div
          className={`${
            theme === "dark" ? "filter invert brightness-100" : "brightness-0"
          }`}
        >
          <Image
            src="azure-logo.svg" // Your SVG path
            alt="companyLogo"
            width={240}
            height={240}
          />
        </div>
        <p className="mt-2.5 ml-2.5 font-light text-sm sm:text-base lg:text-lg ">
          Sign in to continue
        </p>
      </div>
      <div className="slideRight">
        <LoginForm />
      </div>
    </div>
  );
}
