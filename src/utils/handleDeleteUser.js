export const handleDeleteUser = async (
  userId,
  mutate,
  getAllUsersURL,
  message,
  setIsModalVisible
) => {
  try {
    await fetch(`http://localhost:5000/api/user/delete/${userId}`, {
      method: "DELETE",
    });
    message.success("User deleted successfully!");
    mutate(getAllUsersURL); // Re-fetch the list of all users after deletion
    setIsModalVisible(false); // Close the modal
  } catch (error) {
    message.error("Failed to delete user.");
  }
};
