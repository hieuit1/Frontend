import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/common/footer/Footer";
import "./bus_ticket_css/bus_ticket.css";
import { getTripsData } from "../../api/tripsApi";

const POPULAR_LOCATIONS = [
  "Hà Nội", "Quảng Ninh", "Ninh Bình", "Đà Nẵng", "Sài Gòn", "Sa Pa", "Vũng Tàu"
];

const BusTicket: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [sortCriteria, setSortCriteria] = useState("default");
  const [trips, setTrips] = useState<any[]>([]);
  const [showFromDropdown, setShowFromDropdown] = useState(false);
  const [showToDropdown, setShowToDropdown] = useState(false);
  const fromInputRef = useRef<HTMLInputElement>(null);
  const toInputRef = useRef<HTMLInputElement>(null);

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
      <div className="bus-search-section">
        <div className="bus-search-box">
          {/* Nơi xuất phát */}
          <div className="bus-dropdown-wrapper">
            <input
              type="text"
              placeholder="Nơi xuất phát"
              value={from}
              ref={fromInputRef}
              onFocus={() => setShowFromDropdown(true)}
              onBlur={() => setTimeout(() => setShowFromDropdown(false), 150)}
              onChange={(e) => setFrom(e.target.value)}
              autoComplete="off"
            />
            {showFromDropdown && (
              <div className="bus-dropdown-list">
                <div className="bus-dropdown-title">Địa điểm phổ biến</div>
                {POPULAR_LOCATIONS.map((loc) => (
                  <div
                    key={loc}
                    className="bus-dropdown-item"
                    onMouseDown={() => {
                      setFrom(loc);
                      setShowFromDropdown(false);
                      fromInputRef.current?.blur();
                    }}
                  >
                    {loc}
                  </div>
                ))}
              </div>
            )}
          </div>
          <span className="bus-arrow-icon">→</span>
          {/* Nơi đến */}
          <div className="bus-dropdown-wrapper">
            <input
              type="text"
              placeholder="Nơi đến"
              value={to}
              ref={toInputRef}
              onFocus={() => setShowToDropdown(true)}
              onBlur={() => setTimeout(() => setShowToDropdown(false), 150)}
              onChange={(e) => setTo(e.target.value)}
              autoComplete="off"
            />
            {showToDropdown && (
              <div className="bus-dropdown-list">
                <div className="bus-dropdown-title">Địa điểm phổ biến</div>
                {POPULAR_LOCATIONS.map((loc) => (
                  <div
                    key={loc}
                    className="bus-dropdown-item"
                    onMouseDown={() => {
                      setTo(loc);
                      setShowToDropdown(false);
                      toInputRef.current?.blur();
                    }}
                  >
                    {loc}
                  </div>
                ))}
              </div>
            )}
          </div>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <button className="bus-search-btn">Tìm kiếm</button>
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
