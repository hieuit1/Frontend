import React, { useState } from "react";
import Navbar from "../../../components/navbar/Navbar";
import { Box, TextField, Typography, Grid, Card, CardContent } from "@mui/material";
import VE_HONG from "../../../assets/images/hong.png";

const trainRoutes = [
  { id: 1, from: "Hà Nội", to: "Hải Phòng", time: "07:00 - 09:30", price: 95000, train: "SE1" },
  { id: 2, from: "Hồ Chí Minh", to: "Nha Trang", time: "22:00 - 06:00", price: 300000, train: "SE3" },
  { id: 3, from: "Đà Nẵng", to: "Huế", time: "14:00 - 16:00", price: 120000, train: "TN2" },
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
      <Box sx={{ p: 6, backgroundColor: "#f4f6f8", minHeight: "100vh" }}>
        <Typography variant="h4" color="primary" textAlign="center" mb={3}>
          🚆 Đặt Vé Tàu Hỏa
        </Typography>

        <Box textAlign="center" mb={4}>
          <TextField
            variant="outlined"
            label="Tìm tuyến (ví dụ: Hà Nội, Nha Trang...)"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{ width: "280px" }}
          />
        </Box>

        <Grid container spacing={2} justifyContent="center">
          {filteredRoutes.map((route) => (
            <Grid  key={route.id}>
              <Card
                sx={{
                  width: 305,
                  height: 180,
                  backgroundImage: `url(${VE_HONG})`,
                  backgroundSize: "cover",
                  borderRadius: 2,
                  boxShadow: 3,
                }}
              >
                <CardContent sx={{ p: 2 }}>
                  <Typography variant="h6">{route.from} → {route.to}</Typography>
                  <Typography variant="body2">🕒 <strong>Giờ chạy:</strong> {route.time}</Typography>
                  <Typography variant="body2">🚆 <strong>Tàu:</strong> {route.train}</Typography>
                  <Typography variant="body2">💰 <strong>Giá:</strong> {route.price.toLocaleString()} VND</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export { TrainTicketSalesPage };
