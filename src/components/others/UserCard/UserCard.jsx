import { useState } from "react";
import Image from "next/image";
import { Modal, Table, Button, Form, Input, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import useSWR from "swr";
import { avaters } from "@/data/avaterData";

const fetcher = (url) => fetch(url).then((res) => res.json());

const defaultImageUrl =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZGm_sSq7ogWAjMwkg3wSab31ddsrjv852EA&s";

const UserCard = ({ user }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);

  // Find the avatar from avaters array using the image field as the ID
  const avatar = avaters.find((avatar) => avatar.id === user.image);

  // SWR fetch for single user data
  const { data, error, mutate } = useSWR(
    isModalVisible ? `http://localhost:5000/api/user/${user._id}` : null,
    fetcher
  );

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleFormCancel = () => {
    setIsFormVisible(false);
  };

  const onFinish = async (values) => {
    try {
      await fetch(`http://localhost:5000/api/user/${user._id}/medicine`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      // Mutate the SWR cache to re-fetch data after adding the medicine
      mutate();

      message.success("Medicine added successfully!");
      setIsFormVisible(false); // Close the form
    } catch (error) {
      message.error("Failed to add medicine.");
    }
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
      dataIndex: "daysRemaining",
      key: "daysRemaining",
      align: "center",
    },
    {
      title: "Tablets Remaining",
      dataIndex: "totalTablets",
      align: "center",
    },
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
          <h3 className="text-lg font-semibold truncate">{user.name}</h3>
          <p className="text-gray-500 truncate">{user.relation}</p>
        </div>
      </div>

      {/* Ant Design Modal */}
      <Modal
        title={
          <div className="text font-semibold mb-4">
            <p>My {user?.relation}</p>
          </div>
        }
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null} // Hide default footer buttons
      >
        {error ? (
          <p>Error loading data...</p>
        ) : !data ? (
          <p>Loading...</p>
        ) : (
          <>
            <Button
              type="dashed"
              icon={<PlusOutlined />}
              onClick={() => setIsFormVisible(true)}
              style={{ marginLeft: "auto" }}
              className="mb-3"
            >
              Add Medicine
            </Button>
            <Table
              dataSource={data.medicines}
              columns={medicineColumns}
              rowKey="_id"
              pagination={false}
            />
          </>
        )}
      </Modal>

      {/* Medicine Form Modal */}
      <Modal
        title="Add Medicine"
        visible={isFormVisible}
        onCancel={handleFormCancel}
        footer={null}
      >
        <Form onFinish={onFinish} layout="vertical">
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
