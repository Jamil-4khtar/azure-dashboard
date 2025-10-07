"use client";

import React from "react";
import {
  HiOutlineDocument,
  HiOutlineEye,
  HiOutlineClock,
  HiOutlineArchive,
} from "react-icons/hi";

export default function PageStats({ pages = [] }) {
  const stats = React.useMemo(() => {
    const total = pages.length;
    const published = pages.filter((p) => p.status === "published").length;
    const drafts = pages.filter((p) => p.status === "draft").length;
    const archived = pages.filter((p) => p.status === "archived").length;
    const totalViews = pages.reduce((sum, p) => sum + (p.views || 0), 0);

    return [
      {
        title: "Total Pages",
        value: total.toLocaleString(),
        change: "+3 this month",
        changeType: "positive",
        icon: HiOutlineDocument,
        color: "blue",
      },
      {
        title: "Published",
        value: published.toLocaleString(),
        change: `${Math.round((published / total) * 100)}% of total`,
        changeType: "neutral",
        icon: HiOutlineEye,
        color: "green",
      },
      {
        title: "Drafts",
        value: drafts.toLocaleString(),
        change: drafts > 0 ? "Needs attention" : "All caught up",
        changeType: drafts > 0 ? "warning" : "positive",
        icon: HiOutlineClock,
        color: "orange",
      },
      {
        title: "Total Views",
        value: totalViews.toLocaleString(),
        change: "+12% this week",
        changeType: "positive",
        icon: HiOutlineEye,
        color: "purple",
      },
    ];
  }, [pages]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-[var(--surface)]/50 rounded-lg border border-[var(--border)] p-6 hover:shadow-[var(--shadow-md)] transition-shadow"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[var(--text-muted)] font-medium">
                {stat.title}
              </p>
              <p className="text-2xl font-bold text-[var(--text)] mt-1">
                {stat.value}
              </p>
              <p className={`text-xs mt-2 ${
                stat.changeType === "positive" 
                  ? "text-[var(--success)]" 
                  : stat.changeType === "warning" 
                  ? "text-[var(--warning)]" 
                  : "text-[var(--text-muted)]"
              }`}>
                {stat.change}
              </p>
            </div>
            <div className={`p-3 rounded-lg ${
              stat.color === "blue" ? "bg-blue-100 text-blue-600" :
              stat.color === "green" ? "bg-green-100 text-green-600" :
              stat.color === "orange" ? "bg-orange-100 text-orange-600" :
              "bg-purple-100 text-purple-600"
            }`}>
              <stat.icon className="w-6 h-6" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
