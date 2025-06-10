import React, { useState, useEffect } from "react";
import { Table, Tag, Button, message, Popconfirm, Modal } from "antd";

interface PurchaseInfo {
  tickerId: number;
  seatNumber: string;
  status: string;
  tripName: string;
  departureDate: string;
  departureTime: string;
  departureEndTime: string;
  pickupPoint: string;
  payPonit: string;
  username: string;
  email: string;
  numberphone: string;
}

const UserPurchasesTickets: React.FC = () => {
  const [data, setData] = useState<PurchaseInfo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [viewingTicket, setViewingTicket] = useState<PurchaseInfo | null>(null);

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

        // Lọc danh sách vé có trạng thái "PENDING"
        const pendingTickets = result.filter((ticket: PurchaseInfo) => ticket.status === "PENDING");
        setData(pendingTickets);
      } catch (error: any) {
        message.error(error.message || "Lỗi khi lấy danh sách vé.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleConfirmStatus = async (tickerId: number) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        message.error("Bạn chưa đăng nhập. Vui lòng đăng nhập để tiếp tục.");
        return;
      }

      const response = await fetch(`${process.env.REACT_APP_API_URL}/admin-ticket/${tickerId}?status=CONFIRMED`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Không thể xác nhận vé. Vui lòng thử lại.");
      }

      message.success("Xác nhận vé thành công.");
      // Cập nhật trạng thái vé trong danh sách
      setData((prevData) =>
        prevData.map((ticket) =>
          ticket.tickerId === tickerId ? { ...ticket, status: "CONFIRMED" } : ticket
        )
      );
    } catch (error: any) {
      message.error(error.message || "Lỗi khi xác nhận vé.");
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
        status === "CONFIRMED" ? (
          <Tag color="green">Đã xác nhận</Tag>
        ) : (
          <Tag color="red">Yêu đặt vé</Tag>
        ),
    },
    { title: "Số điện thoại", dataIndex: "numberphone", key: "numberphone" },
    {
  title: "Hành động",
  key: "action",
  render: (_: any, record: PurchaseInfo) => (
    <>
      <Popconfirm
        title="Bạn có chắc chắn muốn xác nhận vé này không?"
        onConfirm={() => handleConfirmStatus(record.tickerId)}
        okText="Xác nhận"
        cancelText="Hủy"
      >
        <Button type="primary" disabled={record.status !== "PENDING"}>
          Xác nhận
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
}
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ textAlign: "center", whiteSpace: "nowrap" }}>Danh sách vé yêu cầu mua vé</h2>
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
    background: "linear-gradient(135deg, #2c3e50, #4e73df)",
    borderRadius: "16px",
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.5)",
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
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
        animation: "fadeIn 0.5s ease-in-out",
      }}
    >
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
        <p
          key={index}
          style={{
            position: "relative",
            fontSize: "18px",
            fontWeight: "bold",
            color: "#fff",
            padding: "8px",
            background: "linear-gradient(90deg, #4e73df, #2c3e50)",
            borderRadius: "8px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
            overflow: "hidden",
          }}
        >
          <strong>{item.label}:</strong> {item.value}
          <span
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: "rgba(255, 255, 255, 0.2)",
              transform: "translateX(-100%)",
              animation: "shine 1.5s infinite",
            }}
          ></span>
        </p>
      ))}
    </div>
  )}
</Modal>
    </div>
  );
};

export { UserPurchasesTickets };


const animatedTextStyle: React.CSSProperties = {
  position: "relative",
  display: "inline-block",
  color: "inherit",
  fontSize: "16px",
  fontWeight: "bold",
  overflow: "hidden",
  whiteSpace: "nowrap",
  animation: "shine 1.5s infinite",
};

const shineEffect = `
@keyframes shine {
  0% {
    transform: translateX(-100%);
  }
  50% {
    transform: translateX(50%);
  }
  100% {
    transform: translateX(100%);
  }
}
`;