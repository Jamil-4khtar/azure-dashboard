"use client"

import Link from "next/link";
import SignOutButton from "@/features/Auth/SignOutButton";
import ThemeToggle from "@/features/Theme/ThemeToggle";
import { useAuth } from "@/features/Auth/AuthContext";

export default function AdminPage() {
  const {user} = useAuth();

  return (
    <main className="p-6 space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">CMS Admin</h1>
        <div className="flex items-center gap-3 text-sm text-gray-600">
          <ThemeToggle />
          <span>
            {user.name || user.email} · {user.role}
          </span>
          <SignOutButton />
        </div>
      </header>

      <div className="flex gap-3">
        <Link className="border rounded-lg px-3 py-2" href="/admin/pages">
          Pages
        </Link>
        <Link className="border rounded-lg px-3 py-2" href="/admin/media">
          Media
        </Link>
        <Link className="border rounded-lg px-3 py-2" href="/admin/settings">
          Settings
        </Link>
      </div>

      <section className="border rounded-xl p-4">
        <h3 className="font-semibold mb-2">What’s next</h3>
        <ol className="list-decimal list-inside text-sm text-gray-600 space-y-1">
          <li>
            Add content tables (Site / Page / PageVersion) and list pages here.
          </li>
          <li>
            Open the visual editor at <code>/admin/pages/[id]/edit</code>{" "}
            (iframe preview of <code>/{`[...slug]`}?editor=true</code>).
          </li>
        </ol>
      </section>
    </main>
  )
}
