import React, { useState, useEffect } from "react";
import { Table, Tag, Button, message, Popconfirm } from "antd";

interface PurchaseInfo {
  tickerId: number;
  seatNumber: string;
  status: string;
  tripName: string;
  departureDate: string;
  departureTime: string;
  departureEndTime: string;
  pickupPoint: string;
  payPoint: string;
  username: string;
  email: string;
  numberphone: string;
}

const UserPurchasesTickets: React.FC = () => {
  const [data, setData] = useState<PurchaseInfo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

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
    { title: "Giờ đi", dataIndex: "departureTime", key: "departureTime" },
    { title: "Giờ đến", dataIndex: "departureEndTime", key: "departureEndTime" },
    { title: "Ghế", dataIndex: "seatNumber", key: "seatNumber" },
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
    { title: "Người dùng", dataIndex: "username", key: "username" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Số điện thoại", dataIndex: "numberphone", key: "numberphone" },
    { title: "Điểm đón", dataIndex: "pickupPoint", key: "pickupPoint" },
    { title: "Điểm đến", dataIndex: "payPonit", key: "payPonit" },
    {
      title: "Hành động",
      key: "action",
      render: (_: any, record: PurchaseInfo) => (
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
      ),
    },
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
        scroll={{ x: "max-content" }} // Đảm bảo bảng không bị xuống dòng
      />
    </div>
  );
};

export { UserPurchasesTickets };