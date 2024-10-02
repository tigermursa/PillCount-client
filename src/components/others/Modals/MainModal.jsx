import {
  ArrowUpOutlined,
  DeleteOutlined,
  DollarOutlined,
  EditOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Button, Modal, Popconfirm, Table } from "antd";

const MainModal = ({ mainModalProps }) => {
  const {
    user,
    isModalVisible,
    handleCancel,
    error,
    data,
    setIsFormVisible,
    showUpdateModal,
    showPriceModal,
    setIsMedicineUpdateVisible,
    isMedicineUpdateVisible,
    handleDelete,
    deleteMedicine,
    editMedicines,
  } = mainModalProps;

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
            //!here is the two button
            <div className="flex justify-center">
              <Button
                icon={<EditOutlined />}
                onClick={() => editMedicines(medicine)}
                style={{ marginRight: "8px" }}
              />
              <Popconfirm
                title="Are you sure to delete this medicine?"
                onConfirm={() => deleteMedicine(medicine._id)}
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
      {/*1. Medicine Information Modal and main modal */}
      <Modal
        title={
          <div className="text font-semibold mb-4">My {user?.relation}</div>
        }
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={1000}
      >
        {error ? (
          <p>Error loading data...</p>
        ) : !data ? (
          <p>Loading...</p>
        ) : (
          <>
            <Table
              dataSource={data?.medicines}
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
                icon={<DollarOutlined />}
                onClick={showPriceModal}
                type="dashed"
              >
                Price
              </Button>
              <Button
                type="dashed"
                icon={<ArrowUpOutlined />}
                onClick={() =>
                  setIsMedicineUpdateVisible(!isMedicineUpdateVisible)
                }
              >
                Medicine
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
    </>
  );
};

export default MainModal;
