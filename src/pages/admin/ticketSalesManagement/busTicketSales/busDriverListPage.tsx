import React, { useEffect, useState } from "react";
import { Table, message, Button, Avatar } from "antd";
import type { ColumnsType } from "antd/es/table";

interface Driver {
  driverId: number;
  fullName: string;
  phoneNumber: number;
  yearOfBirth: number;
  descriptions: string;
  gender: string;
  url: string;
  publicId: string;
}

interface DriverListPageProps {
  onAddTicket: () => void;
  onAddDriver: () => void;
}

const BusDriverListPage: React.FC<DriverListPageProps> = ({ onAddTicket, onAddDriver }) => {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchDrivers();
  }, []);

  const fetchDrivers = async () => {
    setLoading(true);
    try {
      // Get the authentication token from localStorage
      const token = localStorage.getItem('accessToken');
      
      const res = await fetch("http://localhost:8080/useradmin-all-driver", {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!res.ok) throw new Error("Lỗi khi lấy dữ liệu tài xế");
      
      const data = await res.json();
      setDrivers(data);
    } catch (err) {
      console.error(err);
      message.error("Không thể tải danh sách tài xế");
    } finally {
      setLoading(false);
    }
  };

  const columns: ColumnsType<Driver> = [
    {
      title: "Ảnh",
      dataIndex: "url",
      key: "url",
      render: (url) => (
        <Avatar 
          src={url || "https://via.placeholder.com/150"} 
          size={40} 
          alt="Driver avatar"
        />
      ),
    },
    {
      title: "Họ và tên",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      render: (phone) => `0${phone}`,
    },
    {
      title: "Năm sinh",
      dataIndex: "yearOfBirth",
      key: "yearOfBirth",
    },
    {
      title: "Giới tính",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "Mô tả",
      dataIndex: "descriptions",
      key: "descriptions",
      ellipsis: true,
    },
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-4">Danh sách tài xế</h1>
        <div className="flex gap-4 mb-4">
          <Button 
            type="primary" 
            onClick={onAddDriver}
            className="bg-blue-500"
          >
            Thêm tài xế mới
          </Button>
          
          <Button 
            type="primary" 
            onClick={onAddTicket}
            className="bg-green-500"
          >
            Đăng bán vé mới
          </Button>
        </div>
      </div>
      
      <Table 
        columns={columns} 
        dataSource={drivers} 
        rowKey="driverId" 
        loading={loading}
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
};

export { BusDriverListPage };