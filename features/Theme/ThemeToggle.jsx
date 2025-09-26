"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch: only render once mounted
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <button
        type="button"
        aria-hidden="true"
        className="w-18 h-8 opacity-0"
      />
    );
  }

  const next = theme === "dark" ? "light" : "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(next)}
      aria-pressed={theme === "dark"}
      title="Toggle theme"
      className="relative w-18 h-8 flex items-center justify-between p-1 rounded-full bg-gray-300 dark:bg-gray-600 cursor-pointer transition-all duration-300"
    >
      {/* sliding circle */}
      <div
        className={`w-6 h-6 rounded-full shadow-md transform transition-all duration-300 ease-in-out absolute left-1 ${
          theme === "dark"
            ? "translate-x-10 bg-black/50"
            : "translate-x-0 bg-white"
        }`}
      ></div>

      {/* icons */}
      <div className="absolute flex w-[90%] justify-between items-center px-[5px]">
        <FaSun
          className={`text-yellow-500 text-sm transition-all duration-300 ${
            theme === "dark" ? "opacity-0" : "opacity-100"
          }`}
        />
        <FaMoon
          className={`text-white text-sm transition-all duration-300 ${
            theme === "dark" ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>
    </button>
  );
}
