export const handleMedicineDelete = async (
  userId,
  medicineId,
  mutate,
  singUserURL,
  message
) => {
  try {
    await fetch(
      `http://localhost:5000/api/user/${userId}/medicine/delete/${medicineId}`,
      {
        method: "DELETE",
      }
    );
    mutate(singUserURL); // Re-fetch the updated list of medicines
    message.success("Medicine deleted successfully!");
  } catch (error) {
    message.error("Failed to delete medicine.");
  }
};
