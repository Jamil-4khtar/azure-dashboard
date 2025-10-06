"use client";
import React, { useState } from "react";
import Link from "next/link";
import ThemeToggle from "@/features/Theme/ThemeToggle";
import UserDropdown from "./UserDropdown";
import { HiOutlineBell, HiOutlineMenu } from "react-icons/hi";
import Image from "next/image";

function DashboardHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="border-b sticky top-0 z-40 bg-[var(--surface)]/50 backdrop-blur-2xl border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left side */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 transition-colors text-[var(--text-muted)] hover:[var(--text)]"
            >
              <HiOutlineMenu className="w-5 h-5" />
            </button>

            <h1 className="text-xl md:text-2xl font-bold text-[var(--text)]">
              <div className={`size-[70px] filter-[var(--logo-filter)]`}>
                <Image
                  src="azure-logo.svg" // Your SVG path
                  alt="companyLogo"
                  fill
                />
              </div>
            </h1>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-4 ml-8">
              <Link
                href="/admin"
                className="px-3 py-2 text-sm text-[var(--primary)] font-medium border-b-2 border-[var(--primary)] transition-colors"
              >
                Dashboard
              </Link>
              <Link
                href="/admin/pages"
                className="px-3 py-2 text-sm text-[var(--text-muted)] hover:text-[var(--text)] font-medium transition-colors"
              >
                Pages
              </Link>
              <Link
                href="/admin/users"
                className="px-3 py-2 text-sm text-[var(--text-muted)] hover:text-[var(--text)] font-medium transition-colors"
              >
                Users
              </Link>
              <Link
                href="/admin/media"
                className="px-3 py-2 text-sm text-[var(--text-muted)] hover:text-[var(--text)] font-medium transition-colors"
              >
                Media
              </Link>
              <Link
                href="/admin/settings"
                className="px-3 py-2 text-sm text-[var(--text-muted)] hover:text-[var(--text)] font-medium transition-colors"
              >
                Settings
              </Link>
              {/* Add other nav links with same pattern */}
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
          <div
            className={`md:hidden fixed bg-[var(--surface)] h-dvh w-full border-t border-[var(--border)] `}
          >
            {/* Mobile nav content with same styling pattern */}

            <nav className="px-4 py-2 space-y-1 ">
              <Link
                href="/admin"
                className="block text-[var(--text-muted)] hover:text-[var(--text)] px-3 py-2 text-sm font-medium transition-colors"
              >
                Dashboard
              </Link>

              <Link
                href="/admin/pages"
                className="block text-[var(--text-muted)] hover:text-[var(--text)] px-3 py-2 text-sm font-medium transition-colors"
              >
                Pages
              </Link>
              <Link
                href="/admin/users"
                className="block text-[var(--text-muted)] hover:text-[var(--text)] px-3 py-2 text-sm font-medium transition-colors"
              >
                Users
              </Link>
              <Link
                href="/admin/media"
                className="block text-[var(--text-muted)] hover:text-[var(--text)] px-3 py-2 text-sm font-medium transition-colors"
              >
                Media
              </Link>
              <Link
                href="/admin/settings"
                className="block text-[var(--text-muted)] hover:text-[var(--text)] px-3 py-2 text-sm font-medium transition-colors"
              >
                Settings
              </Link>
            </nav>
          </div>
        </>
      )}
    </header>
  );
}

export default DashboardHeader;
