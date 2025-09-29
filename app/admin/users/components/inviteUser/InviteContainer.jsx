"use client";
import React, {useState} from 'react'
import InviteModal from './InviteModal';
import InviteForm from './InviteForm';
import { UserService } from '@/features/users/userService';

function InviteContainer({ loading, setLoading, onUserCreated}) {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		role: "EDITOR",
		password: "",
	});


	const handleFormSubmit = async (e) => {
		e.preventDefault();
    setLoading(true);
		
    try {
			const result = await UserService.createUser(formData);
			
      if (result.success) {
				setFormData({ name: "", email: "", role: "EDITOR", password: "" });
				setIsModalOpen(false);
				
        // Call callback to refresh user list
        if (onUserCreated) {
          onUserCreated(result.data);
        }

        alert("User created successfully!");
      }
    } catch (error) {
      console.error("Error creating user:", error);
      alert(error.message || "Failed to create user");
    } finally {
      setLoading(false);
    }

  };


	return (
		<div>
			<button
				onClick={() => setIsModalOpen(true)}
				className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
			>
				Add User
			</button>

			{isModalOpen && (
				<InviteModal
					isOpen={isModalOpen}
					onClose={() => setIsModalOpen(false)}
					title={"Add a User"}
				>
					<InviteForm
						onSubmit={handleFormSubmit}
						onCancel={() => setIsModalOpen(false)}
						formData={formData}
						setFormData={setFormData}
						loading={loading}
					/>
				</InviteModal>
			)}


		</div>
	)
}

export default InviteContainer