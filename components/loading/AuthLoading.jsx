"use client";
import React from "react";
import Image from "next/image";


function AuthLoading() {
  
  return (
    <>
      <style>
        {`
                @keyframes spin-reverse {
                    from { transform: rotate(360deg); }
                    to { transform: rotate(0deg); }
                }
                .animate-spin-reverse {
                    animation: spin-reverse 4s linear infinite;
                }
                @keyframes text-glow {
                    0%, 100% { text-shadow: 0 0 10px rgba(139, 92, 246, 0.6), 0 0 20px rgba(59, 130, 246, 0.6); }
                    50% { text-shadow: 0 0 15px rgba(139, 92, 246, 0.8), 0 0 30px rgba(59, 130, 246, 0.8); }
                }
                .animate-text-glow {
                    animation: text-glow 2.5s ease-in-out infinite;
                }
                `}
      </style>
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[var(--bg-muted)] backdrop-blur-sm">
        <div className="relative h-24 w-24">
          <div
            className="absolute inset-0 rounded-full border-2 border-blue-500/50 animate-spin"
            style={{ animationDuration: "3s" }}
          ></div>
          <div className="absolute inset-2 rounded-full border-2 border-purple-500/50 animate-spin-reverse"></div>
          <div className="absolute inset-5 flex items-center justify-center font-bold text-white text-lg">
            {/* <Image src={AzureLogo} height={24} width={24} alt="logo" /> */}
            <div
              className="theme-aware-image"
            >
              <Image src="azure-logo.svg" height={34} width={34} alt="logo" />
            </div>
          </div>
        </div>
        <h1 className="mt-8 text-3xl font-bold tracking-wider text-[var(--text)] animate-text-glow">
          Loading...
        </h1>
      </div>
    </>
  );
}

export default AuthLoading;
