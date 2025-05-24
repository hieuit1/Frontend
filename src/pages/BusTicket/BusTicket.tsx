import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/common/footer/Footer";
import "./bus_ticket_css/bus_ticket.css";
import { getTripsData } from "../../api/tripsApi";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

// Khai báo mở rộng cho leaflet-routing-machine
declare module "leaflet" {
  namespace Routing {
    function control(options: any): any;
  }
  interface Map {
    removeControl(control: any): this;
  }
}

const POPULAR_LOCATIONS = [
  "Hà Nội",
  "Quảng Ninh",
  "Ninh Bình",
  "Đà Nẵng",
  "Sài Gòn",
  "Sa Pa",
  "Vũng Tàu",
];

const LOCATION_COORDS: Record<string, [number, number]> = {
  "Hà Nội": [21.028511, 105.804817],
  "Quảng Ninh": [21.006382, 107.292514],
  "Ninh Bình": [20.250614, 105.974453],
  "Đà Nẵng": [16.047079, 108.20623],
  "Sài Gòn": [10.776889, 106.700806],
  "Sa Pa": [22.340168, 103.844813],
  "Vũng Tàu": [10.411379, 107.136227],
};

function isInVietnam(lat: number, lng: number) {
  // Giới hạn biên giới Việt Nam (tương đối)
  return (
    lat >= 8.2 &&
    lat <= 23.4 && // Bắc - Nam
    lng >= 102.1 &&
    lng <= 109.5 // Tây - Đông
  );
}

function Routing({ from, to }: { from: string; to: string }) {
  const map = useMap();
  const routingRef = React.useRef<any>(null);

  React.useEffect(() => {
    if (routingRef.current && routingRef.current._map) {
      try {
        routingRef.current.off();
        routingRef.current.remove();
      } catch (e) {
        // ignore nếu đã bị huỷ
      }
      routingRef.current = null;
    }

    if (!from || !to || !LOCATION_COORDS[from] || !LOCATION_COORDS[to]) return;

    const customLocationIcon = L.icon({
      iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
      iconSize: [32, 32],
      iconAnchor: [16, 32],
    });

    // @ts-ignore
    const routingControl = L.Routing.control({
      waypoints: [
        L.latLng(...LOCATION_COORDS[from]),
        L.latLng(...LOCATION_COORDS[to]),
      ],
      routeWhileDragging: false,
      draggableWaypoints: false,
      addWaypoints: false,
      show: false,
      createMarker: function (i: number, wp: any) {
        return L.marker(wp.latLng, { icon: customLocationIcon });
      },
      // @ts-ignore
      router: L.Routing.osrmv1({
        serviceUrl: "https://router.project-osrm.org/route/v1",
        profile: "car",
      }),
    })
      .on("routesfound", function (e: any) {
        // Kiểm tra tất cả các điểm trên tuyến đường
        const coordinates = e.routes[0].coordinates;
        const outOfVN = coordinates.some(
          (c: any) => !isInVietnam(c.lat, c.lng)
        );
        if (outOfVN) {
          alert(
            "Tuyến đường đi ra ngoài lãnh thổ Việt Nam. Vui lòng chọn lại!"
          );
          routingControl.setWaypoints([]); // Xóa tuyến đường
        }
      })
      .addTo(map);

    routingRef.current = routingControl;

    return () => {
      if (routingRef.current && routingRef.current._map) {
        try {
          routingRef.current.off();
          routingRef.current.remove();
        } catch (e) {
          // ignore nếu đã bị huỷ
        }
        routingRef.current = null;
      }
    };
  }, [from, to, map]);

  return null;
}

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
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 15;

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

  useEffect(() => {
    setCurrentPage(1); // Reset về trang 1 khi bộ lọc thay đổi
  }, [from, to, date, sortCriteria]);

  // Lọc dữ liệu chuyến đi dựa trên tìm kiếm
  const filteredTrips = trips.filter(
    (trip) =>
      (!from ||
        (LOCATION_COORDS[from] &&
          trip.pickupPoint
            ?.toLowerCase()
            .includes(from.trim().toLowerCase()))) &&
      (!to ||
        (LOCATION_COORDS[to] &&
          trip.payPonit?.toLowerCase().includes(to.trim().toLowerCase()))) &&
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

  const totalPages = Math.ceil(sortedTrips.length / resultsPerPage);
  const paginatedTrips = sortedTrips.slice(
    (currentPage - 1) * resultsPerPage,
    currentPage * resultsPerPage
  );

  return (
    <div className="bus-ticket-page">
      <Navbar />
      <div className="bus-search-section">
        <div className="bus-search-box">
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

      {from && to && LOCATION_COORDS[from] && LOCATION_COORDS[to] && (
        <div className="bus-map-container">
          <MapContainer
            center={LOCATION_COORDS[from] as [number, number]}
            zoom={6}
            style={{ width: "100%", height: "100%" } as React.CSSProperties}
          >
            {/* @ts-ignore */}
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            <Routing from={from} to={to} />
          </MapContainer>
        </div>
      )}

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
          {paginatedTrips.map((trip) => (
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
          {totalPages > 1 && (
            <div className="pagination">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                &lt;
              </button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  className={currentPage === i + 1 ? "active" : ""}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                disabled={currentPage === totalPages}
              >
                &gt;
              </button>
            </div>
          )}
        </section>
      </div>
      <Footer year={2025} companyName="Ticket Car" />
    </div>
  );
};

export default BusTicket;
