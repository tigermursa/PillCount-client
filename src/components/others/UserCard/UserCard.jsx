import { useState } from "react";
import Image from "next/image";
import { Form, message, Select, Option } from "antd";

import useSWR, { mutate } from "swr";
import { avaters } from "@/data/avaterData";
//all 4 modals
import MainModal from "../Modals/MainModal";
import AddMedicineModal from "../Modals/AddMedicineModal";
import PriceInfroModal from "../Modals/PriceInfroModal";
import UpdateUserModal from "../Modals/UpdateUserModal";
import { handleMedicineDelete } from "@/utils/handleMedicineDelete";
import { handleMedicineEdit } from "@/utils/handleMedicineEdit";
import { handleMedicineUpdateFinish } from "@/utils/handleMedicineUpdateFinish";
import { onUpdateUserFinish } from "@/utils/onUpdateUserFinish";
import { addMedicine } from "@/utils/addMedicine";
import { handleDeleteUser } from "@/utils/handleDeleteUser";

const fetcher = (url) => fetch(url).then((res) => res.json());

const getAllUsersURL = "http://localhost:5000/api/user/get/all";
const defaultImageUrl =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZGm_sSq7ogWAjMwkg3wSab31ddsrjv852EA&s";

const UserCard = ({ user }) => {
  //all states
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isUpdateFormVisible, setIsUpdateFormVisible] = useState(false);
  const [isPriceVisible, setIsPriceVisible] = useState(false);
  const [isMedicineUpdateVisible, setIsMedicineUpdateVisible] = useState(false); // Toggle for medicine update buttons
  const [editMedicine, setEditMedicine] = useState(null); // Store the medicine being edited
  const [form] = Form.useForm(); // To handle form data

  // SWR for fetching single user data
  const { data, error } = useSWR(
    isModalVisible ? `http://localhost:5000/api/user/${user._id}` : null,
    fetcher
  );
  // SWR for fetching single users medprice data
  // eslint-disable-next-line no-unused-vars
  const { data: medicineInfo, error: medError } = useSWR(
    isModalVisible
      ? `http://localhost:5000/api/user/${user._id}/medicines`
      : null,
    fetcher
  );

  console.log(medicineInfo);

  const singUserURL = `http://localhost:5000/api/user/${user._id}`;
  // Revalidate the users list after creating a new user
  mutate(singUserURL); // This will re-fetch the users list in real-time
  const avatar = avaters.find((avatar) => avatar.id === user.image);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setIsMedicineUpdateVisible(false);
    setIsPriceVisible(false);
  };
  const handleClosePriceModal = () => {
    setIsPriceVisible(false);
  };

  const handleFormCancel = () => {
    setIsFormVisible(false);
    setIsUpdateFormVisible(false);
  };

  const deleteUser = async () => {
    await handleDeleteUser(
      user._id,
      mutate,
      getAllUsersURL,
      message,
      setIsModalVisible
    );
  };

  const onFinish = async (values) => {
    await addMedicine(user._id, values, mutate, message, setIsFormVisible);
  };

  const updateUser = async (values) => {
    await onUpdateUserFinish(
      user._id,
      values,
      mutate,
      getAllUsersURL,
      message,
      setIsUpdateFormVisible
    );
  };

  const updateMedicine = async (values) => {
    await handleMedicineUpdateFinish(
      user._id,
      editMedicine._id,
      values,
      mutate,
      singUserURL,
      message,
      setIsFormVisible
    );
  };

  const deleteMedicine = (medicineId) => {
    handleMedicineDelete(user._id, medicineId, mutate, singUserURL, message);
  };

  const editMedicines = (medicine) => {
    handleMedicineEdit(medicine, setEditMedicine, setIsFormVisible, form);
  };
  const showUpdateModal = () => {
    setIsUpdateFormVisible(true);
    form.setFieldsValue({
      name: user.name,
      age: user.age,
      relation: user.relation,
    });
  };
  const showPriceModal = () => {
    setIsPriceVisible(true);
    form.setFieldsValue({
      name: user.name,
      age: user.age,
      relation: user.relation,
    });
  };

  //1 props for main modal
  const mainModalProps = {
    user,
    isModalVisible,
    handleCancel,
    error,
    data,
    setIsFormVisible,
    showUpdateModal,
    showPriceModal,
    setIsMedicineUpdateVisible,
    isMedicineUpdateVisible,
    deleteUser,
    deleteMedicine,
    editMedicines,
  };

  //2 props for add medicine modal
  const addMedicineModalProps = {
    editMedicine,
    isFormVisible,
    handleFormCancel,
    form,
    updateMedicine,
    onFinish,
    Select,
    Option,
  };

  //3 props for priceinfo modal
  const priceInfoModalProps = {
    isPriceVisible,
    handleClosePriceModal,
    medicineInfo,
  };

  //4 props for update user modal
  const updateUserModalProps = {
    isUpdateFormVisible,
    handleFormCancel,
    updateUser,
    form,
  };

  return (
    <>
      <div
        className="border rounded-lg shadow-lg p-4 w-40 h-40 bg-white cursor-pointer hover:shadow-xl"
        onClick={showModal}
      >
        <Image
          src={avatar ? avatar.icon : defaultImageUrl}
          alt={user.name}
          width={600}
          height={600}
          className="h-16 w-16 rounded-full mx-auto mb-4"
        />
        <div className="text-center">
          <h3 className="text-lg font-semibold truncate">{user.relation}</h3>
        </div>
      </div>

      {/*1 Main Modal */}
      <MainModal mainModalProps={mainModalProps} />

      {/*2 Add Medicine Form Modal */}
      <AddMedicineModal addMedicineModalProps={addMedicineModalProps} />

      {/*3 // Price modal */}
      <PriceInfroModal priceInfoModalProps={priceInfoModalProps} />

      {/*4 Update User Form Modal */}
      <UpdateUserModal updateUserModalProps={updateUserModalProps} />
    </>
  );
};

export default UserCard;
