import React, { useState } from "react";
import Navbar from "../../../components/navbar/Navbar";

import VE_TIM from "../../../assets/images/tim.png";
import "./styles/airlinePage.css";

const airlineTickets = [
  {
    id: 1,
    from: "Hà Nội",
    to: "TP. Hồ Chí Minh",
    airline: "Vietnam Airlines",
    time: "07:00 - 09:00",
    price: 1200000,
  },
  {
    id: 2,
    from: "Đà Nẵng",
    to: "Hà Nội",
    airline: "Vietjet Air",
    time: "13:30 - 15:15",
    price: 850000,
  },
  {
    id: 3,
    from: "TP. Hồ Chí Minh",
    to: "Phú Quốc",
    airline: "Bamboo Airways",
    time: "10:00 - 11:30",
    price: 950000,
  },
];

const AirlineTicketSalesPage: React.FC = () => {
  const [search, setSearch] = useState("");

  const filteredTickets = airlineTickets.filter(
    (ticket) =>
      ticket.from.toLowerCase().includes(search.toLowerCase()) ||
      ticket.to.toLowerCase().includes(search.toLowerCase()) ||
      ticket.airline.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
          <Navbar />
    <div className="airline-container">

      <h2 className="airline-title">✈️ Bán Vé Máy Bay</h2>

      <div className="airline-search-wrapper">
        <input
          type="text"
          placeholder="Tìm chuyến bay (ví dụ: Hà Nội, Vietjet...)"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="airline-search"
        />
      </div>

      <div className="airline-card-grid">
        {filteredTickets.map((ticket) => (
          <div key={ticket.id} className="airline-card" style={{ backgroundImage: `url(${VE_TIM})`, backgroundSize: "cover" }}>
            <h3>
              {ticket.from} → {ticket.to}
            </h3>
            <p>🛫 <strong>Hãng:</strong> {ticket.airline}</p>
            <p>🕒 <strong>Giờ bay:</strong> {ticket.time}</p>
            <p>💰 <strong>Giá vé:</strong> {ticket.price.toLocaleString()} VND</p>
            <button className="airline-button">Đặt vé ngay</button>
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default AirlineTicketSalesPage;
