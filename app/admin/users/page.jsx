"use client";
import InviteForm from "./InviteForm";
import { useEffect, useState } from "react";
import SignOutButton from "@/features/Auth/SignOutButton";
import { useAuth } from "@/features/Auth/AuthContext";

export default function UsersPage() {
  const { user } = useAuth();
  // if (!session) redirect("/login?callbackUrl=/admin/users");
  if (user?.role !== "ADMIN") redirect("/admin");

  const [users, setUsers] = useState(null);

  useEffect(() => {
    async function getUsers() {
      const res = await prisma.user.findMany({
        orderBy: { createdAt: "desc" },
      });
      setUsers(res);
    }
    getUsers();
  }, []);

  return (
    <main className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Users</h1>
        <InviteForm />
        <SignOutButton />
      </div>

      <table className="w-full text-sm border rounded-lg overflow-hidden">
        <thead className="bg-gray-600">
          <tr>
            <th className="text-left p-2 border-b">Email</th>
            <th className="text-left p-2 border-b">Name</th>
            <th className="text-left p-2 border-b">Role</th>
            <th className="text-left p-2 border-b">Verified</th>
            <th className="text-left p-2 border-b">Status</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((u) => (
              <tr key={u.id} className="">
                <td className="p-2 border-b">{u.email}</td>
                <td className="p-2 border-b">{u.name || "-"}</td>
                <td className="p-2 border-b">{u.role}</td>
                <td className="p-2 border-b">
                  {u.emailVerified ? "Yes" : "No"}
                </td>
                <td className="p-2 border-b">
                  {u.isActive ? "Active" : "Disabled"}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </main>
  );
}
