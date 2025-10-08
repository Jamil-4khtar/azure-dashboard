import React, { useId } from "react";
// import "./input.css";

function Input({ label, error, ...rest }) {
  // Generate a unique ID to connect the label and input.
  // This is crucial for accessibility.
  const id = useId();
  // Dynamically build the className string for the input
  const inputClasses = [
    "input",
    error ? "inputError" : "", // Add error class if error prop is present
  ].join(" ");
  return (
    <div
    // className="wrapper"
    >
      {label && <label htmlFor={id} className="font-light">{label}</label>}

      <input
        id={id}
        // className={inputClasses}
        className="w-full mt-2 rounded-lg border border-[var(--border)] bg-white/5 px-4 py-3 placeholder-gray-400 transition-colors duration-200 focus:border-blue-400 focus:bg-white/10 focus:outline-none focus:ring-0"
        {...rest} // Spread the rest of the props (type, placeholder, value, onChange, etc.)
      />

      {error && <p className="errorMessage">{error}</p>}
    </div>
  );
}

export default Input;
