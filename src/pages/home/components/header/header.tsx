import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/header.css";

const POPULAR_LOCATIONS = [
  "Hà Nội",
  "Quảng Ninh",
  "Ninh Bình",
  "Đà Nẵng",
  "Sa Pa",
  "Hà Tĩnh",
  "Nghệ An",
  "Thanh Hóa",
  "Hải Phòng",
  "Hội An",
  "Quảng Ngãi",
  "Quảng Nam",
  "Hồ Chí Minh"
];

const HomeHeader: React.FC = () => {
  const navigate = useNavigate();
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [showFromDropdown, setShowFromDropdown] = useState(false);
  const [showToDropdown, setShowToDropdown] = useState(false);
  const fromInputRef = useRef<HTMLInputElement>(null);
  const toInputRef = useRef<HTMLInputElement>(null);

  const handleSearch = () => {
    navigate(
      `/busTicket?from=${encodeURIComponent(
        from.trim()
      )}&to=${encodeURIComponent(to.trim())}&date=${encodeURIComponent(date)}`
    );
  };

  return (
    <header className="home-header">
      <h1>Tìm & Đặt Vé Xe Khách Uy Tín</h1>
      <div className="search-bar-header">
        {/* Nơi xuất phát */}
        <div className="dropdown-wrapper">
          <input
            id="from-input"
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
            <div className="dropdown-list">
              <div className="dropdown-title">Địa điểm phổ biến</div>
              {POPULAR_LOCATIONS.map((loc) => (
                <div
                  key={loc}
                  className="dropdown-item"
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
        {/* Điểm đến */}
        <div className="dropdown-wrapper">
          <input
            id="to-input"
            type="text"
            placeholder="Điểm đến"
            value={to}
            ref={toInputRef}
            onFocus={() => setShowToDropdown(true)}
            onBlur={() => setTimeout(() => setShowToDropdown(false), 150)}
            onChange={(e) => setTo(e.target.value)}
            autoComplete="off"
          />
          {showToDropdown && (
            <div className="dropdown-list">
              <div className="dropdown-title">Địa điểm phổ biến</div>
              {POPULAR_LOCATIONS.map((loc) => (
                <div
                  key={loc}
                  className="dropdown-item"
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
        {/* Ngày đi */}
        <input
          id="date-input"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <button onClick={handleSearch}>Tìm chuyến</button>
      </div>
    </header>
  );
};

export default HomeHeader;
