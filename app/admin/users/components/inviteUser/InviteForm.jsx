"use client";
import { HiOutlineMail, HiOutlineUser, HiOutlineUserGroup } from "react-icons/hi";

export default function InviteForm({ onSubmit, onCancel, formData, setFormData, loading }) {
  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const roleOptions = [
    { value: "EDITOR", label: "Editor", description: "Can create and edit content" },
    { value: "ADMIN", label: "Admin", description: "Full access to all features" },
    { value: "VIEWER", label: "Viewer", description: "Can only view content" },
  ];

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {/* Name Field */}
      <div>
        <label
          className="block text-sm font-medium mb-2"
          style={{ color: "var(--text)" }}
        >
          Full Name (Optional)
        </label>
        <div className="relative">
          <HiOutlineUser
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4"
            style={{ color: "var(--text-muted)" }}
          />
          <input
            type="text"
            placeholder="Enter full name"
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors"
            style={{
              backgroundColor: "var(--bg)",
              borderColor: "var(--border)",
              color: "var(--text)",
            }}
          />
        </div>
      </div>

      {/* Email Field */}
      <div>
        <label
          className="block text-sm font-medium mb-2"
          style={{ color: "var(--text)" }}
        >
          Email Address *
        </label>
        <div className="relative">
          <HiOutlineMail
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4"
            style={{ color: "var(--text-muted)" }}
          />
          <input
            type="email"
            placeholder="Enter email address"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            required
            className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors"
            style={{
              backgroundColor: "var(--bg)",
              borderColor: "var(--border)",
              color: "var(--text)",
            }}
          />
        </div>
      </div>

      {/* Role Field */}
      <div>
        <label
          className="block text-sm font-medium mb-2"
          style={{ color: "var(--text)" }}
        >
          Role *
        </label>
        <div className="space-y-3">
          {roleOptions.map((role) => (
            <label
              key={role.value}
              className={`flex items-start space-x-3 p-3 border rounded-lg cursor-pointer transition-colors ${
                formData.role === role.value ? 'ring-2' : ''
              }`}
              style={{
                borderColor: formData.role === role.value ? "var(--primary)" : "var(--border)",
                backgroundColor: formData.role === role.value ? "var(--primary)/5" : "var(--surface)",
                ...(formData.role === role.value && { ringColor: "var(--primary)/30" }),
              }}
            >
              <input
                type="radio"
                name="role"
                value={role.value}
                checked={formData.role === role.value}
                onChange={(e) => handleChange("role", e.target.value)}
                className="mt-1"
                style={{ accentColor: "var(--primary)" }}
              />
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <HiOutlineUserGroup
                    className="w-4 h-4"
                    style={{ color: "var(--primary)" }}
                  />
                  <span
                    className="font-medium"
                    style={{ color: "var(--text)" }}
                  >
                    {role.label}
                  </span>
                </div>
                <p
                  className="text-sm mt-1"
                  style={{ color: "var(--text-muted)" }}
                >
                  {role.description}
                </p>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 pt-4">
        <button
          type="submit"
          disabled={loading || !formData.email}
          className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            backgroundColor: "var(--primary)",
            color: "white",
          }}
        >
          {loading ? (
            <>
              <div
                className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"
              />
              <span>Sending...</span>
            </>
          ) : (
            <>
              <HiOutlineMail className="w-4 h-4" />
              <span>Send Invitation</span>
            </>
          )}
        </button>
        
        <button
          type="button"
          onClick={onCancel}
          disabled={loading}
          className="flex-1 px-4 py-3 border rounded-lg font-medium transition-colors disabled:opacity-50"
          style={{
            borderColor: "var(--border)",
            backgroundColor: "var(--surface)",
            color: "var(--text-muted)",
          }}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
