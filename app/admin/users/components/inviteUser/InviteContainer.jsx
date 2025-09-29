"use client";
import { useState } from "react";
import InviteForm from "./InviteForm";
import InviteModal from "./InviteModal";
import { UserService } from "@/features/users/userService";

export default function InviteContainer({ onUserCreated }) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    email: "",
    role: "EDITOR",
  });

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => {
    setIsOpen(false);
    setError(null);
    setFormData({ email: "", role: "EDITOR" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const result = await UserService.inviteUser(
        formData.email,
        formData.role
      );

      if (result.success) {
        // You can use the onUserCreated callback to show a success message
        // or update a list of pending invitations.
        onUserCreated({
          email: formData.email,
          role: formData.role,
          status: "INVITED",
        });
        handleClose();
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
    <div>
      <button
        onClick={handleOpen}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        + Invite User
      </button>

      <InviteModal isOpen={isOpen} onClose={handleClose}>
        <h2 className="text-xl font-bold mb-4">Invite New User</h2>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        <InviteForm
          onSubmit={handleSubmit}
          onCancel={handleClose}
          formData={formData}
          setFormData={setFormData}
          loading={loading}
        />
      </InviteModal>
    </div>
  );
}
