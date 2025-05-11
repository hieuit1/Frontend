import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import "./navbar_css/Navbar.css";

const Navbar: React.FC = () => {
  const [user, setUser] = useState<string | null>(null);

  // Lấy thông tin người dùng từ localStorage khi component được render
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(storedUser); // Cập nhật trạng thái người dùng
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user"); // Xóa thông tin người dùng khỏi localStorage
    localStorage.removeItem("token"); // Xóa token nếu cần
    setUser(null); // Đặt lại trạng thái người dùng
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-link">
          <HomeIcon fontSize="small" />
          <span>Trang chủ</span>
        </Link>

        {user ? (
          <div className="navbar-link" onClick={handleLogout}>
            <LockOpenIcon fontSize="small" />
            <span>{user}</span> {/* Hiển thị tên người dùng */}
          </div>
        ) : (
          <Link to="/auth" className="navbar-link">
            <LockOpenIcon fontSize="small" />
            <span>Đăng Nhập</span>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
