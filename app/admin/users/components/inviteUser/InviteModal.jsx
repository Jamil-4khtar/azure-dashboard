"use client";
import { useState } from "react";
import { UserService } from "@/features/users/userService";

export default function InviteModal({ isOpen, onClose, children, title }) {

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-96" onClick={(e) => e.stopPropagation()}>
        <header>{title}</header>
        <div className="modal-content">{children}</div>
      </div>
    </div>
  );
}
