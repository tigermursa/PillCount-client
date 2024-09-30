import { avaters } from "@/data/avaterData";
import { Form, Input, InputNumber, Modal, Select } from "antd";
import Image from "next/image";

const UserCreateModal = ({ form, isModalVisible, handleOk, handleCancel }) => {
  return (
    <Modal
      title="Add New User"
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{ name: "", age: null, relation: "", image: null }}
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

        {/* Avatar Selector */}
        <Form.Item
          name="image" // This is where the avatar ID will be stored (as `image`)
          label="Select Avatar"
        >
          <Select placeholder="Select an avatar">
            {avaters.map((avatar) => (
              <Select.Option key={avatar.id} value={avatar.id}>
                <div className="flex items-center">
                  <Image
                    src={avatar.icon}
                    width={30}
                    height={30}
                    alt={`Avatar ${avatar.id}`}
                    style={{ width: "20px", marginRight: "10px" }}
                  />
                  {`${avatar?.name}`}
                </div>
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UserCreateModal;
