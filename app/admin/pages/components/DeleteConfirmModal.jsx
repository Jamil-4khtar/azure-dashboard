"use client";

import React from "react";
import {
  HiOutlineExclamationTriangle,
  HiOutlineX,
} from "react-icons/hi";

export default function DeleteConfirmModal({ isOpen, onClose, onConfirm, pageTitle, isLoading = false }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-[var(--surface)] rounded-lg shadow-xl border border-[var(--border)] w-full max-w-md transform transition-all">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-[var(--border)]">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <HiOutlineExclamationTriangle className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-[var(--text)]">
                Delete Page
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-1 text-[var(--text-muted)] hover:text-[var(--text)] rounded transition-colors"
              disabled={isLoading}
            >
              <HiOutlineX className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            <p className="text-[var(--text)] mb-4">
              Are you sure you want to delete the page{' '}
              <span className="font-semibold">"{pageTitle}"</span>?
            </p>
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
              <p className="text-sm text-red-800">
                <strong>Warning:</strong> This action cannot be undone. The page and all its content will be permanently removed.
              </p>
            </div>
            <p className="text-sm text-[var(--text-muted)]">
              Consider archiving the page instead if you might need it later.
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 p-6 border-t border-[var(--border)]">
            <button
              onClick={onClose}
              disabled={isLoading}
              className="px-4 py-2 text-[var(--text)] bg-[var(--bg)] border border-[var(--border)] rounded-lg hover:bg-[var(--hover)] transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              disabled={isLoading}
              className="px-4 py-2 bg-[var(--error)] text-white rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  Deleting...
                </>
              ) : (
                'Delete Page'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
