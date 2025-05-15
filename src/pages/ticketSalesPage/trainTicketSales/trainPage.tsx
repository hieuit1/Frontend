import React, { useState } from "react";
import Navbar from "../../../components/navbar/Navbar";

import VE_HONG from "../../../assets/images/hong.png";
import "./styles/trainPage.css";

const trainRoutes = [
  {
    id: 1,
    from: "Hà Nội",
    to: "Hải Phòng",
    time: "07:00 - 09:30",
    price: 95000,
    train: "SE1",
  },
  {
    id: 2,
    from: "Hồ Chí Minh",
    to: "Nha Trang",
    time: "22:00 - 06:00",
    price: 300000,
    train: "SE3",
  },
  {
    id: 3,
    from: "Đà Nẵng",
    to: "Huế",
    time: "14:00 - 16:00",
    price: 120000,
    train: "TN2",
  },
];

const TrainTicketSalesPage: React.FC = () => {
  const [search, setSearch] = useState("");

  const filteredRoutes = trainRoutes.filter(
    (route) =>
      route.from.toLowerCase().includes(search.toLowerCase()) ||
      route.to.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
          <Navbar />
    <div className="train-container">

      <h2 className="train-title">🚆 Đặt Vé Tàu Hỏa</h2>

      <div className="train-search-wrapper">
        <input
          type="text"
          placeholder="Tìm tuyến (ví dụ: Hà Nội, Nha Trang...)"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="train-search"
        />
      </div>

      <div className="train-card-grid">
        {filteredRoutes.map((route) => (
          <div key={route.id} className="train-card" style={{backgroundImage: `url(${VE_HONG})`, backgroundSize: "cover"}}>
            <h3>
              {route.from} → {route.to}
            </h3>
            <p>🕒 <strong>Giờ chạy:</strong> {route.time}</p>
            <p>🚆 <strong>Tàu:</strong> {route.train}</p>
            <p>💰 <strong>Giá:</strong> {route.price.toLocaleString()} VND</p>
            <button className="train-button">Đặt vé ngay</button>
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default TrainTicketSalesPage;
