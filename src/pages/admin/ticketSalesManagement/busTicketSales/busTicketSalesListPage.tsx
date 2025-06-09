import React, { useEffect, useState } from "react";// ✅ 
import { Table, message, Button, Modal, Form, Input, ConfigProvider, Space } from "antd";// ✅ 
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
  const [viewingTicket, setViewingTicket] = useState<TripTicket | null>(null);

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
  console.log("Dữ liệu gửi lên API:", JSON.stringify(updatedTicket)); 

  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api-tripcar/update-tripcar/${tripCarId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(updatedTicket),
    });

    const responseData = await response.json();
    console.log("Phản hồi từ API:", responseData); 

    if (!response.ok) throw new Error(responseData.message || "Không thể cập nhật chuyến xe");
    message.success("Đã sửa thành công!");
    fetchAllTrips(); 
  } catch (error) {
    console.error("Lỗi khi cập nhật chuyến xe:", error);
    message.error("Có lỗi xảy ra khi cập nhật chuyến xe.");
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
    { title: "ID", dataIndex: "tripCarId", key: "tripCarId" },
    { title: "Tên chuyến", dataIndex: "tripName", key: "tripName" },
    { title: "Ngày khởi hành", dataIndex: "departureDate", key: "departureDate",
      render: (date: string) => dayjs(date).format("DD-MM-YYYY") 
    },
    { title: "Giờ khởi hành", dataIndex: "departureTime", key: "departureTime" },
    { title: "Ghế trống", dataIndex: "emptySeatNumber", key: "emptySeatNumber" },
    {
      title: "Giá vé (VNĐ)",
      dataIndex: "priceSeatNumber",
      key: "priceSeatNumber",
      render: (price: number) => price?.toLocaleString("vi-VN") || "0",
    },
    {
      title: "Hành động",
      key: "actions",
      render: (_: any, record: TripTicket) => (
  <ConfigProvider
    theme={{
      token: {
        // Seed Token
        colorPrimary: '#00b96b',
        borderRadius: 2,

        // Alias Token
        colorBgContainer: '#f6ffed',
      },
    }}
  >
  <Button
    type="primary"
    onClick={() => setEditingTicket(record)}
    style={{
      transition: "all 0.3s ease",
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.backgroundColor = "#0056b3"; // Màu khi hover
      e.currentTarget.style.transform = "scale(1.05)"; // Phóng to nhẹ
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.backgroundColor = ""; // Trở về màu gốc
      e.currentTarget.style.transform = "scale(1)"; // Trở về kích thước gốc
    }}
    onMouseDown={(e) => {
      e.currentTarget.style.transform = "scale(0.95)"; // Nhấn vào thu nhỏ nhẹ
    }}
    onMouseUp={(e) => {
      e.currentTarget.style.transform = "scale(1.05)"; // Thả chuột trở về trạng thái hover
    }}
  >
    Sửa
  </Button>
  <Button
    danger
    onClick={() => handleDeleteTicket(record.tripCarId)}
    style={{
      transition: "all 0.3s ease",
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.backgroundColor = "#cf1322"; // Màu khi hover
      e.currentTarget.style.transform = "scale(1.05)"; // Phóng to nhẹ
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.backgroundColor = ""; // Trở về màu gốc
      e.currentTarget.style.transform = "scale(1)"; // Trở về kích thước gốc
    }}
    onMouseDown={(e) => {
      e.currentTarget.style.transform = "scale(0.95)"; // Nhấn vào thu nhỏ nhẹ
    }}
    onMouseUp={(e) => {
      e.currentTarget.style.transform = "scale(1.05)"; // Thả chuột trở về trạng thái hover
    }}
  >
    Xóa
  </Button>
  <Button 
      type="primary"
    onClick={() => setViewingTicket(record)}
    style={{
      marginLeft: 8,
      transition: "all 0.3s ease",
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.backgroundColor = "#bae637"; // Màu khi hover
      e.currentTarget.style.transform = "scale(1.05)"; // Phóng to nhẹ
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.backgroundColor = ""; // Trở về màu gốc
      e.currentTarget.style.transform = "scale(1)"; // Trở về kích thước gốc
    }}
    onMouseDown={(e) => {
      e.currentTarget.style.transform = "scale(0.95)"; // Nhấn vào thu nhỏ nhẹ
    }}
    onMouseUp={(e) => {
      e.currentTarget.style.transform = "scale(1.05)"; // Thả chuột trở về trạng thái hover
    }}
  >
    Xem chi tiết
  </Button>
  </ConfigProvider>
      ),
    },
  ];

  return (
    <div>
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
      <Button type="primary" onClick={() => setShowCoDriverPage(true)} style={{ backgroundColor: "#008B8B", color: "#fff" }}>
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
    <Form.Item label="Điểm trả">
      <Input 
        value={editingTicket?.payPonit} 
        onChange={(e) => setEditingTicket({ ...editingTicket!, payPonit: e.target.value })} 
      />
    </Form.Item>
    <Form.Item label="ID tài xế phụ">
      <Input 
        type="number"
        value={editingTicket?.rickshawId || ""}
        onChange={(e) => setEditingTicket({ ...editingTicket!, rickshawId: Number(e.target.value) })}
      />
    </Form.Item>
  </Form>
</Modal>
<Modal
  title={
    <div style={{ textAlign: "center", fontWeight: "bold", fontSize: "24px", color: "#1890ff" }}>
      🚌 Chi Tiết Chuyến Xe 🚌
    </div>
  }
  visible={!!viewingTicket}
  onCancel={() => setViewingTicket(null)}
  footer={null}
  centered
  width={700}
  bodyStyle={{
    padding: "20px",
    backgroundColor: "#f0f2f5",
    borderRadius: "8px",
  }}
>
  {viewingTicket && (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "16px",
      }}
    >
      {/* Ảnh xe */}
      <img
        src={viewingTicket.url}
        alt="Ảnh xe"
        style={{
          width: "100%",
          maxWidth: "300px",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        }}
      />

      {/* Thông tin chi tiết */}
      <div
        style={{
          width: "100%",
          maxWidth: "500px",
          backgroundColor: "#fff",
          padding: "16px",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <p style={{ fontSize: "18px", fontWeight: "bold", color: "#1890ff" }}>
          {viewingTicket.tripName}
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "8px",
            fontSize: "14px",
          }}
        >
          <p><strong>ID:</strong> {viewingTicket.tripCarId}</p>
          <p><strong>Ngày khởi hành:</strong> {dayjs(viewingTicket.departureDate).format("DD-MM-YYYY")}</p>
          <p><strong>Giờ khởi hành:</strong> {viewingTicket.departureTime}</p>
          <p><strong>Giờ kết thúc:</strong> {viewingTicket.departureEndTime}</p>
          <p><strong>Điểm đón:</strong> {viewingTicket.pickupPoint}</p>
          <p><strong>Điểm trả:</strong> {viewingTicket.payPonit}</p>
          <p><strong>Tổng số ghế:</strong> {viewingTicket.seatNumber}</p>
          <p><strong>Ghế trống:</strong> {viewingTicket.emptySeatNumber}</p>
          <p><strong>Giá vé:</strong> {viewingTicket.priceSeatNumber.toLocaleString("vi-VN")} VNĐ</p>
          <p><strong>Tên tài xế:</strong> {viewingTicket.fullName}</p>
          <p><strong>SĐT tài xế:</strong> {viewingTicket.phoneNumber}</p>
          <p><strong>Tên tài xế phụ:</strong> {viewingTicket.rickShawfullName}</p>
          <p><strong>SĐT tài xế phụ:</strong> {viewingTicket.rickShawphoneNumber}</p>
          <p><strong>Biển số xe:</strong> {viewingTicket.licensePlateNumberCoach}</p>
        </div>
      </div>
      <Button
        type="primary"
        onClick={() => setViewingTicket(null)}
        style={{
          backgroundColor: "#1890ff",
          borderColor: "#1890ff",
          color: "#fff",
          fontWeight: "bold",
          padding: "8px 16px",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        }}
      >
        Đóng
      </Button>
    </div>
  )}
</Modal>
    </div>
  );
};

export { BusTicketSalesListPage };
