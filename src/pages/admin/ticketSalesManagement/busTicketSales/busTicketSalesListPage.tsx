import React, { useEffect, useState } from "react";
import { Table, Tag, message, Button } from "antd";
import type { ColumnsType } from "antd/es/table";

interface Ticket {
  id: string;
  routeName: string;
  driverName: string;
  departure: string;
  destination: string;
  departureTime: string;
  price: number;
  seatCount: number;
}

interface BusTicketSalesListPageProps {
  onAddTicket: () => void;
   onAddDriver: () => void; 
}

const BusTicketSalesListPage: React.FC<BusTicketSalesListPageProps> = ({ onAddTicket, onAddDriver }) => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8080/useradmin-all-driver");
      if (!res.ok) throw new Error("Lỗi khi lấy dữ liệu vé");

      const data = await res.json();
      setTickets(data);
    } catch (err) {
      console.error(err);
      message.error("Không thể tải danh sách vé đã đăng");
    } finally {
      setLoading(false);
    }
  };

  const columns: ColumnsType<Ticket> = [
    {
      title: "Tên tuyến",
      dataIndex: "routeName",
      key: "routeName",
    },
    {
      title: "Tài xế",
      dataIndex: "driverName",
      key: "driverName",
    },
    {
      title: "Nơi đi",
      dataIndex: "departure",
      key: "departure",
    },
    {
      title: "Nơi đến",
      dataIndex: "destination",
      key: "destination",
    },
    {
      title: "Khởi hành",
      dataIndex: "departureTime",
      key: "departureTime",
      render: (text) => new Date(text).toLocaleString(),
    },
    {
      title: "Giá vé (VNĐ)",
      dataIndex: "price",
      key: "price",
      render: (price) => price.toLocaleString(),
    },
    {
      title: "Số ghế",
      dataIndex: "seatCount",
      key: "seatCount",
    },
  ];

  return (
    <div className="p-8 bg-white max-w-7xl mx-auto shadow rounded">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Danh sách vé đã đăng bán</h2>
        <Button type="primary" onClick={onAddTicket}>
          Đăng bán vé mới
        </Button>
        <Button type="primary" onClick={onAddDriver}>
          Thêm tài xế
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={tickets}
        rowKey="id"
        loading={loading}
        bordered
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
};

export { BusTicketSalesListPage };
