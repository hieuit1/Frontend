import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/common/footer/Footer";
import "./bus_ticket_css/bus_ticket.css";
import { getTripsData } from "../../api/tripsApi";

const BusTicket: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [sortCriteria, setSortCriteria] = useState("default");
  const [trips, setTrips] = useState<any[]>([]);

  useEffect(() => {
    getTripsData()
      .then((data) => {
        setTrips(Array.isArray(data) ? data : data.data);
      })
      .catch(() => setTrips([]));
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setFrom(params.get("from") || "");
    setTo(params.get("to") || "");
    setDate(params.get("date") || "");
  }, [location.search]);

  // Lọc dữ liệu chuyến đi dựa trên tìm kiếm
  const filteredTrips = trips.filter(
    (trip) =>
      (!from ||
        trip.pickupPoint?.toLowerCase().includes(from.trim().toLowerCase())) &&
      (!to || trip.payPonit?.toLowerCase().includes(to.trim().toLowerCase())) &&
      (!date || trip.departureDate === date)
  );

  const sortedTrips = [...filteredTrips].sort((a, b) => {
    switch (sortCriteria) {
      case "earliest":
        return a.departureTime.localeCompare(b.departureTime);
      case "latest":
        return b.departureTime.localeCompare(a.departureTime);
      case "priceLowToHigh":
        return a.priceSeatNumber - b.priceSeatNumber;
      case "priceHighToLow":
        return b.priceSeatNumber - a.priceSeatNumber;
      default:
        return 0;
    }
  });

  return (
    <div className="bus-ticket-page">
      <Navbar />
      <div className="search-section">
        <div className="search-box">
          <input
            type="text"
            placeholder="Nơi xuất phát"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          />
          <span className="arrow-icon">→</span>
          <input
            type="text"
            placeholder="Nơi đến"
            value={to}
            onChange={(e) => setTo(e.target.value)}
          />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <button className="search-btn">Tìm kiếm</button>
        </div>
      </div>

      <div className="main-section">
        <aside className="filter-sidebar">
          <h3>Sắp xếp</h3>
          <div className="filter-options">
            <label>
              <input
                type="radio"
                name="sort"
                value="default"
                checked={sortCriteria === "default"}
                onChange={(e) => setSortCriteria(e.target.value)}
              />{" "}
              Mặc định
            </label>
            <label>
              <input
                type="radio"
                name="sort"
                value="earliest"
                checked={sortCriteria === "earliest"}
                onChange={(e) => setSortCriteria(e.target.value)}
              />{" "}
              Giờ đi sớm nhất
            </label>
            <label>
              <input
                type="radio"
                name="sort"
                value="latest"
                checked={sortCriteria === "latest"}
                onChange={(e) => setSortCriteria(e.target.value)}
              />{" "}
              Giờ đi muộn nhất
            </label>
            <label>
              <input
                type="radio"
                name="sort"
                value="priceLowToHigh"
                checked={sortCriteria === "priceLowToHigh"}
                onChange={(e) => setSortCriteria(e.target.value)}
              />{" "}
              Giá thấp đến cao
            </label>
            <label>
              <input
                type="radio"
                name="sort"
                value="priceHighToLow"
                checked={sortCriteria === "priceHighToLow"}
                onChange={(e) => setSortCriteria(e.target.value)}
              />{" "}
              Giá cao đến thấp
            </label>
          </div>
        </aside>

        <section className="results-area">
          <h2>Kết quả: {sortedTrips.length} chuyến</h2>
          {sortedTrips.map((trip) => (
            <div className="trip-card" key={trip.tripCarId}>
              <img src={trip.url} alt="bus" className="trip-image" />
              <div className="trip-details">
                <div className="trip-header">
                  <strong>{trip.tripName}</strong>
                  <span className="rating">{trip.coachName}</span>
                </div>
                <div className="trip-route">
                  {trip.pickupPoint} → {trip.payPonit}
                </div>
                <div className="trip-time">
                  <span>
                    {trip.departureTime} - {trip.pickupPoint}
                  </span>
                  <span>
                    {trip.departureEndTime} - {trip.payPonit}
                  </span>
                  <span>
                    Còn {trip.emptySeatNumber}/{trip.seatNumber} chỗ
                  </span>
                </div>
                <div className="trip-footer">
                  <div className="price-box">
                    <span className="current-price">
                      {trip.priceSeatNumber.toLocaleString()}đ
                    </span>
                  </div>
                  <button
                    className="select-trip"
                    onClick={() =>
                      navigate("/seat-selection", { state: { trip } })
                    }
                  >
                    Đặt Vé
                  </button>
                </div>
              </div>
            </div>
          ))}
        </section>
      </div>
      <Footer year={2025} companyName="Ticket Car" />
    </div>
  );
};

export default BusTicket;
