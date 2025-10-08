import React from "react";
import "./button.css";

function Button({
  children,
  onClick,
  variant,
  size,
  disabled = false,
  loading = false,
  ...rest
}) {

  const dynamicClasses = `
    ${variant} ${size}
  `;

  return (
    <button
      onClick={onClick}
      className={`w-full cursor-pointer rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 py-3 font-semibold text-white shadow-lg shadow-blue-500/20 transition-all duration-300 hover:scale-105 hover:shadow-blue-500/40 flex justify-center items-center disabled:cursor-not-allowed disabled:scale-100
        ${dynamicClasses}  
      `}
      disabled={disabled || loading}
      {...rest}
    >
      {children}
      {loading && <div className="spinner"></div>}
    </button>
  );
}

export default Button;
