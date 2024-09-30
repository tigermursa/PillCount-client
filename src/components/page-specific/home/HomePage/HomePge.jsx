"use client";

import React, { useState } from "react";
import { Modal, Form, Input, InputNumber } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import useSWR, { mutate } from "swr"; // Import mutate
import { fetcher, createUser } from "@/utils/userAPI"; // Ensure correct path
import UserCard from "@/components/others/UserCard/UserCard";
import { toast } from "react-toastify"; // Import toast
import LoaderA from "@/components/ui/Loader/LoaderA/LoaderA";

const getAllUsersURL = "http://localhost:5000/api/user/get/all"; // Updated URL

const HomePge = () => {
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
      <Modal
        title="Add New User"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{ name: "", age: null, relation: "" }}
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please input the name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="age"
            label="Age"
            rules={[{ required: true, message: "Please input the age!" }]}
          >
            <InputNumber min={0} className="w-full" />
          </Form.Item>
          <Form.Item
            name="relation"
            label="Relation"
            rules={[{ required: true, message: "Please input the relation!" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default HomePge;
