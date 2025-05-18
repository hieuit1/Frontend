import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/common/footer/Footer";
import "./bus_ticket_css/bus_ticket.css";
import { getTripsData } from "../../api/tripsApi";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-routing-machine";

const ORS_API_KEY = "48b3bcab-c889-46e5-a8b0-719877a46807"; // Thay bằng API key của bạn
const GRAPHHOPPER_API_KEY = "48b3bcab-c889-46e5-a8b0-719877a46807"; // Thay bằng API key của bạn

function createGraphHopperRouter() {
  return {
    route(
      waypoints: Array<{ latLng: { lat: number; lng: number } }>,
      callback: Function
    ) {
      const points = waypoints
        .map((wp) => `${wp.latLng.lat},${wp.latLng.lng}`)
        .join("&point=");
      const url = `https://graphhopper.com/api/1/route?point=${points}&vehicle=car&locale=vi&instructions=false&key=${GRAPHHOPPER_API_KEY}&type=json`;

      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          if (!data.paths || !data.paths[0]) {
            callback(null, []);
            return;
          }
          const path = data.paths[0];
          const coordinates = path.points.coordinates.map(
            (c: [number, number]) => ({
              lat: c[1],
              lng: c[0],
            })
          );
          callback(null, [
            {
              name: "",
              coordinates,
              summary: {
                totalDistance: path.distance,
                totalTime: path.time / 1000,
              },
              inputWaypoints: waypoints,
              waypoints: [waypoints[0], waypoints[waypoints.length - 1]],
              instructions: [],
            },
          ]);
        })
        .catch((err) => callback(err));
    },
  };
}

function createORSRouter() {
  return (L.Routing as any).Router.extend({
    options: {
      serviceUrl: "https://api.openrouteservice.org/v2/directions/driving-car",
      apiKey: ORS_API_KEY,
    },

    route: function (
      waypoints: Array<{ latLng: { lat: number; lng: number } }>,
      callback: Function
    ) {
      const coords = waypoints.map((wp: any) => [wp.latLng.lng, wp.latLng.lat]);
      fetch(this.options.serviceUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: this.options.apiKey,
        },
        body: JSON.stringify({
          coordinates: coords,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (!data.routes || !data.routes[0]) {
            callback(null, []);
            return;
          }
          const route = data.routes[0];
          const coordinates = route.geometry.coordinates.map((c: any) => ({
            lat: c[1],
            lng: c[0],
          }));
          callback(null, [
            {
              name: "",
              coordinates,
              summary: {
                totalDistance: route.summary.distance,
                totalTime: route.summary.duration,
              },
              inputWaypoints: waypoints,
              waypoints: [waypoints[0], waypoints[waypoints.length - 1]],
              instructions: [],
            },
          ]);
        })
        .catch((err: any) => callback(err));
    },
  });
}

const POPULAR_LOCATIONS = [
  "Hà Nội",
  "Quảng Ninh",
  "Ninh Bình",
  "Đà Nẵng",
  "Sa Pa",
  "Vũng Tàu",
];

const mapContainerStyle = {
  width: "100%",
  height: "350px",
  borderRadius: "10px",
  margin: "20px 0",
};
const center = { lat: 21.028511, lng: 105.804817 }; // Hà Nội

const LOCATION_COORDS: Record<string, { lat: number; lng: number }> = {
  "Hà Nội": { lat: 21.028511, lng: 105.804817 },
  "Quảng Ninh": { lat: 21.006382, lng: 107.292514 },
  "Ninh Bình": { lat: 20.250614, lng: 105.974453 },
  "Đà Nẵng": { lat: 16.047079, lng: 108.20623 },
  "Sa Pa": { lat: 22.340168, lng: 103.844813 },
  "Vũng Tàu": { lat: 10.411379, lng: 107.136227 },
};

type RoutingProps = {
  from: { lat: number; lng: number };
  to: { lat: number; lng: number };
};

const LeafletRouting: React.FC<RoutingProps> = ({ from, to }) => {
  const map = useMap();
  const routingControlRef = React.useRef<any>(null);

  React.useEffect(() => {
    // Cleanup control cũ trước khi tạo mới
    if (routingControlRef.current) {
      try {
        // Kiểm tra kỹ control còn tồn tại và còn gắn với map
        if (
          routingControlRef.current._map &&
          routingControlRef.current._container &&
          routingControlRef.current._map.hasLayer &&
          routingControlRef.current._map.hasLayer(routingControlRef.current)
        ) {
          routingControlRef.current.remove();
        }
      } catch (err) {
        // ignore
      }
      routingControlRef.current = null;
    }

    // Nếu from/to không hợp lệ thì không tạo control mới
    if (!from || !to || (from.lat === to.lat && from.lng === to.lng)) return;

    // Tạo control mới
    let instance: any = null;
    try {
      instance = L.Routing.control({
        waypoints: [L.latLng(from.lat, from.lng), L.latLng(to.lat, to.lng)],
        routeWhileDragging: false,
        draggableWaypoints: false,
        addWaypoints: false,
        show: false,
        router: (L.Routing as any).osrmv1({
          serviceUrl: "https://router.project-osrm.org/route/v1",
        }),
      }).addTo(map);
      routingControlRef.current = instance;
    } catch (e) {
      routingControlRef.current = null;
    }

    // Cleanup khi unmount
    return () => {
      if (routingControlRef.current) {
        try {
          if (
            routingControlRef.current._map &&
            routingControlRef.current._container &&
            routingControlRef.current._map.hasLayer &&
            routingControlRef.current._map.hasLayer(routingControlRef.current)
          ) {
            routingControlRef.current.remove();
          }
        } catch (e) {
          // ignore
        }
        routingControlRef.current = null;
      }
    };
  }, [from, to, map]);

  return null;
};

const LeafletRoutingSafe: React.FC<RoutingProps> = ({ from, to }) => {
  const map = useMap();

  React.useEffect(() => {
    if (!from || !to || (from.lat === to.lat && from.lng === to.lng)) return;

    // Tạo control mới
    const control = L.Routing.control({
      waypoints: [L.latLng(from.lat, from.lng), L.latLng(to.lat, to.lng)],
      routeWhileDragging: false,
      draggableWaypoints: false,
      addWaypoints: false,
      show: false,
      router: (L.Routing as any).osrmv1({
        serviceUrl: "https://router.project-osrm.org/route/v1",
      }),
    }).addTo(map);

    // Cleanup khi unmount hoặc khi from/to/map thay đổi
    return () => {
      // Chỉ cleanup nếu map còn tồn tại
      if (control && control._map) {
        try {
          control.remove();
        } catch (e) {
          // ignore mọi lỗi
        }
      }
    };
  }, [from, to, map]);

  return null;
};

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

  const [mapCenter, setMapCenter] = useState(center);

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
      (!to || trip.payPoint?.toLowerCase().includes(to.trim().toLowerCase())) &&
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

  // Hàm xử lý tìm kiếm
  const handleSearch = () => {
    if (from in LOCATION_COORDS && to in LOCATION_COORDS && from !== to) {
      setMapCenter(LOCATION_COORDS[from]);
    } else {
      setMapCenter(center);
    }
  };

  // Khi from/to thay đổi, tự động vẽ lại tuyến đường nếu hợp lệ
  useEffect(() => {
    if (from in LOCATION_COORDS && to in LOCATION_COORDS && from !== to) {
      setMapCenter(LOCATION_COORDS[from]);
    }
  }, [from, to]);

  const routingFrom = from in LOCATION_COORDS ? LOCATION_COORDS[from] : null;
  const routingTo = to in LOCATION_COORDS ? LOCATION_COORDS[to] : null;

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
          <button className="bus-search-btn" onClick={handleSearch}>
            Tìm kiếm
          </button>
        </div>
      </div>

      {/* Map nằm dưới */}
      <div style={{ maxWidth: 800, margin: "0 auto", position: "relative" }}>
        <MapContainer
          center={mapCenter}
          zoom={6}
          style={{
            height: "350px",
            borderRadius: "10px",
            margin: "20px 0",
            width: "100%",
          }}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {routingFrom && routingTo && from !== to && (
            <LeafletRouting from={routingFrom} to={routingTo} />
          )}
          {routingFrom && <Marker position={routingFrom} />}
          {routingTo && <Marker position={routingTo} />}
        </MapContainer>
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
