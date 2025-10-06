"use client";

import { HiOutlineArrowUp, HiOutlineArrowDown } from "react-icons/hi";

export default function StatsCard({
  title,
  value,
  change,
  changeType,
  icon: Icon,
  color = "blue",
}) {
  const colorClasses = {
    blue: "text-blue-600",
    green: "text-green-600",
    purple: "text-purple-600",
    orange: "text-orange-600",
  };

  const currentColor = colorClasses[color] || colorClasses.blue;

  return (
    <div className="rounded-lg p-6 hover:shadow-md transition-shadow border bg-[var(--surface)]/50 border-[var(--border)] shadow-[var(--shadow-sm)]">
      <div className="flex items-center justify-between">
        <div>
          <p
            className="text-sm font-medium mb-1"
            style={{ color: "var(--text-muted)" }}
          >
            {title}
          </p>
          <p className="text-3xl font-bold" style={{ color: "var(--text)" }}>
            {value}
          </p>
          {change && (
            <div className="flex items-center mt-2">
              {changeType === "positive" ? (
                <HiOutlineArrowUp className="w-4 h-4 text-green-500 mr-1" />
              ) : (
                <HiOutlineArrowDown className="w-4 h-4 text-red-500 mr-1" />
              )}
              <span
                className={`text-sm font-medium ${
                  changeType === "positive" ? "text-green-600" : "text-red-600"
                }`}
              >
                {change}
              </span>
              <span className="text-sm ml-1 text-[var(--text-muted)]">
                from last month
              </span>
            </div>
          )}
        </div>

        <div
          className={`p-3 rounded-lg border ${currentColor} bg-[var(--bg-muted)] border-[var(--border)]`}
        >
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
}
