import React, { useEffect, useState } from "react";// ✅ 
import { Table, message, Button, Modal, Form, Input } from "antd";// ✅ 
import type { ColumnsType } from "antd/es/table";// ✅ 
import dayjs from "dayjs";// ✅ 
import { BusDriverListPage } from "../../ticketSalesManagement/busTicketSales/busDriverListPage"; // ✅ 
import { BusCoachListPage } from "../../ticketSalesManagement/busTicketSales/busCoachListPage"; // ✅ 
import { BusCoDriverListPage } from "../../ticketSalesManagement/busTicketSales/busCoDriverListPage";// ✅ 
import { TripTicket } from "../../../../interfaces/TripTicket";// ✅ 
import { BusTicketSalesListPageProps } from "../../../../interfaces/BusTicketSalesListPageProps";// ✅ 

const BusTicketSalesListPage: React.FC<BusTicketSalesListPageProps> = ({
  onAddTicket,
  onAddDriver,
  onAddCoach,
  onAddCoDriver,
}) => {
  const [tickets, setTickets] = useState<TripTicket[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [showDriverPage, setShowDriverPage] = useState(false); 
  const [showCoachPage, setShowCoachPage] = useState(false); // ✅ 
  const [showCoDriverPage, setShowCoDriverPage] = useState(false);
  const [editingTicket, setEditingTicket] = useState<TripTicket | null>(null);

  useEffect(() => {
    fetchAllTrips();
  }, []);

  const fetchAllTrips = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token || token.split(".").length !== 3) {
        message.error("Token không hợp lệ hoặc chưa đăng nhập.");
        return;
      }

      const response = await fetch(`${process.env.REACT_APP_API_URL}/useradmin-all-tripcar`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Không thể lấy dữ liệu chuyến xe.");
      }
      setTickets(Array.isArray(data) ? data : []);
      message.success("Đã tải danh sách chuyến xe thành công");
    } catch (error) {
      console.error("Lỗi khi tải danh sách chuyến xe:", error);
      message.error("Không thể tải danh sách chuyến xe");
    } finally {
      setLoading(false);
    }
  };

  const handleEditTicket = async (tripCarId: number, updatedTicket: TripTicket) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api-tripcar/update-tripcar/${tripCarId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(updatedTicket),
    });
    if (!response.ok) throw new Error("Không thể cập nhật chuyến xe");
    message.success("Đã sửa thành công!");
    setEditingTicket(null); 
    fetchAllTrips(); 
  } catch (error) {
    console.error("Lỗi khi cập nhật chuyến xe:", error);
    message.error("Có lỗi xảy ra khi cập nhật vé xe.");
  }
};
  const handleDeleteTicket = async (tripCarId: number) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api-tripcar/${tripCarId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (!response.ok) throw new Error("Không thể xóa chuyến xe");
      message.success("Xóa chuyến xe thành công!");
      fetchAllTrips();
    } catch (error) {
      console.error("Lỗi khi xóa chuyến xe:", error);
      message.error("Có lỗi xảy ra khi xóa vé xe.");
    }
  };

   const columns: ColumnsType<TripTicket> = [
    { title: "Tên chuyến", dataIndex: "tripName", key: "tripName" },
    { title: "Điểm đón", dataIndex: "pickupPoint", key: "pickupPoint" },
    { title: "Điểm trả", dataIndex: "payPoint", key: "payPoint" },
    { title: "Ngày khởi hành", dataIndex: "departureDate", key: "departureDate",
      render: (date: string) => dayjs(date).format("DD-MM-YYYY") 
    },
    { title: "Giờ khởi hành", dataIndex: "departureTime", key: "departureTime" },
    { title: "Giờ kết thúc", dataIndex: "departureEndTime", key: "departureEndTime" },
    { title: "Tổng số ghế", dataIndex: "seatNumber", key: "seatNumber" },
    { title: "Ghế trống", dataIndex: "emptySeatNumber", key: "emptySeatNumber" },
    {
      title: "Giá vé (VNĐ)",
      dataIndex: "priceSeatNumber",
      key: "priceSeatNumber",
      render: (price: number) => price?.toLocaleString("vi-VN") || "0",
    },
    { title: "Tên tài xế", dataIndex: "fullName", key: "fullName" },
    { title: "SĐT tài xế", dataIndex: "phoneNumber", key: "phoneNumber" },
    {
      title: "Hành động",
      key: "actions",
      render: (_: any, record: TripTicket) => (
        <>
          <Button type="primary" onClick={() => setEditingTicket(record)}>
            Sửa
          </Button>
          <Button danger onClick={() => handleDeleteTicket(record.tripCarId)}>
            Xóa
          </Button>
        </>
      ),
    },
  ];

  return (
    <div className="p-8 bg-white max-w-7xl mx-auto shadow rounded">
      {showDriverPage ? (
        <>
          <Button onClick={() => setShowDriverPage(false)} style={{ marginBottom: 16 }}>
            Quay lại danh sách vé
          </Button>
          <BusDriverListPage />
        </>
      ) : showCoDriverPage ? (
        <>
          <Button onClick={() => setShowCoDriverPage(false)} style={{ marginBottom: 16 }}>
            Quay lại danh sách vé
          </Button>
          <BusCoDriverListPage />
        </>
      ): showCoachPage ? (
        <>
          <Button onClick={() => setShowCoachPage(false)} style={{ marginBottom: 16 }}>
            Quay lại danh sách vé
          </Button>
          <BusCoachListPage />
        </>
      ) : (
          <div
    style={{
      padding: "20px",
      backgroundColor: "#fff",
      margin: "auto",
      // borderRadius: "8px",
      boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
    }}
  >
    <h2
      style={{
        fontSize: "24px",
        fontWeight: "bold",
        marginBottom: "16px",
        textAlign: "center",
      }}
    >
      Danh sách vé xe Bus
    </h2>

    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "10px",
        justifyContent: "center",
        marginBottom: "20px",
      }}
    >
      <Button type="primary" onClick={onAddTicket} style={{ backgroundColor: "#28a745", color: "#fff" }}>
        Bán vé mới
      </Button>
      <Button type="primary" onClick={onAddCoDriver} style={{ backgroundColor: "#000000", color: "#fff" }}>
        Phụ xế mới
      </Button>
      <Button type="primary" onClick={onAddDriver} style={{ backgroundColor: "#007bff", color: "#fff" }}>
        Tài xế mới
      </Button>
      <Button type="primary" onClick={onAddCoach} style={{ backgroundColor: "#ffc107", color: "#fff" }}>
        Thêm loại xe
      </Button>
      <Button type="primary" onClick={() => setShowDriverPage(true)} style={{ backgroundColor: "#dc3545", color: "#fff" }}>
        Danh sách tài xế
      </Button>
      <Button type="primary" onClick={() => setShowCoachPage(true)} style={{ backgroundColor: "#5F9EA0", color: "#fff" }}>
        Danh sách biển số xe
      </Button>
      <Button type="primary" onClick={() => setShowCoDriverPage(true)} style={{ backgroundColor: "#5F9EA0", color: "#fff" }}>
        Danh sách tài xế phụ
      </Button>
    </div>

    <div style={{ overflowX: "auto", borderRadius: "8px" }}>
      <Table
        columns={columns}
        dataSource={tickets}
        rowKey="tripCarId"
        loading={loading}
        bordered
        pagination={{ pageSize: 10 }}
        scroll={{ x: "max-content" }} // ✅ 
      />
    </div>
  </div>
      )}
      <Modal
  title="Sửa chuyến xe"
  visible={!!editingTicket}
  onCancel={() => setEditingTicket(null)}
  onOk={() => handleEditTicket(editingTicket!.tripCarId, editingTicket!)}
>
  <Form layout="vertical">
    <Form.Item label="Tên chuyến">
      <Input 
        value={editingTicket?.tripName} 
        onChange={(e) => setEditingTicket({ ...editingTicket!, tripName: e.target.value })} 
      />
    </Form.Item>
    <Form.Item label="Điểm đón">
      <Input 
        value={editingTicket?.pickupPoint} 
        onChange={(e) => setEditingTicket({ ...editingTicket!, pickupPoint: e.target.value })} 
      />
    </Form.Item>
  </Form>
</Modal>
    </div>
  );
};

export { BusTicketSalesListPage };
