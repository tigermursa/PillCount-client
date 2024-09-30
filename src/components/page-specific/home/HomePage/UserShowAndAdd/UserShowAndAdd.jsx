"use client";

import { useState } from "react";
import { Form } from "antd"; // Select imported here
import { PlusOutlined } from "@ant-design/icons";
import useSWR, { mutate } from "swr"; // Import mutate for re-fetching
import { fetcher, createUser } from "@/utils/userAPI"; // Ensure correct path
import UserCard from "@/components/others/UserCard/UserCard";
import { toast } from "react-toastify"; // Import toast
import LoaderA from "@/components/ui/Loader/LoaderA/LoaderA";
import UserCreateModal from "./UserCreateModal";

const getAllUsersURL = "http://localhost:5000/api/user/get/all"; // Updated URL

const avaters = [
  {
    id: "1",
    icon: "https://res.cloudinary.com/dvwmhlyd6/image/upload/v1727707753/icon-demo/mother_cbayex.webp",
  },
  {
    id: "2",
    icon: "https://res.cloudinary.com/dvwmhlyd6/image/upload/v1727707667/icon-demo/father_upk5kd.webp",
  },
  {
    id: "3",
    icon: "https://res.cloudinary.com/dvwmhlyd6/image/upload/v1727707545/icon-demo/granpa_y2mrww.webp",
  },
  {
    id: "4",
    icon: "https://res.cloudinary.com/dvwmhlyd6/image/upload/v1727707544/icon-demo/littlebrother_i0dhtc.webp",
  },
  {
    id: "5",
    icon: "https://res.cloudinary.com/dvwmhlyd6/image/upload/v1727707544/icon-demo/sister_epad6l.webp",
  },
  {
    id: "6",
    icon: "https://res.cloudinary.com/dvwmhlyd6/image/upload/v1727707544/icon-demo/usericon_v73sbp.webp",
  },
  {
    id: "7",
    icon: "https://res.cloudinary.com/dvwmhlyd6/image/upload/v1727707544/icon-demo/granma_jlawu7.webp",
  },
  {
    id: "8",
    icon: "https://res.cloudinary.com/dvwmhlyd6/image/upload/v1727707544/icon-demo/bigbrother_vrw9ay.webp",
  },
];

const UserShowAndAdd = () => {
  const { data: users, error } = useSWR(getAllUsersURL, fetcher);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  // Show modal
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      await createUser(values);
      form.resetFields();
      setIsModalVisible(false);

      // Revalidate the users list after creating a new user
      mutate(getAllUsersURL); // This will re-fetch the users list in real-time

      // Show success toast without any icons
      toast.success("User created successfully!");
    } catch (error) {
      toast.error("Failed to create user. Please try again.");
      console.error(error);
    }
  };

  // Handle cancel
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  if (error) return <div>Error loading user data</div>;
  if (!users)
    return (
      <div>
        <LoaderA />
      </div>
    );

  return (
    <div className="flex flex-wrap space-x-8 justify-center mt-10">
      {/* Display user cards for each user */}
      {users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
      {/* Plus card to add new user */}
      <div
        className="border rounded-lg shadow-lg p-4 w-40 h-40 flex justify-center items-center cursor-pointer bg-white"
        onClick={showModal}
      >
        <PlusOutlined style={{ fontSize: "32px" }} />
      </div>
      {/* Modal to add new user */}
      , ,
      <UserCreateModal
        form={form}
        isModalVisible={isModalVisible}
        handleOk={handleOk}
        handleCancel={handleCancel}
        avaters={avaters}
      />
    </div>
  );
};

export default UserShowAndAdd;
