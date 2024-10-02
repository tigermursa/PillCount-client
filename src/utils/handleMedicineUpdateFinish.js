export const handleMedicineUpdateFinish = async (
  userId,
  editMedicineId,
  values,
  mutate,
  singUserURL,
  message,
  setIsFormVisible
) => {
  try {
    await fetch(
      `http://localhost:5000/api/user/${userId}/medicine/${editMedicineId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      }
    );
    mutate(singUserURL); // Re-fetch the user's data
    message.success("Medicine updated successfully!");
    setIsFormVisible(false);
  } catch (error) {
    message.error("Failed to update medicine.");
  }
};
