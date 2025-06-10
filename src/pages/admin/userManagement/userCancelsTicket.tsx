import React, { useState, useEffect } from "react";
import { Table, message, Tag, Button, Popconfirm, Modal } from "antd";
import { TicketInfo } from "../../../interfaces/TicketInfo";

const UserCancelsTicket: React.FC = () => {
  const [data, setData] = useState<TicketInfo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
const [viewingTicket, setViewingTicket] = useState<TicketInfo | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token"); // Lấy token từ localStorage
        if (!token) {
          message.error("Bạn chưa đăng nhập. Vui lòng đăng nhập để tiếp tục.");
          return;
        }
        const response = await fetch(`${process.env.REACT_APP_API_URL}/admin-ticket/get-all-tickets`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Thêm token vào header
          },
        });

        if (!response.ok) {
          throw new Error("Không thể lấy dữ liệu. Vui lòng kiểm tra quyền truy cập.");
        }

        const result = await response.json();

        // Lọc danh sách vé có trạng thái "PENDING" (đã hủy)
        const canceledTickets = result.filter((ticket: TicketInfo) => ticket.status === "CHECKED_IN");
        setData(canceledTickets);
      } catch (error: any) {
        message.error(error.message || "Lỗi khi lấy danh sách vé đã hủy.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleConfirmCancel = async (tickerId: number) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        message.error("Bạn chưa đăng nhập. Vui lòng đăng nhập để tiếp tục.");
        return;
      }

      const response = await fetch(`${process.env.REACT_APP_API_URL}/update-status-ticket/${tickerId}?status=CANCELLED`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Không thể xác nhận hủy vé. Vui lòng thử lại.");
      }

      message.success("Hủy vé thành công.");
      // Cập nhật trạng thái vé trong danh sách
      setData((prevData) =>
        prevData.map((ticket) =>
          ticket.tickerId === tickerId ? { ...ticket, status: "CANCELLED" } : ticket
        )
      );
    } catch (error: any) {
      message.error(error.message || "Lỗi khi xác nhận hủy vé.");
    }
  };

  const columns = [
    { title: "ID", dataIndex: "tickerId", key: "tickerId" },
    { title: "Tên chuyến", dataIndex: "tripName", key: "tripName" },
    { title: "Ngày đi", dataIndex: "departureDate", key: "departureDate" },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status: string) =>
        status === "PENDING" ? (
         <Tag color="green">Hủy vé thành công</Tag>
        ) : (
          <Tag color="red">Yêu cầu hủy</Tag>
        ),
    },
    { title: "Số điện thoại", dataIndex: "numberphone", key: "numberphone" },
    {
  title: "Hành động",
  key: "action",
  render: (_: any, record: TicketInfo) => (
    <>
      <Popconfirm
        title="Bạn có chắc chắn muốn xác nhận hủy vé này không?"
        onConfirm={() => handleConfirmCancel(record.tickerId)}
        okText="Xác nhận"
        cancelText="Hủy"
      >
        <Button type="primary" danger disabled={record.status === "CANCELLED"}>
          Xác nhận hủy
        </Button>
      </Popconfirm>
      <Button
        style={{ marginLeft: 8 }}
        onClick={() => setViewingTicket(record)}
      >
        Xem chi tiết
      </Button>
    </>
  ),
},
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ textAlign: "center", whiteSpace: "nowrap" }}>Danh sách vé yêu cầu hủy</h2>
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
      />
      <Modal
  title={
    <div style={{ textAlign: "center", fontWeight: "bold", fontSize: "24px", color: "#1890ff" }}>
      🛑 Chi Tiết Vé 🛑
    </div>
  }
  visible={!!viewingTicket}
  onCancel={() => setViewingTicket(null)}
  footer={null}
  centered
  width={800}
  bodyStyle={{
    padding: "20px",
    background: "linear-gradient(135deg, #f0f2f5, #e6f7ff)",
    borderRadius: "12px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  }}
>
  {viewingTicket && (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: "16px",
        padding: "16px",
        backgroundColor: "#fff",
        borderRadius: "12px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      {/* Thông tin chi tiết */}
      {[
        { label: "ID", value: viewingTicket.tickerId },
        { label: "Tên chuyến", value: viewingTicket.tripName },
        { label: "Ngày đi", value: viewingTicket.departureDate },
        { label: "Giờ đi", value: viewingTicket.departureTime },
        { label: "Giờ đến", value: viewingTicket.departureEndTime },
        { label: "Ghế", value: viewingTicket.seatNumber },
        { label: "Trạng thái", value: viewingTicket.status },
        { label: "Người dùng", value: viewingTicket.username },
        { label: "Email", value: viewingTicket.email },
        { label: "Số điện thoại", value: viewingTicket.numberphone },
        { label: "Điểm đón", value: viewingTicket.pickupPoint },
        { label: "Điểm đến", value: viewingTicket.payPonit },
      ].map((item, index) => (
        <div
          key={index}
          style={{
            padding: "12px",
            borderRadius: "8px",
            background: "linear-gradient(135deg, #e6f7ff, #ffffff)",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          }}
        >
          <p style={{ margin: 0, fontWeight: "bold", color: "#1890ff" }}>{item.label}:</p>
          <p style={{ margin: 0, fontSize: "16px", color: "#333" }}>{item.value}</p>
        </div>
      ))}
    </div>
  )}
</Modal>
    </div>
  );
};

export { UserCancelsTicket };