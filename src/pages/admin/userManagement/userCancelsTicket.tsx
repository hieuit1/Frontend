import React, { useState, useEffect } from "react";
import { Table, message, Tag, Button, Popconfirm } from "antd";
import { TicketInfo } from "../../../interfaces/TicketInfo";

const UserCancelsTicket: React.FC = () => {
  const [data, setData] = useState<TicketInfo[]>([]);
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

      const response = await fetch(`${process.env.REACT_APP_API_URL}/admin-ticket/${tickerId}?status=CANCELLED`, {
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
    { title: "Giờ đi", dataIndex: "departureTime", key: "departureTime" },
    { title: "Giờ đến", dataIndex: "departureEndTime", key: "departureEndTime" },
    { title: "Ghế", dataIndex: "seatNumber", key: "seatNumber" },
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
    { title: "Người dùng", dataIndex: "username", key: "username" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Số điện thoại", dataIndex: "numberphone", key: "numberphone" },
    { title: "Điểm đón", dataIndex: "pickupPoint", key: "pickupPoint" },
    { title: "Điểm đến", dataIndex: "payPonit", key: "payPonit" },
    {
      title: "Hành động",
      key: "action",
      render: (_: any, record: TicketInfo) => (
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
        scroll={{ x: "max-content" }} // Đảm bảo bảng không bị xuống dòng
      />
    </div>
  );
};

export { UserCancelsTicket };