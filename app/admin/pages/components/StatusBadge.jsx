"use client";

import React from "react";
import {
  HiOutlineCheck,
  HiOutlineClock,
  HiOutlineArchive,
} from "react-icons/hi";

export default function StatusBadge({ status }) {
  const getStatusConfig = (status) => {
    switch (status) {
      case "published":
        return {
          label: "Published",
          icon: HiOutlineCheck,
          className: "bg-green-100 text-green-800 border-green-200",
        };
      case "draft":
        return {
          label: "Draft",
          icon: HiOutlineClock,
          className: "bg-orange-100 text-orange-800 border-orange-200",
        };
      case "archived":
        return {
          label: "Archived",
          icon: HiOutlineArchive,
          className: "bg-gray-100 text-gray-800 border-gray-200",
        };
      default:
        return {
          label: "Unknown",
          icon: HiOutlineClock,
          className: "bg-gray-100 text-gray-800 border-gray-200",
        };
    }
  };

  const config = getStatusConfig(status);
  const Icon = config.icon;

  return (
    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${config.className}`}>
      <Icon className="w-3 h-3" />
      {config.label}
    </span>
  );
}
