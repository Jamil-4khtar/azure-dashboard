"use client";

import React, { useState } from "react";
import {
  HiOutlineTrash,
  HiOutlineArchive,
  HiOutlineEye,
  HiOutlineDuplicate,
  HiOutlineDownload,
  HiOutlineTag,
  HiOutlineX,
  HiOutlineChevronDown,
} from "react-icons/hi";

export default function BulkActions({ selectedCount, onBulkAction, isOpen, setIsOpen }) {
  const [actionDropdownOpen, setActionDropdownOpen] = useState(false);

  const bulkActionOptions = [
    {
      label: "Publish Selected",
      value: "publish",
      icon: HiOutlineEye,
      color: "green",
      description: "Make selected pages live",
    },
    {
      label: "Move to Draft",
      value: "draft",
      icon: HiOutlineTag,
      color: "orange",
      description: "Convert to draft status",
    },
    {
      label: "Archive Selected",
      value: "archive",
      icon: HiOutlineArchive,
      color: "gray",
      description: "Move to archived status",
    },
    {
      label: "Duplicate Selected",
      value: "duplicate",
      icon: HiOutlineDuplicate,
      color: "blue",
      description: "Create copies of selected pages",
    },
    {
      label: "Export Selected",
      value: "export",
      icon: HiOutlineDownload,
      color: "purple",
      description: "Download as JSON/CSV",
    },
    {
      label: "Delete Selected",
      value: "delete",
      icon: HiOutlineTrash,
      color: "red",
      description: "Permanently remove pages",
    },
  ];

  const handleActionSelect = (action) => {
    onBulkAction(action);
    setActionDropdownOpen(false);
  };

  return (
    <div className="bg-[var(--primary)]/80 text-[var(--primary-contrast)]/80 rounded-lg p-4 mb-6 shadow-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="font-medium">
              {selectedCount} page{selectedCount !== 1 ? 's' : ''} selected
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <button
              onClick={() => setActionDropdownOpen(!actionDropdownOpen)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors backdrop-blur-sm border border-white/20"
            >
              <span>Bulk Actions</span>
              <HiOutlineChevronDown className={`w-4 h-4 transition-transform ${actionDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {actionDropdownOpen && (
              <div className="absolute right-0 top-12 w-64 bg-[var(--surface)] border border-[var(--border)] rounded-lg shadow-xl z-20">
                <div className="py-2">
                  {bulkActionOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleActionSelect(option.value)}
                      className={`flex items-start gap-3 w-full px-4 py-3 text-left hover:bg-[var(--hover)] transition-colors ${
                        option.color === 'red' ? 'text-[var(--error)]' : 'text-[var(--text)]'
                      }`}
                    >
                      <option.icon className={`w-5 h-5 mt-0.5 ${
                        option.color === 'green' ? 'text-green-600' :
                        option.color === 'orange' ? 'text-orange-600' :
                        option.color === 'gray' ? 'text-gray-600' :
                        option.color === 'blue' ? 'text-blue-600' :
                        option.color === 'purple' ? 'text-purple-600' :
                        'text-red-600'
                      }`} />
                      <div>
                        <div className="font-medium">{option.label}</div>
                        <div className="text-xs text-[var(--text-muted)] mt-1">
                          {option.description}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <button
            onClick={() => {
              onBulkAction('clear');
              setActionDropdownOpen(false);
            }}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            title="Clear selection"
          >
            <HiOutlineX className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
