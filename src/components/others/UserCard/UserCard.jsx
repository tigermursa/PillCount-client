import { useState } from "react";
import Image from "next/image";
import { Modal, Table, Button, Form, Input, message, Popconfirm } from "antd";
import {
  PlusOutlined,
  DeleteOutlined,
  EditOutlined,
  ArrowUpOutlined,
} from "@ant-design/icons";
import useSWR, { mutate } from "swr";
import { avaters } from "@/data/avaterData";

const fetcher = (url) => fetch(url).then((res) => res.json());

const getAllUsersURL = "http://localhost:5000/api/user/get/all";
const defaultImageUrl =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZGm_sSq7ogWAjMwkg3wSab31ddsrjv852EA&s";

const UserCard = ({ user }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isUpdateFormVisible, setIsUpdateFormVisible] = useState(false);
  const [isMedicineUpdateVisible, setIsMedicineUpdateVisible] = useState(false); // Toggle for medicine update buttons
  const [editMedicine, setEditMedicine] = useState(null); // Store the medicine being edited
  const [form] = Form.useForm(); // To handle form data

  // SWR for fetching single user data
  const { data, error } = useSWR(
    isModalVisible ? `http://localhost:5000/api/user/${user._id}` : null,
    fetcher
  );

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
  };

  const handleFormCancel = () => {
    setIsFormVisible(false);
    setIsUpdateFormVisible(false);
  };

  const handleDelete = async () => {
    try {
      await fetch(`http://localhost:5000/api/user/delete/${user._id}`, {
        method: "DELETE",
      });
      message.success("User deleted successfully!");
      mutate(getAllUsersURL); // Re-fetch the list of all users after deletion
      setIsModalVisible(false); // Close the modal
    } catch (error) {
      message.error("Failed to delete user.");
    }
  };

  const onFinish = async (values) => {
    try {
      await fetch(`http://localhost:5000/api/medicine/${user._id}/medicine`, {
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

  const onUpdateUserFinish = async (values) => {
    try {
      await fetch(`http://localhost:5000/api/user/update/${user._id}`, {
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

  const handleMedicineEdit = (medicine) => {
    setEditMedicine(medicine);
    setIsFormVisible(true); // Open the form for editing
    form.setFieldsValue({
      name: medicine.name,
      totalTablets: medicine.totalTablets,
      tabletsToTake: medicine.tabletsToTake,
      price: medicine.price,
    });
  };

  const handleMedicineUpdateFinish = async (values) => {
    try {
      await fetch(
        `http://localhost:5000/api/user/${user._id}/medicine/${editMedicine._id}`,
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

  const handleMedicineDelete = async (medicineId) => {
    try {
      await fetch(
        `http://localhost:5000/api/user/${user._id}/medicine/delete/${medicineId}`,
        { method: "DELETE" }
      );
      mutate(singUserURL); // Re-fetch the updated list of medicines
      message.success("Medicine deleted successfully!");
    } catch (error) {
      message.error("Failed to delete medicine.");
    }
  };

  const showUpdateModal = () => {
    setIsUpdateFormVisible(true);
    form.setFieldsValue({
      name: user.name,
      age: user.age,
      relation: user.relation,
    });
  };

  const medicineColumns = [
    {
      title: "Medicine Name",
      dataIndex: "name",
      key: "name",
      align: "center",
    },
    {
      title: "Days Remaining",
      key: "daysRemaining",
      align: "center",
      render: (record) => {
        return Math.floor(record.totalTablets / record.tabletsToTake);
      },
    },
    {
      title: "Tablets Remaining",
      dataIndex: "totalTablets",
      align: "center",
    },
    {
      title: "Taking",
      dataIndex: "tabletsToTake",
      align: "center",
    },
    isMedicineUpdateVisible
      ? {
          title: "Actions",
          key: "actions",
          align: "center",
          render: (medicine) => (
            <div>
              <Button
                icon={<EditOutlined />}
                onClick={() => handleMedicineEdit(medicine)}
                style={{ marginRight: "8px" }}
              />
              <Popconfirm
                title="Are you sure to delete this medicine?"
                onConfirm={() => handleMedicineDelete(medicine._id)}
                okText="Yes"
                cancelText="No"
              >
                <Button icon={<DeleteOutlined />} danger />
              </Popconfirm>
            </div>
          ),
        }
      : {},
  ];

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

      {/* Medicine Information Modal */}
      <Modal
        title={
          <div className="text font-semibold mb-4">My {user?.relation}</div>
        }
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        {error ? (
          <p>Error loading data...</p>
        ) : !data ? (
          <p>Loading...</p>
        ) : (
          <>
            <Table
              dataSource={data.medicines}
              columns={medicineColumns}
              rowKey="_id"
              pagination={false}
            />

            <div className="flex justify-end gap-4 mt-4">
              <Button
                type="dashed"
                icon={<PlusOutlined />}
                onClick={() => setIsFormVisible(true)}
                style={{ marginBottom: "1rem" }}
              >
                Add Medicine
              </Button>
              <Button
                icon={<ArrowUpOutlined />}
                onClick={showUpdateModal}
                type="dashed"
              >
                Profile
              </Button>
              <Button
                type="dashed"
                onClick={() =>
                  setIsMedicineUpdateVisible(!isMedicineUpdateVisible)
                }
              >
                Update Medicine
              </Button>
              <Popconfirm
                title="Are you sure to delete this user?"
                onConfirm={handleDelete}
                okText="Yes"
                cancelText="No"
              >
                <Button icon={<DeleteOutlined />} danger></Button>
              </Popconfirm>
            </div>
          </>
        )}
      </Modal>

      {/* Add/Edit Medicine Form Modal */}
      <Modal
        title={editMedicine ? "Update Medicine" : "Add Medicine"}
        visible={isFormVisible}
        onCancel={handleFormCancel}
        footer={null}
      >
        <Form
          form={form}
          onFinish={editMedicine ? handleMedicineUpdateFinish : onFinish}
          layout="vertical"
        >
          <Form.Item
            label="Medicine Name"
            name="name"
            rules={[{ required: true, message: "Please input medicine name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Total Tablets"
            name="totalTablets"
            rules={[{ required: true, message: "Please input total tablets!" }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            label="Tablets to Take"
            name="tabletsToTake"
            rules={[
              { required: true, message: "Please input tablets to take!" },
            ]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            label="Price"
            name="price"
            rules={[{ required: true, message: "Please input price!" }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* Update User Form Modal */}
      <Modal
        title="Update User"
        visible={isUpdateFormVisible}
        onCancel={handleFormCancel}
        footer={null}
      >
        <Form form={form} onFinish={onUpdateUserFinish} layout="vertical">
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please input user name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Age"
            name="age"
            rules={[{ required: true, message: "Please input age!" }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            label="Relation"
            name="relation"
            rules={[{ required: true, message: "Please input relation!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default UserCard;
