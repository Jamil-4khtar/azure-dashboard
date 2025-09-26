"use client";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react"; 

export default function LoginIntro() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    // prevent SSR mismatch by rendering nothing until mounted
    return null;
  }
  return (
    <div className={`grid place-items-center zoomIn`}>
      <div
        className={`${
          theme === "dark" ? "filter invert brightness-100" : "brightness-0"
        }`}
      >
        <Image
          src="azure-logo.svg" // Your SVG path
          alt="companyLogo"
          width={240}
          height={120}
        />
      </div>
    </div>
  );
} 
