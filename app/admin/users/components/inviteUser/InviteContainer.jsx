"use client";
import { useState } from "react";
import { HiOutlineUserAdd, HiOutlineMail } from "react-icons/hi";
import InviteForm from "./InviteForm";
import InviteModal from "./InviteModal";
import { UserService } from "@/features/users/services/userService";

export default function InviteContainer({
  onUserCreated,
  loading,
  setLoading,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [formData, setFormData] = useState({
    email: "",
    role: "EDITOR",
    name: "",
  });

  const handleOpen = () => {
    setIsOpen(true);
    setError(null);
    setSuccess(null);
  };

  const handleClose = () => {
    setIsOpen(false);
    setError(null);
    setSuccess(null);
    setFormData({ email: "", role: "EDITOR", name: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const result = await UserService.inviteUser(
        formData.email,
        formData.role,
        formData.name
      );

      if (result.success) {
        setSuccess("Invitation sent successfully!");
        onUserCreated({
          email: formData.email,
          role: formData.role,
          name: formData.name,
          status: "INVITED",
          id: result.data?.id || Date.now(),
          isActive: false,
          createdAt: new Date().toISOString(),
        });

        // Close modal after 1.5 seconds
        setTimeout(() => {
          handleClose();
        }, 1500);
      } else {
        setError(result.message || "Failed to send invitation.");
      }
    } catch (err) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={handleOpen}
        className="flex items-center bg-[var(--primary)] text-[var(--primary-contrast)] space-x-2 px-4 py-2 rounded-lg transition-colors font-medium"
      >
        <HiOutlineUserAdd className="w-4 h-4" />
        <span>Invite User</span>
      </button>

      <InviteModal isOpen={isOpen} onClose={handleClose}>
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-center space-x-3">
            <div
              className="p-2 rounded-lg"
              style={{ backgroundColor: "var(--primary)/10" }}
            >
              <HiOutlineMail
                className="w-6 h-6"
                style={{ color: "var(--primary)" }}
              />
            </div>
            <div>
              <h2
                className="text-xl font-bold"
                style={{ color: "var(--text)" }}
              >
                Invite New User
              </h2>
              <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                Send an invitation to join your team
              </p>
            </div>
          </div>

          {/* Success Message */}
          {success && (
            <div
              className="p-4 rounded-lg border flex items-center space-x-2"
              style={{
                backgroundColor: "var(--success)/10",
                borderColor: "var(--success)/20",
                color: "var(--success)",
              }}
            >
              <HiOutlineMail className="w-5 h-5" />
              <span>{success}</span>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div
              className="p-4 rounded-lg border"
              style={{
                backgroundColor: "var(--error)/10",
                borderColor: "var(--error)/20",
                color: "var(--error)",
              }}
            >
              {error}
            </div>
          )}

          {/* Form */}
          <InviteForm
            onSubmit={handleSubmit}
            onCancel={handleClose}
            formData={formData}
            setFormData={setFormData}
            loading={loading}
          />
        </div>
      </InviteModal>
    </>
  );
}
