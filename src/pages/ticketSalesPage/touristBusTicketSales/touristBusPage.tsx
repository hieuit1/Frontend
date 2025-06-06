import React, { useEffect, useState } from "react";
import Navbar from "../../../components/navbar/Navbar";
import VE_VANG from "../../../assets/images/vang.png";
import { Box, Select, MenuItem, Typography, Card, CardContent, Button, Modal } from "@mui/material";

const provinces = ["Hà Nội", "Hồ Chí Minh", "Đà Nẵng", "Huế", "Đà Lạt"];

interface TouristTicket {
  id: number;
  from: string;
  to: string;
  guide: string;
  price: number;
  busType: string;
  province: string;
  date: string;
  time: string;
}

const TouristBusTicketSalesPage: React.FC = () => {
  const [selectedProvince, setSelectedProvince] = useState("");
  const [tickets, setTickets] = useState<TouristTicket[]>([]);
  const [selectedTicket, setSelectedTicket] = useState<TouristTicket | null>(null);
  const [showDetail, setShowDetail] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("touristTickets");
    if (stored) setTickets(JSON.parse(stored));
    const interval = setInterval(() => {
      const updated = localStorage.getItem("touristTickets");
      if (updated) setTickets(JSON.parse(updated));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleViewDetail = (ticket: TouristTicket) => {
    setSelectedTicket(ticket);
    setShowDetail(true);
  };

  const closeDetail = () => {
    setShowDetail(false);
    setSelectedTicket(null);
  };

  const filteredTickets = selectedProvince
    ? tickets.filter((t) => t.province === selectedProvince)
    : tickets;

  const calculateArrivalTime = (timeStr: string) => {
    if (!timeStr) return "";
    const [hour, minute] = timeStr.split(":").map(Number);
    let arrivalHour = (hour + 2) % 24;
    return `${arrivalHour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
  };

  return (
    <>
      <Navbar />
      <Box sx={{ p: 6, backgroundColor: "#f0f2f5", minHeight: "100vh" }}>
        <Typography variant="h4" color="primary" textAlign="center" mb={3}>
          🚌 Vé Xe Du Lịch
        </Typography>

        <Box textAlign="center" mb={4}>
          <Select
            value={selectedProvince}
            onChange={(e) => setSelectedProvince(e.target.value)}
            displayEmpty
            sx={{ width: 220, background: "#fff" }}
          >
            <MenuItem value="">Tất cả</MenuItem>
            {provinces.map((p, idx) => (
              <MenuItem key={idx} value={p}>
                {p}
              </MenuItem>
            ))}
          </Select>
        </Box>

        <Box display="flex" flexWrap="wrap" justifyContent="center" gap={2}>
          {filteredTickets.length === 0 ? (
            <Typography textAlign="center">Không có vé nào.</Typography>
          ) : (
            filteredTickets.map((ticket) => (
              <Card
                key={ticket.id}
                sx={{
                  width: 310,
                  height: 175,
                  backgroundImage: `url(${VE_VANG})`,
                  backgroundSize: "cover",
                  borderRadius: 2,
                  boxShadow: 3,
                  cursor: "pointer",
                }}
                onClick={() => handleViewDetail(ticket)}
              >
                <CardContent sx={{ p: 2 }}>
                  <Typography variant="h6">{ticket.from} → {ticket.to}</Typography>
                  <Typography variant="body2">📅 {ticket.date}</Typography>
                  <Typography variant="body2">🕒 Giờ đi: {ticket.time}</Typography>
                  <Typography variant="body2">⏳ Giờ đến: {calculateArrivalTime(ticket.time)}</Typography>
                  <Typography variant="body2">💰 Giá: {ticket.price.toLocaleString()} VND</Typography>
                </CardContent>
              </Card>
            ))
          )}
        </Box>

        <Modal open={showDetail} onClose={closeDetail}>
          <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", p: 3, bgcolor: "white", borderRadius: 2, boxShadow: 5, minWidth: 320 }}>
            {selectedTicket && (
              <>
                <Typography variant="h6">{selectedTicket.from} → {selectedTicket.to}</Typography>
                <Typography variant="body2">🚌 Loại xe: {selectedTicket.busType}</Typography>
                <Typography variant="body2">👨‍💼 Hướng dẫn: {selectedTicket.guide}</Typography>
                <Typography variant="body2">💰 Giá vé: {selectedTicket.price.toLocaleString()} VND</Typography>
                <Button fullWidth variant="contained" color="primary" sx={{ mt: 2 }} onClick={() => { alert("Bạn đã đặt vé thành công!"); closeDetail(); }}>
                  Mua ngay
                </Button>
                <Button fullWidth variant="outlined" color="secondary" sx={{ mt: 1 }} onClick={closeDetail}>
                  Đóng
                </Button>
              </>
            )}
          </Box>
        </Modal>
      </Box>
    </>
  );
};

export { TouristBusTicketSalesPage };
