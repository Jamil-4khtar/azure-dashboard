"use client";
import React from "react";

function AuthLayout() {
  return (
    <div className="inset-0 fixed z-[-999]">
      <div
        className={`relative min-h-screen  w-full overflow-hidden font-sans `}
      >
        <div className="absolute top-0 left-0 h-full w-full">
          <div className="absolute top-[-20%] left-[10%] h-[500px] w-[500px] rounded-full bg-purple-600/30 blur-[100px] filter animate-pulse-slow"></div>
          <div className="absolute bottom-[-10%] right-[5%] h-[400px] w-[400px] rounded-full bg-blue-600/30 blur-[100px] filter animate-pulse-slow animation-delay-3000"></div>
        </div>

        {/* <div>{children}</div> */}
      </div>
    </div>
  );
}

export default AuthLayout;
