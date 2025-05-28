import React, { useState, useEffect } from "react";
import { Table, Input, Button, Popconfirm, message, Tag } from "antd";
import { fetchCancels, deleteCancel, confirmCancel } from "../../../api/userCancelsTicketApi";


interface CancelInfo {
  id: number;
  user: string;
  ticketId: string;
  reason: string;
  cancelDate: string;
  cancelTime?: string;
  cancelStatus?: "Đã hủy vé" | "Chờ xác nhận";
}

const UserCancelsTicket: React.FC = () => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState<CancelInfo[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
  const fetchData = async () => {
    try {
      const result = await fetchCancels();
      setData(result);
    } catch (error) {
      message.error((error as Error).message);
    } finally {
      setLoading(false);
    }
  };
  fetchData();
}, []);


  const handleDelete = async (id: number) => {
  try {
    await deleteCancel(id);
    setData((prev) => prev.filter((item) => item.id !== id));
    message.success("Đã xóa thành công");
  } catch (error) {
    message.error((error as Error).message);
  }
};


 const handleConfirmCancel = async (id: number) => {
  try {
    await confirmCancel(id);
    setData((prev) =>
      prev.map((item) =>
        item.id === id && item.cancelStatus === "Chờ xác nhận"
          ? { ...item, cancelStatus: "Đã hủy vé" }
          : item
      )
    );
    message.success("Đã xác nhận hủy vé!");
  } catch (error) {
    message.error((error as Error).message);
  }
};


  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Người dùng", dataIndex: "user", key: "user" },
    { title: "Mã vé", dataIndex: "ticketId", key: "ticketId" },
    { title: "Lý do", dataIndex: "reason", key: "reason" },
    { title: "Ngày hủy", dataIndex: "cancelDate", key: "cancelDate" },
    { title: "Giờ hủy", dataIndex: "cancelTime", key: "cancelTime" },
    {
      title: "Trạng thái hủy",
      dataIndex: "cancelStatus",
      key: "cancelStatus",
      render: (status: CancelInfo["cancelStatus"]) =>
        status === "Đã hủy vé" ? (
          <Tag color="red">Đã hủy vé</Tag>
        ) : (
          <Tag color="orange">Chờ xác nhận</Tag>
        ),
    },
    {
      title: "Thao tác",
      key: "action",
      render: (_: any, record: CancelInfo) => (
        <div style={{ display: "flex", gap: 8 }}>
          {record.cancelStatus === "Chờ xác nhận" && (
            <Button
              size="small"
              type="primary"
              onClick={() => handleConfirmCancel(record.id)}
            >
              Xác nhận hủy
            </Button>
          )}
          <Popconfirm
            title="Bạn có chắc muốn xóa?"
            onConfirm={() => handleDelete(record.id)}
            okText="Xóa"
            cancelText="Hủy"
          >
            <Button danger size="small">Xóa</Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div>
      <h2>Người Dùng Hủy Vé</h2>
      <Input
        placeholder="Tìm kiếm theo tên, mã vé, lý do, ngày, giờ, trạng thái..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ width: 300, marginBottom: 16 }}
      />
      <Table
        rowKey="id"
        loading={loading}
        dataSource={data.filter(
          (item) =>
            item.user.toLowerCase().includes(search.toLowerCase()) ||
            item.ticketId.toLowerCase().includes(search.toLowerCase()) ||
            item.reason.toLowerCase().includes(search.toLowerCase()) ||
            item.cancelDate.includes(search) ||
            (item.cancelTime && item.cancelTime.includes(search)) ||
            (item.cancelStatus && item.cancelStatus.includes(search))
        )}
        columns={columns}
        rowSelection={{
          selectedRowKeys,
          onChange: setSelectedRowKeys,
          selections: [
            Table.SELECTION_ALL,
            Table.SELECTION_INVERT,
            Table.SELECTION_NONE,
          ],
        }}
      />
    </div>
  );
};

export { UserCancelsTicket };
