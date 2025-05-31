import React, { useEffect, useState } from "react";
import { Table, message, Button } from "antd";
import type { ColumnsType } from "antd/es/table";

interface TripTicket {
  tripCarId: number;
  tripName: string;
  departureDate: string;
  departureTime: string;
  departureEndTime: string;
  pickupPoint: string;
  payPonit: string;
  seatNumber: number;
  emptySeatNumber: number;
  priceSeatNumber: number;
  driverId?: number;
  coachId?: number | null;
  rickshawId?: number | null;
  fullName?: string;      
  phoneNumber?: string;   
  yearOfBirth?: number;
  gender?: string;
}


interface BusTicketSalesListPageProps {
  onAddTicket: () => void;
  onAddDriver: () => void;
}

const BusTicketSalesListPage: React.FC<BusTicketSalesListPageProps> = ({
  onAddTicket,
  onAddDriver,
}) => {
  const [tickets, setTickets] = useState<TripTicket[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

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

    const response = await fetch(
      "http://localhost:8080/useradmin-all-tripcar",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Không thể lấy dữ liệu chuyến xe.");
    }

    if (Array.isArray(data)) {
      setTickets(data);
      message.success("Đã tải danh sách chuyến xe thành công");
    } else {
      message.error("Dữ liệu phản hồi không hợp lệ!");
    }
  } catch (error) {
    console.error("Lỗi khi tải danh sách chuyến xe:", error);
    message.error("Không thể tải danh sách chuyến xe");
  } finally {
    setLoading(false);
  }
};


const columns: ColumnsType<TripTicket> = [
  { title: "Tên chuyến", dataIndex: "tripName", key: "tripName" },
  { title: "Điểm đón", dataIndex: "pickupPoint", key: "pickupPoint" },
  { title: "Điểm trả", dataIndex: "payPonit", key: "payPonit" },
  { title: "Ngày khởi hành", dataIndex: "departureDate", key: "departureDate" },
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
  {
    title: "Tên tài xế",
    dataIndex: "fullName",
    key: "fullName",
  },
  {
    title: "SĐT tài xế",
    dataIndex: "phoneNumber",
    key: "phoneNumber",
  },
];


  return (
    <div className="p-8 bg-white max-w-7xl mx-auto shadow rounded">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Danh sách chuyến xe Bus</h2>
        <div className="flex gap-3">
          <Button type="primary" onClick={onAddTicket} className="bg-green-500">
            Thêm chuyến xe mới
          </Button>
          <Button type="primary" onClick={onAddDriver} className="bg-blue-500">
            Thêm tài xế mới
          </Button>
        </div>
      </div>

      <Table
        columns={columns}
        dataSource={tickets}
        rowKey="tripCarId"
        loading={loading}
        bordered
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
};

export { BusTicketSalesListPage };
