"use client"

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { 
  HiOutlineUser, 
  HiOutlineCog, 
  HiOutlineLogout,
  HiOutlineChevronDown
} from "react-icons/hi";
import { useAuth } from "@/features/Auth/AuthContext";
import SignOutButton from "@/features/Auth/SignOutButton";

export default function UserDropdown() {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const userInitial = (user?.name || user?.email)?.charAt(0).toUpperCase();
  const userName = user?.name || user?.email;
  const userRole = user?.role || 'Admin';

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-3 text-sm rounded-lg p-2 transition-colors"
        style={{
          '--hover-bg': 'var(--hover)'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'var(--hover)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'transparent';
        }}
      >
        <div 
          className="w-8 h-8 rounded-full flex items-center justify-center"
          style={{ backgroundColor: 'var(--primary)' }}
        >
          <span 
            className="text-sm font-medium"
            style={{ color: 'var(--primary-contrast)' }}
          >
            {userInitial}
          </span>
        </div>
        <div className="hidden sm:flex flex-col text-left">
          <span 
            className="font-medium"
            style={{ color: 'var(--text)' }}
          >
            {userName}
          </span>
          <span 
            className="capitalize text-xs"
            style={{ color: 'var(--text-muted)' }}
          >
            {userRole}
          </span>
        </div>
        <HiOutlineChevronDown 
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          style={{ color: 'var(--text-muted)' }}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div 
          className="absolute right-0 mt-2 w-56 rounded-lg border py-2 z-50"
          style={{
            backgroundColor: 'var(--surface)',
            borderColor: 'var(--border)',
            boxShadow: 'var(--shadow-md)'
          }}
        >
          {/* User Info Section */}
          <div 
            className="px-4 py-3 border-b"
            style={{ borderColor: 'var(--border)' }}
          >
            <div className="flex items-center space-x-3">
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ backgroundColor: 'var(--primary)' }}
              >
                <span 
                  className="font-medium"
                  style={{ color: 'var(--primary-contrast)' }}
                >
                  {userInitial}
                </span>
              </div>
              <div>
                <p 
                  className="text-sm font-medium"
                  style={{ color: 'var(--text)' }}
                >
                  {userName}
                </p>
                <p 
                  className="text-xs capitalize"
                  style={{ color: 'var(--text-muted)' }}
                >
                  {userRole}
                </p>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="py-1">
            <Link
              href="/admin/profile"
              onClick={() => setIsOpen(false)}
              className="flex items-center px-4 py-2 text-sm transition-colors"
              style={{ color: 'var(--text)' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--hover)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              <HiOutlineUser className="w-4 h-4 mr-3" />
              View Profile
            </Link>
            
            <Link
              href="/admin/profile/edit"
              onClick={() => setIsOpen(false)}
              className="flex items-center px-4 py-2 text-sm transition-colors"
              style={{ color: 'var(--text)' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--hover)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              <HiOutlineUser className="w-4 h-4 mr-3" />
              Edit Profile
            </Link>

            <Link
              href="/admin/settings/account"
              onClick={() => setIsOpen(false)}
              className="flex items-center px-4 py-2 text-sm transition-colors"
              style={{ color: 'var(--text)' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--hover)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              <HiOutlineCog className="w-4 h-4 mr-3" />
              Account Settings
            </Link>
          </div>

          {/* Divider */}
          <div 
            className="border-t my-1"
            style={{ borderColor: 'var(--border)' }}
          ></div>

          {/* Sign Out */}
          <div className="py-1">
            <div 
              onClick={() => setIsOpen(false)}
              className="flex items-center px-4 py-2 text-sm cursor-pointer transition-colors"
              style={{ color: 'var(--error)' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(220, 38, 38, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              <HiOutlineLogout className="w-4 h-4 mr-3" />
              <SignOutButton 
                className=""
                style={{ color: 'var(--error)' }}
                showIcon={false}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
