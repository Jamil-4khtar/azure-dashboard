"use client";
import { useState } from "react";
import { UserService } from "@/features/users/userService";
import Input from "@/components/inputs/Input";

export default function InviteForm({ onSubmit, onCancel, formData, setFormData, loading }) {
  

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      

			<Input
				label={"Name"}
				type="text"
				value={formData?.name}
				onChange={(e) => setFormData({ ...formData, name: e.target.value })}
				required
			/>

      

			<Input
				label={"Email"}
				type="email"
				value={formData?.email}
				onChange={(e) => setFormData({ ...formData, email: e.target.value })}
				required
			/>

      

			<Input
				label={"Password"}
				type="password"
				value={formData?.password}
				onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
				required
				minLength={6}
			/>

      <div>
        <label className="block text-sm font-medium mb-1">Role</label>
        <select
          value={formData?.role}
          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option className="text-[var(--text)] bg-[var(--bg)]" value="EDITOR">Editor</option>
          <option className="text-[var(--text)] bg-[var(--bg)]" value="ADMIN">Admin</option>
        </select>
      </div>

      <div className="flex space-x-3 pt-4">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Creating..." : "Create User"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
