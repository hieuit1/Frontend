import React from "react";
import { Table, Button } from "antd";

// Dữ liệu mẫu
const dataSource = [
  {
    key: "1",
    ticketId: "LT001",
    route: "Hà Nội - Hải Phòng",
    departureTime: "2024-07-01 08:00",
    price: 150000,
    seats: 40,
    sold: 25,
  },
  {
    key: "2",
    ticketId: "LT002",
    route: "Hà Nội - Nam Định",
    departureTime: "2024-07-01 09:00",
    price: 120000,
    seats: 35,
    sold: 30,
  },
];

const columns = [
  {
    title: "Mã Vé",
    dataIndex: "ticketId",
    key: "ticketId",
  },
  {
    title: "Tuyến",
    dataIndex: "route",
    key: "route",
  },
  {
    title: "Giờ Khởi Hành",
    dataIndex: "departureTime",
    key: "departureTime",
  },
  {
    title: "Giá Vé",
    dataIndex: "price",
    key: "price",
    render: (price: number) => price.toLocaleString() + " đ",
  },
  {
    title: "Số Ghế",
    dataIndex: "seats",
    key: "seats",
  },
  {
    title: "Đã Bán",
    dataIndex: "sold",
    key: "sold",
  },
  {
    title: "Hành động",
    key: "action",
    render: () => (
      <Button type="link">Xem chi tiết</Button>
    ),
  },
];

interface Props {
  onAddTicket?: () => void;
}

const IntercityBusTicketSalesListPage: React.FC<Props> = ({ onAddTicket }) => {
  return (
    <div>
      <h2>Danh Sách Vé Xe Liên Tỉnh</h2>
      <div style={{ marginBottom: 16 }}>
        <Button type="primary" onClick={onAddTicket}>
          Đăng bán vé xe liên tỉnh
        </Button>
      </div>
      <Table dataSource={dataSource} columns={columns} pagination={false} />
    </div>
  );
};

export default IntercityBusTicketSalesListPage;
