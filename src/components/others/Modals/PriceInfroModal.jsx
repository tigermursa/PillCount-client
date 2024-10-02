import { Modal, Table } from "antd";

const PriceInfroModal = ({ priceInfoModalProps }) => {
  const { isPriceVisible, handleClosePriceModal, medicineInfo } =
    priceInfoModalProps;
  return (
    <>
      <Modal
        title="Price Status"
        visible={isPriceVisible}
        onCancel={handleClosePriceModal}
        footer={[
          <div key="total">
            <strong>Total Price:</strong> {medicineInfo?.total || 0}
          </div>,
        ]}
      >
        {/* Add the table here */}
        <Table
          dataSource={medicineInfo?.medicines || []} // Medicines data
          columns={[
            {
              title: "Medicine Name",
              dataIndex: "name",
              key: "name",
            },
            {
              title: "Price",
              dataIndex: "price",
              key: "price",
            },
          ]}
          rowKey="name"
          pagination={false}
        />
      </Modal>
    </>
  );
};

export default PriceInfroModal;
