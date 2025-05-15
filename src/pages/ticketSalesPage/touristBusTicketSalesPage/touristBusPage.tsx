import React, { useState } from "react";
import Navbar from "../../../components/navbar/Navbar";

import VE_VANG from "../../../assets/images/vang.png";
import "./styles/touristBusPage.css";

const provinces = ["Hà Nội", "Hồ Chí Minh", "Đà Nẵng", "Huế", "Đà Lạt"];

const touristTickets = [
  {
    id: 1,
    from: "Hà Nội",
    to: "Sa Pa",
    guide: "Nguyễn Văn A",
    price: 450000,
    busType: "Limousine 9 chỗ",
    province: "Hà Nội",
  },
  {
    id: 2,
    from: "Hồ Chí Minh",
    to: "Vũng Tàu",
    guide: "Trần Thị B",
    price: 350000,
    busType: "Xe 16 chỗ",
    province: "Hồ Chí Minh",
  },
  {
    id: 3,
    from: "Đà Nẵng",
    to: "Huế",
    guide: "Lê Văn C",
    price: 300000,
    busType: "Xe giường nằm",
    province: "Đà Nẵng",
  },
];

const TouristBusTicketSalesPage: React.FC = () => {
  const [selectedProvince, setSelectedProvince] = useState("");

  const filteredTickets = selectedProvince
    ? touristTickets.filter((t) => t.province === selectedProvince)
    : touristTickets;

  return (
    <>
      <Navbar />
    <div className="tourist-container">
    
      <h2 className="tourist-title">🚌 Vé Xe Du Lịch</h2>

      <div className="tourist-select-wrapper">
        <label htmlFor="province-select">Chọn tỉnh/thành:</label>
        <select
          id="province-select"
          value={selectedProvince}
          onChange={(e) => setSelectedProvince(e.target.value)}
          className="tourist-select"
        >
          <option value="">Tất cả</option>
          {provinces.map((p, idx) => (
            <option key={idx} value={p}>{p}</option>
          ))}
        </select>
      </div>

      <div className="tourist-card-grid">
        {filteredTickets.map((ticket) => (
          <div key={ticket.id} className="tourist-card" style={{backgroundImage: `url(${VE_VANG})`, backgroundSize: "cover"}}>
            <h3>{ticket.from} → {ticket.to}</h3>
            <p>🚌 <strong>Loại xe:</strong> {ticket.busType}</p>
            <p>👨‍💼 <strong>Hướng dẫn:</strong> {ticket.guide}</p>
            <p>💰 <strong>Giá:</strong> {ticket.price.toLocaleString()} VND</p>
            <button className="tourist-button">Đặt vé ngay</button>
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default TouristBusTicketSalesPage;
