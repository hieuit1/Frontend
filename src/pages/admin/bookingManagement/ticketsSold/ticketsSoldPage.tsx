import React, { useEffect, useState } from "react";
import { Table, Tag, message, Modal } from "antd";

interface Ticket {
  tickerId: number;
  seatNumber: string;
  tripName: string;
  departureDate: string;
  departureTime: string;
  departureEndTime: string;
  pickupPoint: string;
  payPonit: string;
  email: string;
  numberphone: number;
  username: string;
  status: string;
}

const TicketsSoldPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Ticket[]>([]);
  const [viewingTicket, setViewingTicket] = useState<Ticket | null>(null);
  const [selectedRowKey, setSelectedRowKey] = useState<number | null>(null);

  const fetchTickets = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${process.env.REACT_APP_API_URL}/admin-ticket/get-all-tickets`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Không thể lấy dữ liệu từ API");
      }

      const tickets = await response.json();
      const confirmedTickets = tickets.filter((ticket: Ticket) => ticket.status === "CONFIRMED");
      setData(confirmedTickets);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error);
      message.error("Không thể lấy danh sách vé đã bán!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const columns = [
    { title: "ID Vé", dataIndex: "tickerId", key: "tickerId" },
    { title: "Tên chuyến", dataIndex: "tripName", key: "tripName" },
    { title: "Ngày đi", dataIndex: "departureDate", key: "departureDate" },
    { title: "Người dùng", dataIndex: "username", key: "username" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Số điện thoại", dataIndex: "numberphone", key: "numberphone" },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status: string) => <Tag color="green">Đã xác nhận</Tag>,
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px", color: "#1890ff" }}>Danh sách vé đã bán</h2>
      <Table
        rowKey="tickerId"
        loading={loading}
        dataSource={data}
        columns={columns}
        pagination={{ pageSize: 10 }}
        style={{
          border: "1px solid #ddd",
          borderRadius: "8px",
          overflow: "hidden",
        }}
        scroll={{ x: "max-content" }}
        onRow={(record) => ({
          onClick: () => {
            setViewingTicket(record);
            setSelectedRowKey(record.tickerId);
          },
          style: {
            cursor: "pointer",
            backgroundColor: selectedRowKey === record.tickerId ? "#e6f7ff" : "transparent",
          },
        })}
      />
      <Modal
  title={
    <div style={{ textAlign: "center", fontWeight: "bold", fontSize: "24px", color: "#ff4d4f" }}>
      🚀 Chi Tiết Vé 🚀
    </div>
  }
  visible={!!viewingTicket}
  onCancel={() => setViewingTicket(null)}
  footer={null}
  centered
  width={700}
  bodyStyle={{
    padding: "20px",
    background: "linear-gradient(135deg, #2c3e50, #4ca1af)",
    borderRadius: "16px",
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.3)",
    color: "#fff",
  }}
>
  {viewingTicket && (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        padding: "16px",
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        borderRadius: "12px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
      }}
    >
      {/* Thông tin chi tiết */}
      {[
        { label: "ID Vé", value: viewingTicket.tickerId },
        { label: "Tên chuyến", value: viewingTicket.tripName },
        { label: "Ngày đi", value: viewingTicket.departureDate },
        { label: "Giờ đi", value: viewingTicket.departureTime },
        { label: "Giờ đến", value: viewingTicket.departureEndTime },
        { label: "Ghế", value: viewingTicket.seatNumber },
        { label: "Điểm đón", value: viewingTicket.pickupPoint },
        { label: "Điểm đến", value: viewingTicket.payPonit },
        { label: "Người dùng", value: viewingTicket.username },
        { label: "Email", value: viewingTicket.email },
        { label: "Số điện thoại", value: viewingTicket.numberphone },
      ].map((item, index) => (
        <div
          key={index}
          style={{
            padding: "12px",
            borderRadius: "8px",
            background: "rgba(255, 255, 255, 0.2)",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
            color: "#fff",
          }}
        >
          <p style={{ margin: 0, fontWeight: "bold", color: "#ff4d4f" }}>{item.label}:</p>
          <p style={{ margin: 0, fontSize: "16px", color: "#fff" }}>{item.value}</p>
        </div>
      ))}
    </div>
  )}
</Modal>
    </div>
  );
};

export default TicketsSoldPage;