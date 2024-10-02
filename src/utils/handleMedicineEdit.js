export const handleMedicineEdit = (
  medicine,
  setEditMedicine,
  setIsFormVisible,
  form
) => {
  setEditMedicine(medicine);
  setIsFormVisible(true);
  form.setFieldsValue({
    name: medicine.name,
    totalTablets: medicine.totalTablets,
    tabletsToTake: medicine.tabletsToTake,
    price: medicine.price,
  });
};
