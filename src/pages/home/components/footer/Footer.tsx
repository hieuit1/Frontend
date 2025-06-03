import React,{ version } from "react";
import {
  Container, Box, Typography, TextField, Button, Grid, Link, IconButton, Divider
} from "@mui/material";
import { Facebook, Twitter, Instagram } from "@mui/icons-material";

interface FooterProps {
  year: number;
  companyName: string;
}

const Footer: React.FC<FooterProps> = ({ year, companyName }) => {
  return (
    <Box component="footer" sx={{ bgcolor: "primary.main", color: "white", py: 6, mt: 4 }}>
      <Container maxWidth="lg">
        {/* Newsletter Section */}
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography variant="h5" fontWeight="bold">📬 Đăng ký nhận bản tin</Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Ưu đãi độc quyền & mẹo du lịch gửi đến bạn mỗi tuần!
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
            <TextField 
              variant="outlined" 
              placeholder="Nhập email của bạn..." 
              sx={{ bgcolor: "white", borderRadius: 1, width: "300px" }} 
            />
            <Button variant="contained" color="secondary" sx={{ px: 3, py: 1.5 }}>
              Đăng ký
            </Button>
          </Box>
        </Box>
        <Divider sx={{ bgcolor: "white", mb: 4 }} />
        {/* Footer Content */}
        <Grid container spacing={6} justifyContent="center">
          
          {/* Footer Brand */}
          <Grid  size={{ xs: 12, sm: 6, md: 3 }}>
            <Typography variant="h6" fontWeight="bold">{companyName}</Typography>
            <Typography variant="body2">
              © {year} - Đặt vé xe khách nhanh chóng & tiện lợi.
            </Typography>
            <Typography variant="body2">
              React Version: {version} ✅
            </Typography>
          </Grid>

          {/* Contact Section */}
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Typography variant="h6" fontWeight="bold">Liên hệ</Typography>
            <Typography variant="body2">📍 123 Đường ABC, Quận XYZ, TP.HCM</Typography>
            <Typography variant="body2">
              📧 support@{companyName.toLowerCase().replace(/\s+/g, "")}.com
            </Typography>
            <Typography variant="body2">📞 1900 123 456</Typography>
          </Grid>

          {/* Social Links */}
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Typography variant="h6" fontWeight="bold">Kết nối</Typography>
            <Box sx={{ display: "flex", gap: 1 }}>
              <IconButton color="inherit" href="https://web.facebook.com/">
                <Facebook fontSize="large" />
              </IconButton>
              <IconButton color="inherit" href="https://x.com/home">
                <Twitter fontSize="large" />
              </IconButton>
              <IconButton color="inherit" href="#">
                <Instagram fontSize="large" />
              </IconButton>
            </Box>
          </Grid>

          {/* Navigation Links */}
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Typography variant="h6" fontWeight="bold">Thông tin</Typography>
            <Link href="/privacy-policy" color="inherit" underline="hover">Chính sách bảo mật</Link>
            <br />
            <Link href="/terms-of-service" color="inherit" underline="hover">Điều khoản sử dụng</Link>
            <br />
            <Link href="/faq" color="inherit" underline="hover">Câu hỏi thường gặp</Link>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
