import React from "react";

const Header: React.FC = () => {
  return (
    <header className="dashboard-header">
      <nav>
        <a href="#">Quản Lý Vé Xe</a>
        <a href="#">Bán Vé</a>
        <a href="#">Thời Gian Xe Chạy</a>
        <a href="#">Khuyến mãi & giảm giá</a>
        <a href="#">Bảng Thống Kê</a>
      </nav>
      <div className="header-avatar">
        <img src="/logo192.png" alt="Avatar" />
      </div>
    </header>
  );
};

export  { Header };