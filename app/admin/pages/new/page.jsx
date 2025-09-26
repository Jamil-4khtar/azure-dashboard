"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewPage() {
  const [slug, setSlug] = useState("/");
  const [title, setTitle] = useState("");
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  async function onSubmit(e) {
    e.preventDefault();
    setSaving(true);
    const res = await fetch("/api/pages", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ slug, title }),
    }).then((r) => r.json());
    setSaving(false);
    if (res?.pageId) router.push(`/admin/pages/${res.pageId}/edit`);
  }

  return (
    <main className="p-6">
      <h1 className="text-xl font-semibold mb-4">Create Page</h1>
      <form onSubmit={onSubmit} className="max-w-md space-y-3">
        <div>
          <label className="block text-xs text-gray-600 mb-1">Slug</label>
          <input
            className="w-full border rounded px-3 py-2"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="/about"
          />
        </div>
        <div>
          <label className="block text-xs text-gray-600 mb-1">
            Title (optional)
          </label>
          <input
            className="w-full border rounded px-3 py-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="About"
          />
        </div>
        <button
          disabled={saving}
          className="px-4 py-2 border rounded bg-blue-600 text-white"
        >
          {saving ? "Creating..." : "Create & Edit"}
        </button>
      </form>
    </main>
  );
}
