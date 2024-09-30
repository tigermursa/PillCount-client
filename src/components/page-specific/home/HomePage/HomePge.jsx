"use client";

import React, { useState } from "react";
import { Modal, Form, Input, InputNumber } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import useSWR from "swr";
import { fetcher, createUser } from "@/utils/userAPI"; // Ensure correct path
import UserCard from "@/components/others/UserCard/UserCard";
import { toast } from "react-toastify"; // Import toast

const getUserURL = "http://localhost:5000/api/user/66f9b99e9467be90f9899b10";

const HomePge = () => {
  const { data: user, error } = useSWR(getUserURL, fetcher);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  // Show modal
  const showModal = () => {
    setIsModalVisible(true);
  };

  // Handle form submission to create a new user
  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      await createUser(values);
      form.resetFields();
      setIsModalVisible(false);
      toast.success("User created successfully!"); // Success toast
    } catch (error) {
      toast.error("Failed to create user. Please try again."); // Error toast
      console.error(error);
    }
  };

  // Handle cancel
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  if (error) return <div>Error loading user data</div>;
  if (!user) return <div>Loading...</div>;

  return (
    <div className="flex space-x-8 justify-center mt-10">
      {/* Display user card */}
      <UserCard user={user} />

      {/* Plus card to add new user */}
      <div
        className="border rounded-lg shadow-lg p-4 w-64 flex justify-center items-center cursor-pointer bg-white"
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
