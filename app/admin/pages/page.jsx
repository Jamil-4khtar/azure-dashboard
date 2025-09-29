import Link from "next/link";

export default async function PagesAdmin() {
  return (
    <main className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Pages</h1>
        <Link href="/admin/pages/new" className="px-3 py-2 border rounded-lg">
          + Create Page
        </Link>
      </div>

      <table className="w-full text-sm border rounded-lg overflow-hidden">
        <thead className="">
          <tr>
            <th className="text-left p-2 border-b">Slug</th>
            <th className="text-left p-2 border-b">Title</th>
            <th className="text-left p-2 border-b">Updated</th>
            <th className="text-left p-2 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {pages.map((p) => (
            <tr key={p.id} className=" even:bg-gray-50">
              <td className="p-2 border-b font-mono">{p.slug}</td>
              <td className="p-2 border-b">{p.title || "-"}</td>
              <td className="p-2 border-b">
                {new Date(p.updatedAt).toLocaleString()}
              </td>
              <td className="p-2 border-b">
                <Link
                  href={`/admin/pages/${p.id}/edit`}
                  className="px-2 py-1 border rounded"
                >
                  Edit
                </Link>
                <Link
                  href={p.slug}
                  className="ml-2 px-2 py-1 border rounded"
                  target="_blank"
                >
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
