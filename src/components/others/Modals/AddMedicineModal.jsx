import { Button, Form, Input, Modal } from "antd";
import {Select } from "antd";
const { Option } = Select;
const AddMedicineModal = ({ addMedicineModalProps }) => {
  const {
    editMedicine,
    isFormVisible,
    handleFormCancel,
    form,
    updateMedicine,
    onFinish,
  } = addMedicineModalProps;
  return (
    <>
      <Modal
        title={editMedicine ? "Update Medicine" : "Add Medicine"}
        visible={isFormVisible}
        onCancel={handleFormCancel}
        footer={null}
      >
        <Form
          form={form}
          onFinish={editMedicine ? updateMedicine : onFinish}
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
            label="Tablets to Take"
            name="tabletsToTake"
            rules={[
              { required: true, message: "Please input tablets to take!" },
            ]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            label="Total Days"
            name="totalTablets"
            rules={[
              { required: true, message: "Please select total tablets!" },
            ]} // Updated message
          >
            <Select placeholder="Select total days" style={{ width: "100%" }}>
              <Option value={15}>15</Option>
              <Option value={30}>30</Option>
              <Option value={45}>45</Option>
              <Option value={60}>60</Option>
            </Select>
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
    </>
  );
};

export default AddMedicineModal;
