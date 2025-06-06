import React, { useEffect, useState } from "react";
import { Table, message, Button, Avatar, Popconfirm, Modal, Form, Input, Upload, Select } from "antd";
import type { ColumnsType } from "antd/es/table";
import { UploadOutlined } from "@ant-design/icons";

interface Driver {
  driverId: number;
  fullName: string;
  phoneNumber: string;
  yearOfBirth: number;
  descriptions: string;
  gender: string;
  url: string;
  publicId: string;
}

const BusDriverListPage: React.FC = () => {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  useEffect(() => {
    fetchDrivers();
  }, []);

  const fetchDrivers = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${process.env.REACT_APP_API_URL}/useradmin-all-driver`, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Không thể lấy dữ liệu tài xế.");

      setDrivers(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("❌ Lỗi khi lấy danh sách tài xế:", error);
      message.error("Không thể tải danh sách tài xế.");
    } finally {
      setLoading(false);
    }
  };

  const showEditModal = (driver: Driver) => {
    setSelectedDriver(driver);
    setSelectedImage(null); // Reset ảnh đã chọn
    setIsModalOpen(true);
  };

  const handleUpdate = async () => {
    if (!selectedDriver) return;
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("fullName", selectedDriver.fullName);
      formData.append("phoneNumber", selectedDriver.phoneNumber);
      formData.append("yearOfBirth", selectedDriver.yearOfBirth.toString());
      formData.append("gender", selectedDriver.gender);
      formData.append("descriptions", selectedDriver.descriptions);

      if (selectedImage) {
        formData.append("image", selectedImage);
      }

      const response = await fetch(`${process.env.REACT_APP_API_URL}/api-driver/update-driver/${selectedDriver.driverId}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (!response.ok) throw new Error("Không thể cập nhật tài xế.");

      message.success("Cập nhật tài xế thành công!");
      setIsModalOpen(false);
      fetchDrivers();
    } catch (error) {
      console.error("❌ Lỗi khi cập nhật tài xế:", error);
      message.error("Không thể cập nhật tài xế.");
    }
  };

  const deleteDriver = async (driverId: number) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api-driver/delete-driver/${driverId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error("Không thể xóa tài xế.");

      message.success("Xóa tài xế thành công!");
      fetchDrivers();
    } catch (error) {
      console.error("❌ Lỗi khi xóa tài xế:", error);
      message.error("Không thể xóa tài xế.");
    }
  };

const columns: ColumnsType<Driver> = [
    { title: "ID Tài Xế", dataIndex: "driverId", key: "driverId" }, // Thêm ID tài xế
    {
      title: "Ảnh",
      dataIndex: "url",
      key: "url",
      render: (url) => <Avatar src={url || "https://via.placeholder.com/150"} size={40} alt="Driver avatar" />,
    },
    { title: "Họ và tên", dataIndex: "fullName", key: "fullName" },
    { title: "Số điện thoại", dataIndex: "phoneNumber", key: "phoneNumber" },
    { title: "Năm sinh", dataIndex: "yearOfBirth", key: "yearOfBirth" },
    { title: "Giới tính", dataIndex: "gender", key: "gender" },
    { title: "Mô tả", dataIndex: "descriptions", key: "descriptions", ellipsis: true },
    {
      title: "Hành động",
      key: "actions",
      render: (_, record) => (
        <div className="flex gap-3">
          <Button type="primary" onClick={() => showEditModal(record)}>Sửa</Button>
          <Popconfirm title="Bạn có chắc chắn muốn xóa?" onConfirm={() => deleteDriver(record.driverId)} okText="Xóa" cancelText="Hủy">
            <Button type="primary" danger>Xóa</Button>
          </Popconfirm>
        </div>
      ),
    },
  ];


  return (
    <div className="p-6 bg-white shadow rounded max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Danh sách tài xế</h2>
        <Button type="primary" onClick={fetchDrivers} className="bg-red-500">
          Tải lại danh sách tài xế
        </Button>
      </div>

      <Table columns={columns} dataSource={drivers} rowKey="driverId" loading={loading} pagination={{ pageSize: 10 }} />

      {/* Modal chỉnh sửa tài xế */}
<Modal title="Chỉnh sửa tài xế" open={isModalOpen} onOk={handleUpdate} onCancel={() => setIsModalOpen(false)}>
  <Form layout="vertical">
    <Form.Item label="ID Tài Xế">
      <Input value={selectedDriver?.driverId} disabled />
    </Form.Item>
    <Form.Item label="Họ và tên">
      <Input value={selectedDriver?.fullName} onChange={(e) => setSelectedDriver({ ...selectedDriver!, fullName: e.target.value })} />
    </Form.Item>
    <Form.Item label="Số điện thoại">
      <Input value={selectedDriver?.phoneNumber} onChange={(e) => setSelectedDriver({ ...selectedDriver!, phoneNumber: e.target.value })} />
    </Form.Item>
    <Form.Item label="Năm sinh">
      <Input type="number" value={selectedDriver?.yearOfBirth} onChange={(e) => setSelectedDriver({ ...selectedDriver!, yearOfBirth: Number(e.target.value) })} />
    </Form.Item>
    <Form.Item label="Giới tính">
      <Select value={selectedDriver?.gender} onChange={(value) => setSelectedDriver({ ...selectedDriver!, gender: value })}>
        <Select.Option value="Nam">Nam</Select.Option>
        <Select.Option value="Nữ">Nữ</Select.Option>
      </Select>
    </Form.Item>
    <Form.Item label="Mô tả">
      <Input value={selectedDriver?.descriptions} onChange={(e) => setSelectedDriver({ ...selectedDriver!, descriptions: e.target.value })} />
    </Form.Item>
    <Form.Item label="Ảnh đại diện">
      <Upload beforeUpload={(file) => { setSelectedImage(file); return false; }}>
        <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
      </Upload>
    </Form.Item>
  </Form>
</Modal>

    </div>
  );
};

export { BusDriverListPage };
