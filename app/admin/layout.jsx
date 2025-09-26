"use client";

import React from "react";
import AuthLayout from "../login/components/AuthLayout";

function AdminLayout({ children }) {
  return (
    <div>
      <AuthLayout />
      <div>{children}</div>
    </div>
  );
}

export default AdminLayout;
