import { Button, Form, Input, Modal } from "antd";

const UpdateUserModal = ({ updateUserModalProps }) => {
  const { isUpdateFormVisible, handleFormCancel, onUpdateUserFinish, form } =
    updateUserModalProps;
  return (
    <>
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

export default UpdateUserModal;
