import React, { useState } from "react";
import { Box, Button, TextField, Typography, Paper } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

const ContactAdmin: React.FC = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <Paper elevation={4} sx={{ maxWidth: 600, mx: "auto", p: 4, mt: 6, borderRadius: 2 }}>
      <Box display="flex" alignItems="center" mb={3}>
        <img
          src="https://cdn-icons-png.flaticon.com/512/561/561127.png"
          alt="Contact"
          style={{ width: 60, height: 60, borderRadius: "50%", marginRight: 20 }}
        />
        <Box>
          <Typography variant="h4" color="primary">Liên hệ quản trị viên</Typography>
          <Typography color="textSecondary">Chúng tôi luôn sẵn sàng hỗ trợ bạn!</Typography>
        </Box>
      </Box>

      <Box mb={3}>
        <Typography variant="body1"><strong>Email:</strong> admin@vexekhach.vn</Typography>
        <Typography variant="body1"><strong>Điện thoại:</strong> 0123 456 789</Typography>
        <Typography variant="body1"><strong>Địa chỉ:</strong> 123 Đường Lớn, Quận 1, TP. Hồ Chí Minh</Typography>
      </Box>

      {submitted ? (
        <Typography color="success.main" fontWeight="bold" textAlign="center">
          ✅ Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất có thể.
        </Typography>
      ) : (
        <form onSubmit={handleSubmit}>
          <Box mb={2}>
            <TextField 
              fullWidth 
              label="Họ và tên" 
              variant="outlined" 
              name="name" 
              value={form.name} 
              onChange={handleChange} 
              required 
            />
          </Box>
          <Box mb={2}>
            <TextField 
              fullWidth 
              label="Email" 
              variant="outlined" 
              type="email" 
              name="email" 
              value={form.email} 
              onChange={handleChange} 
              required 
            />
          </Box>
          <Box mb={2}>
            <TextField 
              fullWidth 
              label="Nội dung liên hệ" 
              variant="outlined" 
              name="message" 
              value={form.message} 
              onChange={handleChange} 
              multiline 
              rows={4} 
              required 
            />
          </Box>
          <Button 
            type="submit" 
            fullWidth 
            variant="contained" 
            color="primary" 
            endIcon={<SendIcon />}
          >
            Gửi liên hệ
          </Button>
        </form>
      )}
    </Paper>
  );
};

export default ContactAdmin;
