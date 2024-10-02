export const onUpdateUserFinish = async (
  userId,
  values,
  mutate,
  getAllUsersURL,
  message,
  setIsUpdateFormVisible
) => {
  try {
    await fetch(`http://localhost:5000/api/user/update/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    mutate(getAllUsersURL); // Re-fetch the list of all users after updating
    message.success("User updated successfully!");
    setIsUpdateFormVisible(false); // Close the update form modal
  } catch (error) {
    message.error("Failed to update user.");
  }
};
