import React, { useEffect, useState } from "react";
import { Table, Modal, message } from "antd";
import {UserDetail, Ticket } from '../../../../interfaces/UsersHavePurchasedPage';

const UsersHavePurchasedPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<UserDetail[]>([]);
  const [viewingUser, setViewingUser] = useState<UserDetail | null>(null);

  const fetchUsers = async () => {
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

      if (!response.ok) {  throw new Error("Không thể lấy dữ liệu từ API");  }

      const tickets: Ticket[] = await response.json();
      const userMap: Record<string, UserDetail> = {};
      tickets.forEach((ticket) => {
        if (!userMap[ticket.email]) {
          userMap[ticket.email] = {
            email: ticket.email,
            numberphone: ticket.numberphone,
            purchasedCount: 0,
            cancelledCount: 0,
          };
        }
        if (ticket.status === "CANCELLED") {
          userMap[ticket.email].cancelledCount += 1;
        } else {
          userMap[ticket.email].purchasedCount += 1;
        }
      });

      setData(Object.values(userMap));
    } catch (error) {
      message.error("Không thể lấy danh sách người mua!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const columns = [
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Số điện thoại", dataIndex: "numberphone", key: "numberphone" },
    {
      title: "Hành động",
      key: "action",
      render: (_: any, record: UserDetail) => (
        <a style={{ color: "#1890ff", cursor: "pointer" }}
          onClick={() => setViewingUser(record)}
        >
          Xem chi tiết
        </a>
      ),
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px", color: "#00000" }}>
        Danh sách người mua vé
      </h2>
      <Table
        rowKey="email"
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
      ✨ Chi Tiết Người Mua ✨
    </div>
  }
  visible={!!viewingUser}
  onCancel={() => setViewingUser(null)}
  footer={null}
  centered
  width={600}
  bodyStyle={{
    padding: "20px",
    background: "linear-gradient(135deg, #f0f2f5, #e6f7ff)",
    borderRadius: "16px",
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.3)",
    animation: "fadeIn 0.5s ease-in-out",
  }}
>
  {viewingUser && (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        padding: "20px",
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        borderRadius: "12px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
      }}
    >
      <p style={{ margin: 0, fontWeight: "bold", fontSize: "18px", color: "#1890ff" }}>
        <strong>Email:</strong> {viewingUser.email}
      </p>
      <p style={{ margin: 0, fontWeight: "bold", fontSize: "18px", color: "#1890ff" }}>
        <strong>Số điện thoại:</strong> {viewingUser.numberphone}
      </p>
      <p style={{ margin: 0, fontWeight: "bold", fontSize: "18px", color: "#52c41a" }}>
        <strong>Số vé đã mua:</strong> {viewingUser.purchasedCount}
      </p>
      <p style={{ margin: 0, fontWeight: "bold", fontSize: "18px", color: "#ff4d4f" }}>
        <strong>Số vé đã hủy:</strong> {viewingUser.cancelledCount}
      </p>
    </div>
  )}
</Modal>
    </div>
  );
};

export default UsersHavePurchasedPage;