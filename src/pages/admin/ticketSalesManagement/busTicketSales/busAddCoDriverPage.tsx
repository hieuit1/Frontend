import React, { useState } from "react";
import { Container, Typography, TextField, Button, Card, CardContent, Grid, MenuItem } from "@mui/material";
import { Upload } from "@mui/icons-material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";

const BusAddCoDriver: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    yearOfBirth: "",
    descriptions: "",
    gender: "",
    image: null as File | null,
  });
  const [previewImage, setPreviewImage] = useState<string | null>(null); // ✅
  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
  if (event.target.files?.length) {
    const file = event.target.files[0];
    setFormData({ ...formData, image: file });
    const imageUrl = URL.createObjectURL(file);
    setPreviewImage(imageUrl);
  }
};
  const handleSubmit = async () => {
    const formDataToSend = new FormData();
    formDataToSend.append("rickShawfullName", formData.fullName);
    formDataToSend.append("rickShawphoneNumber", formData.phoneNumber);
    formDataToSend.append("rickShawyearOfBirth", formData.yearOfBirth);
    formDataToSend.append("rickShawdescriptions", formData.descriptions);
    formDataToSend.append("rickShawgender", formData.gender);
    if (formData.image) {
      formDataToSend.append("image", formData.image);
    }
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api-rickshaw/create-rickshaw`, {
        method: "POST",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        body: formDataToSend,
      });
      if (!response.ok) throw new Error("Không thể tạo tài xế phụ xe.");
      alert("🎉 Tạo tài xế phụ xe thành công!");
      setFormData({ fullName: "", phoneNumber: "", yearOfBirth: "", descriptions: "", gender: "", image: null });
    } catch (error) {
      console.error("Lỗi:", error);
      alert("❌ Tạo tài xế phụ xe thất bại!");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Card sx={{ p: 3, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h5" fontWeight="bold" textAlign="center" mb={2}>
            Tạo Tài Xế Phụ Xe
          </Typography>
          <Grid container spacing={2}>
            <Grid size={ {xs: 12}}>
              <TextField fullWidth label="Họ và Tên" name="fullName" value={formData.fullName} onChange={handleChange} required />
            </Grid>
            <Grid size={ {xs: 12}}>
              <TextField fullWidth label="Số Điện Thoại" name="phoneNumber" type="tel" value={formData.phoneNumber} onChange={handleChange} required />
            </Grid>
<Grid size={ {xs:6}}>
  <DatePicker
    views={["year"]}
    value={formData.yearOfBirth ? dayjs(`${formData.yearOfBirth}-01-01`) : null} 
    onChange={(newValue: Dayjs | null) => {
      if (newValue) {
        setFormData({ ...formData, yearOfBirth: newValue.year().toString() });
      }
    }}
    slotProps={{
      textField: {
        fullWidth: true,
        required: true,
        helperText: "",
      },
    }}
  />
</Grid>
            <Grid size={ {xs:6}}>
              <TextField fullWidth select label="Giới Tính" name="gender" value={formData.gender} onChange={handleChange} required>
                <MenuItem value="Nam">Nam</MenuItem>
                <MenuItem value="Nữ">Nữ</MenuItem>
              </TextField>
            </Grid>
            <Grid  size={ {xs: 12}}>
              <TextField fullWidth multiline label="Mô Tả" name="descriptions" value={formData.descriptions} onChange={handleChange} />
            </Grid>
            <Grid  size={ {xs: 12}}>
              <Button variant="contained" component="label" startIcon={<Upload />}>
                Tải Ảnh Lên
                <input type="file" hidden onChange={handleImageUpload} />
              </Button>
            </Grid>
 {previewImage && (
  <img
    src={previewImage}
    alt="Ảnh xem trước"
    style={{
      width: "150px", 
      height: "225px", 
      objectFit: "cover", 
      borderRadius: "8px", 
      marginTop: "10px",
      border: "1px solid #ddd", 
    }}
  />
)}
            <Grid size={ {xs: 12}}>
              <Button fullWidth variant="contained" color="primary" onClick={handleSubmit}>
                Tạo Tài Xế Phụ Xe
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
};

export { BusAddCoDriver };
