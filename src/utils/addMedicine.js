export const addMedicine = async (
  userId,
  values,
  mutate,
  message,
  setIsFormVisible
) => {
  try {
    await fetch(`http://localhost:5000/api/medicine/${userId}/medicine`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    mutate(); // Re-fetch data after adding the medicine
    message.success("Medicine added successfully!");
    setIsFormVisible(false); // Close the form
  } catch (error) {
    message.error("Failed to add medicine.");
  }
};
