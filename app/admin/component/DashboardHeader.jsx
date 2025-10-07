"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "@/features/Theme/ThemeToggle";
import UserDropdown from "./UserDropdown";
import { HiOutlineBell, HiOutlineMenu } from "react-icons/hi";
import Image from "next/image";

function DashboardHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Navigation items with active state logic
  const navItems = [
    { href: "/admin", label: "Dashboard" },
    { href: "/admin/pages", label: "Pages" },
    { href: "/admin/users", label: "Users" },
    { href: "/admin/media", label: "Media" },
    { href: "/admin/settings", label: "Settings" },
  ];

  const isActiveLink = (href) => {
    if (href === "/admin") {
      return pathname === "/admin";
    }
    return pathname.startsWith(href);
  };

  return (
    <header className="border-b sticky top-0 z-40 bg-[var(--surface)]/50 backdrop-blur-2xl border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left side */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 transition-colors text-[var(--text-muted)] hover:text-[var(--text)]"
            >
              <HiOutlineMenu className="w-5 h-5" />
            </button>

            <Link href="/admin" className="flex items-center">
              <div className="relative w-[70px] h-[70px] filter-[var(--logo-filter)]">
                <Image
                  src="/azure-logo.svg" // Fixed: Added leading slash for absolute path
                  alt="Company Logo"
                  fill
                  className="object-contain"
                  priority // Add priority for above-the-fold images
                />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-4 ml-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-2 text-sm font-medium transition-colors ${
                    isActiveLink(item.href)
                      ? "text-[var(--primary)] border-b-2 border-[var(--primary)]"
                      : "text-[var(--text-muted)] hover:text-[var(--text)]"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-3">
            <button className="p-2 relative transition-colors text-[var(--text-muted)] hover:text-[var(--text)]">
              <HiOutlineBell className="w-5 h-5" />
              <span
                className="absolute -top-1 -right-1 w-3 h-3 rounded-full"
                style={{ backgroundColor: "var(--error)" }}
              ></span>
            </button>

            <ThemeToggle />
            <UserDropdown />
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="md:hidden fixed inset-0 bg-black/20 z-30"
            onClick={() => setMobileMenuOpen(false)}
          />
          
          {/* Mobile Menu */}
          <div className="md:hidden fixed top-16 left-0 right-0 bg-[var(--surface)] border-t border-[var(--border)] z-40 shadow-lg">
            <nav className="px-4 py-2 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-3 py-2 text-sm font-medium transition-colors rounded-lg ${
                    isActiveLink(item.href)
                      ? "text-[var(--primary)] bg-[var(--primary)]/10"
                      : "text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--hover)]"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </>
      )}
    </header>
  );
}

export default DashboardHeader;
