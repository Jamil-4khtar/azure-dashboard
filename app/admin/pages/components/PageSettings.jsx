"use client";

import React, { useState } from "react";
import {
  HiOutlineCog,
  HiOutlineEye,
  HiOutlineEyeOff,
  HiOutlineLockClosed,
  HiOutlineGlobe,
  HiOutlineSearch,
  HiOutlineClock,
  HiOutlineCalendar,
  HiOutlineTag,
  HiOutlineUser,
  HiOutlineUsers,
  HiOutlineShieldExclamation,
} from "react-icons/hi";
import { HiOutlineChatBubbleLeft } from "react-icons/hi2";


export default function PageSettings({ settingsData, onUpdate }) {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleUpdate = (key, value) => {
    onUpdate({ [key]: value });
  };

  const visibilityOptions = [
    {
      value: "public",
      label: "Public",
      description: "Visible to everyone",
      icon: HiOutlineGlobe,
    },
    {
      value: "private",
      label: "Private",
      description: "Only visible to logged-in users",
      icon: HiOutlineLockClosed,
    },
    {
      value: "password",
      label: "Password Protected",
      description: "Requires password to view",
      icon: HiOutlineShieldExclamation,
    },
    {
      value: "draft",
      label: "Draft",
      description: "Only visible to editors",
      icon: HiOutlineEyeOff,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Visibility Settings */}
      <div className="bg-[var(--surface)] rounded-lg border border-[var(--border)] p-6">
        <h3 className="text-lg font-semibold text-[var(--text)] mb-4 flex items-center gap-2">
          <HiOutlineEye className="w-5 h-5" />
          Visibility & Access
        </h3>
        
        <div className="space-y-4">
          {visibilityOptions.map((option) => (
            <label
              key={option.value}
              className={`flex items-start gap-3 p-4 rounded-lg border cursor-pointer transition-colors ${
                settingsData.visibility === option.value
                  ? "border-[var(--primary)] bg-blue-50"
                  : "border-[var(--border)] hover:border-[var(--primary)] hover:bg-[var(--hover)]"
              }`}
            >
              <input
                type="radio"
                name="visibility"
                value={option.value}
                checked={settingsData.visibility === option.value}
                onChange={(e) => handleUpdate("visibility", e.target.value)}
                className="mt-1 text-[var(--primary)] focus:ring-[var(--primary)]"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2">
									{console.log("Serttings..", 0, option.icon)}
                  <option.icon
                    className={`w-5 h-5 ${
                      settingsData.visibility === option.value
                        ? "text-[var(--primary)]"
                        : "text-[var(--text-muted)]"
                    }`}
                  />
                  <span className="font-medium text-[var(--text)]">{option.label}</span>
                </div>
                <p className="text-sm text-[var(--text-muted)] mt-1">{option.description}</p>
              </div>
            </label>
          ))}

          {/* Password Field */}
          {settingsData.visibility === "password" && (
            <div className="mt-4 p-4 bg-[var(--bg)] rounded-lg border border-[var(--border)]">
              <label htmlFor="page-password" className="block text-sm font-medium text-[var(--text)] mb-2">
                Page Password
              </label>
              <input
                id="page-password"
                type="password"
                value={settingsData.password || ""}
                onChange={(e) => handleUpdate("password", e.target.value)}
                placeholder="Enter password for this page"
                className="w-full px-3 py-2 bg-[var(--surface)] border border-[var(--border)] rounded-lg text-[var(--text)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
              />
              <p className="text-xs text-[var(--text-muted)] mt-2">
                Users will need this password to view the page
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Publishing Settings */}
      <div className="bg-[var(--surface)] rounded-lg border border-[var(--border)] p-6">
        <h3 className="text-lg font-semibold text-[var(--text)] mb-4 flex items-center gap-2">
          <HiOutlineClock className="w-5 h-5" />
          Publishing Options
        </h3>
        
        <div className="space-y-4">
          {/* Schedule Publishing */}
          <div>
            <label className="flex items-center gap-2 mb-3">
              <input
                type="checkbox"
                checked={!!settingsData.publishAt}
                onChange={(e) => {
                  if (e.target.checked) {
                    const tomorrow = new Date();
                    tomorrow.setDate(tomorrow.getDate() + 1);
                    handleUpdate("publishAt", tomorrow.toISOString().slice(0, 16));
                  } else {
                    handleUpdate("publishAt", null);
                  }
                }}
                className="rounded border-[var(--border)] text-[var(--primary)] focus:ring-[var(--primary)]"
              />
              <span className="font-medium text-[var(--text)]">Schedule for later</span>
            </label>
            
            {settingsData.publishAt && (
              <div className="ml-6">
                <label htmlFor="publish-date" className="block text-sm font-medium text-[var(--text)] mb-2">
                  Publish Date & Time
                </label>
                <input
                  id="publish-date"
                  type="datetime-local"
                  value={settingsData.publishAt?.slice(0, 16) || ""}
                  onChange={(e) => handleUpdate("publishAt", e.target.value)}
                  className="px-3 py-2 bg-[var(--bg)] border border-[var(--border)] rounded-lg text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
                />
              </div>
            )}
          </div>

          {/* Featured Page */}
          <div>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={settingsData.featured || false}
                onChange={(e) => handleUpdate("featured", e.target.checked)}
                className="rounded border-[var(--border)] text-[var(--primary)] focus:ring-[var(--primary)]"
              />
              <span className="font-medium text-[var(--text)]">Featured page</span>
            </label>
            <p className="text-sm text-[var(--text-muted)] ml-6 mt-1">
              Highlight this page in navigation and listings
            </p>
          </div>
        </div>
      </div>

      {/* Page Features */}
      <div className="bg-[var(--surface)] rounded-lg border border-[var(--border)] p-6">
        <h3 className="text-lg font-semibold text-[var(--text)] mb-4 flex items-center gap-2">
          <HiOutlineCog className="w-5 h-5" />
          Page Features
        </h3>
        
        <div className="space-y-4">
          {/* Comments */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <HiOutlineChatBubbleLeft className="w-5 h-5 text-[var(--text-muted)]" />
              <div>
                <div className="font-medium text-[var(--text)]">Comments</div>
                <div className="text-sm text-[var(--text-muted)]">Allow visitors to leave comments</div>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settingsData.comments}
                onChange={(e) => handleUpdate("comments", e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--primary)]"></div>
            </label>
          </div>

          {/* Search Indexing */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <HiOutlineSearch className="w-5 h-5 text-[var(--text-muted)]" />
              <div>
                <div className="font-medium text-[var(--text)]">Search Indexing</div>
                <div className="text-sm text-[var(--text-muted)]">Include in search results</div>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settingsData.searchable}
                onChange={(e) => handleUpdate("searchable", e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--primary)]"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Advanced Settings */}
      <div className="bg-[var(--surface)] rounded-lg border border-[var(--border)]">
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="w-full flex items-center justify-between p-6 text-left"
        >
          <h3 className="text-lg font-semibold text-[var(--text)] flex items-center gap-2">
            <HiOutlineShieldExclamation className="w-5 h-5" />
            Advanced Settings
          </h3>
          <svg
            className={`w-5 h-5 text-[var(--text-muted)] transition-transform ${
              showAdvanced ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {showAdvanced && (
          <div className="px-6 pb-6 border-t border-[var(--border)] pt-6">
            <div className="space-y-6">
              {/* Custom CSS */}
              <div>
                <label htmlFor="custom-css" className="block text-sm font-medium text-[var(--text)] mb-2">
                  Custom CSS
                </label>
                <textarea
                  id="custom-css"
                  value={settingsData.customCSS || ""}
                  onChange={(e) => handleUpdate("customCSS", e.target.value)}
                  placeholder="/* Add custom CSS for this page */\n.my-class {\n  color: #333;\n}"
                  rows={6}
                  className="w-full px-3 py-2 bg-[var(--bg)] border border-[var(--border)] rounded-lg text-[var(--text)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent font-mono text-sm"
                />
                <p className="text-xs text-[var(--text-muted)] mt-2">
                  CSS will be injected into the page head
                </p>
              </div>

              {/* Custom JavaScript */}
              <div>
                <label htmlFor="custom-js" className="block text-sm font-medium text-[var(--text)] mb-2">
                  Custom JavaScript
                </label>
                <textarea
                  id="custom-js"
                  value={settingsData.customJS || ""}
                  onChange={(e) => handleUpdate("customJS", e.target.value)}
                  placeholder="// Add custom JavaScript for this page\nconsole.log('Page loaded');"
                  rows={6}
                  className="w-full px-3 py-2 bg-[var(--bg)] border border-[var(--border)] rounded-lg text-[var(--text)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent font-mono text-sm"
                />
                <p className="text-xs text-[var(--text-muted)] mt-2">
                  JavaScript will be executed when the page loads
                </p>
              </div>

              {/* Cache Settings */}
              <div>
                <label htmlFor="cache-duration" className="block text-sm font-medium text-[var(--text)] mb-2">
                  Cache Duration (minutes)
                </label>
                <input
                  id="cache-duration"
                  type="number"
                  min="0"
                  max="10080"
                  value={settingsData.cacheDuration || 60}
                  onChange={(e) => handleUpdate("cacheDuration", parseInt(e.target.value))}
                  className="w-full px-3 py-2 bg-[var(--bg)] border border-[var(--border)] rounded-lg text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
                />
                <p className="text-xs text-[var(--text-muted)] mt-2">
                  How long browsers should cache this page (0 = no cache)
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
