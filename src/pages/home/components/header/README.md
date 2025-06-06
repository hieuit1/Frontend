import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Input, Typography, Paper } from "@mui/material";
import Header from "../../../../assets/images/header-bg.jpg";

const POPULAR_LOCATIONS = [
  "Hà Nội", "Quảng Ninh", "Ninh Bình", "Đà Nẵng", "Sa Pa", "Hà Tĩnh",
  "Nghệ An", "Thanh Hóa", "Hải Phòng", "Hội An", "Quảng Ngãi", "Quảng Nam"
];

const HomeHeader: React.FC = () => {
  const navigate = useNavigate();
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [showFromDropdown, setShowFromDropdown] = useState(false);
  const [showToDropdown, setShowToDropdown] = useState(false);

  const handleSearch = () => {
    navigate(`/busTicket?from=${encodeURIComponent(from.trim())}&to=${encodeURIComponent(to.trim())}&date=${encodeURIComponent(date)}`);
  };

  return (
    <Box sx={{
      backgroundImage: `url(${Header})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      height: 450,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      color: "white",
      textShadow: "0 2px 4px rgba(0, 0, 0, 0.4)"
    }}>
      <Typography variant="h3" fontWeight={700} mb={3}>
        🚍 Đặt Vé Xe Uy Tín & Nhanh Chóng 🎟️
      </Typography>
      <Box sx={{ 
        display: "flex", gap: 2, bgcolor: "rgba(255, 255, 255, 0.85)", p: 2, borderRadius: 3, boxShadow: 5
      }}>
        {/* Nơi xuất phát */}
        <Box sx={{ position: "relative", width: "220px" }}>
          <Input
            placeholder="🚏 Nơi xuất phát"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            onFocus={() => setShowFromDropdown(true)}
            onBlur={() => setTimeout(() => setShowFromDropdown(false), 150)}
            fullWidth
          />
          {showFromDropdown && (
            <Paper sx={{ position: "absolute", top: "110%", left: 0, width: "100%", bgcolor: "#fff", borderRadius: 2, boxShadow: 4, zIndex: 10 }}>
              {POPULAR_LOCATIONS.filter(loc => loc.toLowerCase().includes(from.toLowerCase())).map(loc => (
                <Box key={loc} sx={{ p: 1.5, cursor: "pointer", "&:hover": { bgcolor: "#f0f0f0" } }}
                  onMouseDown={() => { setFrom(loc); setShowFromDropdown(false); }}>
                  {loc}
                </Box>
              ))}
            </Paper>
          )}
        </Box>

        {/* Điểm đến */}
        <Box sx={{ position: "relative", width: "220px" }}>
          <Input
            placeholder="🎯 Điểm đến"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            onFocus={() => setShowToDropdown(true)}
            onBlur={() => setTimeout(() => setShowToDropdown(false), 150)}
            fullWidth
          />
          {showToDropdown && (
            <Paper sx={{ position: "absolute", top: "110%", left: 0, width: "100%", bgcolor: "#fff", borderRadius: 2, boxShadow: 4, zIndex: 10 }}>
              {POPULAR_LOCATIONS.filter(loc => loc.toLowerCase().includes(to.toLowerCase())).map(loc => (
                <Box key={loc} sx={{ p: 1.5, cursor: "pointer", "&:hover": { bgcolor: "#f0f0f0" } }}
                  onMouseDown={() => { setTo(loc); setShowToDropdown(false); }}>
                  {loc}
                </Box>
              ))}
            </Paper>
          )}
        </Box>

        <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} sx={{ minWidth: "140px", textAlign: "center" }} />
        <Button onClick={handleSearch} sx={{
          p: 2, bgcolor: "#007bff", color: "white", borderRadius: 2, fontWeight: 700, transition: "0.3s", boxShadow: 3,
          "&:hover": { bgcolor: "#0056b3" }
        }}>
          🚀 Tìm chuyến
        </Button>
      </Box>
    </Box>
  );
};

export default HomeHeader;
