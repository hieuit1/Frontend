import React, { useEffect, useState } from "react";
import { Container, Typography, Button, Table, TableHead, TableRow, TableCell, TableBody, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, CircularProgress, TextField, MenuItem } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { CoDriver } from "../../../../interfaces/CoDriver";

const BusCoDriverListPage: React.FC = () => {
  const [coDrivers, setCoDrivers] = useState<CoDriver[]>([]);
  const [loading, setLoading] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState<CoDriver | null>(null);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [selectedRickshawId, setSelectedRickshawId] = useState<number | null>(null);

  useEffect(() => {
    fetchCoDrivers();
  }, []);

  const fetchCoDrivers = async () => {
  setLoading(true);
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`${process.env.REACT_APP_API_URL}/useradmin-all-rickshaw`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) throw new Error("Không thể tải danh sách tài xế phụ xe.");
    const data = await response.json();
    setCoDrivers(Array.isArray(data) ? data.map((driver) => ({
      rickshawId: driver.rickShawId, 
      fullName: driver.rickShawfullName, // ✅ 
      phoneNumber: driver.rickShawphoneNumber,
      yearOfBirth: driver.rickShawyearOfBirth,
      descriptions: driver.rickShawdescriptions,
      gender: driver.rickShawgender,
      imageUrl: driver.url
    })) : []);
  } catch (error) {
    console.error("❌ Lỗi khi tải danh sách:", error);
  } finally {
    setLoading(false);
  }
};


  const handleOpenDeleteConfirm = (rickshawId: number) => {
    setSelectedRickshawId(rickshawId);
    setConfirmDeleteOpen(true);
  };

  const handleDeleteConfirmed = async () => {
    if (!selectedRickshawId) return;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api-rickshaw/delete-rickshaw/${selectedRickshawId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error("Không thể xóa tài xế phụ xe.");
      setCoDrivers((prev) => prev.filter((driver) => driver.rickshawId !== selectedRickshawId));
      alert("✅ Xóa tài xế phụ xe thành công!");
    } catch (error) {
      console.error("❌ Lỗi khi xóa tài xế:", error);
    }
    setConfirmDeleteOpen(false);
  };
  const handleEditDriver = (driver: CoDriver) => {
    setSelectedDriver(driver);
    setEditModalOpen(true);
  };
 const handleUpdateDriver = async () => {
  if (!selectedDriver) return;
  try {
    const token = localStorage.getItem("token");
    const formData = new FormData(); // ✅ 
    formData.append("rickShawfullName", selectedDriver.fullName);
    formData.append("rickShawphoneNumber", selectedDriver.phoneNumber.toString());
    formData.append("rickShawyearOfBirth", selectedDriver.yearOfBirth.toString());
    formData.append("rickShawdescriptions", selectedDriver.descriptions);
    formData.append("rickShawgender", selectedDriver.gender);
    // ✅ 
    if (selectedDriver.imageFile) {  formData.append("image", selectedDriver.imageFile); }
    console.log("🔄 Dữ liệu gửi lên API:", formData); // ✅ 
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api-rickshaw/update-rickshaw/${selectedDriver.rickshawId}`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}` },
      body: formData, // ✅ 
    });
    if (!response.ok) throw new Error("❌ Không thể cập nhật tài xế phụ xe.");
    setEditModalOpen(false);
    fetchCoDrivers(); // ✅ 
    alert("✅ Cập nhật tài xế phụ xe thành công!");
  } catch (error) {
    console.error("❌ Lỗi khi cập nhật tài xế:", error);
  }
};
  return (
    <Container maxWidth="lg">
      <Typography variant="h4" fontWeight="bold" textAlign="center" mt={4} mb={2}>
        Danh Sách Tài Xế Phụ Xe
      </Typography>
      <Button variant="contained" color="primary" onClick={() => alert("🛠 Chức năng đang được phát triển!")}>
        Thêm tài xế phụ xe
      </Button>
      {loading ? (
        <CircularProgress sx={{ mt: 4 }} />
      ) : (
        <Table sx={{ mt: 3 }}>
          <TableHead>
            <TableRow>
                <TableCell>ID</TableCell> 
              <TableCell>Ảnh</TableCell>
              <TableCell>Họ và Tên</TableCell>
              <TableCell>Số Điện Thoại</TableCell>
              <TableCell>Năm Sinh</TableCell>
              <TableCell>Giới Tính</TableCell>
              <TableCell>Mô Tả</TableCell>
              <TableCell>Hành Động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {coDrivers.map((driver) => (
              <TableRow key={driver.rickshawId}>
                <TableCell>{driver.rickshawId}</TableCell>
                <TableCell>
                  <img src={driver.imageUrl || "https://via.placeholder.com/150"} alt="Driver" width={50} height={50} style={{ borderRadius: "8px" }} />
                </TableCell>
                <TableCell>{driver.fullName || "Không có tên"}</TableCell>
                <TableCell>{driver.phoneNumber || "Không có số điện thoại"}</TableCell>
                <TableCell>{driver.yearOfBirth || "Không có năm sinh"}</TableCell>
                <TableCell>{driver.gender || "Không có giới tính"}</TableCell>
                <TableCell>{driver.descriptions || "Không có mô tả"}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEditDriver(driver)}>
                    <Edit />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleOpenDeleteConfirm(driver.rickshawId)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
      <Dialog open={confirmDeleteOpen} onClose={() => setConfirmDeleteOpen(false)}>
        <DialogTitle>Xác nhận xóa</DialogTitle>
        <DialogContent>
          <Typography>Bạn có chắc muốn xóa tài xế phụ xe này?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDeleteOpen(false)}>Hủy</Button>
          <Button onClick={handleDeleteConfirmed} color="error">Xóa</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={editModalOpen} onClose={() => setEditModalOpen(false)}>
  <DialogTitle>Sửa tài xế phụ xe</DialogTitle>
  <DialogContent>
    {selectedDriver && (
      <form>
        <img src={selectedDriver.imageUrl || "https://via.placeholder.com/150"} alt="Driver" width={100} height={100} style={{ borderRadius: "8px", marginBottom: "10px" }} />
        <input 
          type="file" 
          accept="image/*" 
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              const reader = new FileReader();
              reader.onloadend = () => {
                setSelectedDriver({ ...selectedDriver, imageUrl: reader.result as string, imageFile: file });
              };
              reader.readAsDataURL(file);
            }
          }} 
        />
        <TextField
          label="Họ và Tên"
          fullWidth
          value={selectedDriver.fullName}
          onChange={(e) => setSelectedDriver({ ...selectedDriver, fullName: e.target.value })}
          margin="dense"
        />
        <TextField
          label="Số Điện Thoại"
          fullWidth
          value={selectedDriver.phoneNumber}
          onChange={(e) => setSelectedDriver({ ...selectedDriver, phoneNumber: e.target.value })}
          margin="dense"
        />
        <TextField
          label="Năm Sinh"
          type="number"
          fullWidth
          value={selectedDriver.yearOfBirth}
          onChange={(e) => setSelectedDriver({ ...selectedDriver, yearOfBirth: parseInt(e.target.value) })}
          margin="dense"
        />
        <TextField
          label="Giới Tính"
          select
          fullWidth
          value={selectedDriver.gender}
          onChange={(e) => setSelectedDriver({ ...selectedDriver, gender: e.target.value })}
          margin="dense"
        >
          <MenuItem value="Nam">Nam</MenuItem>
          <MenuItem value="Nữ">Nữ</MenuItem>
        </TextField>
      </form>
    )}
  </DialogContent>
  <DialogActions>
    <Button onClick={() => setEditModalOpen(false)}>Hủy</Button>
    <Button onClick={handleUpdateDriver} color="primary">Lưu</Button>
  </DialogActions>
</Dialog>
    </Container>
  );
};

export { BusCoDriverListPage };
