import { Button, Form, Input, Modal } from "antd";

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
    </>
  );
};

export default AddMedicineModal;
