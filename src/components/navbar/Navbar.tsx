import React, { useState } from "react";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import "./navbar_css/Navbar.css"; // Đảm bảo đường dẫn đúng

const Navbar: React.FC = () => {
  const [user, setUser] = useState<string | null>(null); // Trạng thái lưu tên người dùng

  // Giả lập đăng nhập (thay thế bằng logic thực tế của bạn)
  const handleLogin = () => {
    setUser("Nguyễn Văn A"); // Thay bằng tên người dùng thực tế sau khi đăng nhập
  };

  const handleLogout = () => {
    setUser(null); // Đặt lại trạng thái khi đăng xuất
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-link">
          <HomeIcon fontSize="small" />
          <span>Trang chủ</span>
        </Link>
        <Link to="/payment" className="navbar-link">
          <CreditCardIcon fontSize="small" />
          <span>Thanh toán</span>
        </Link>
        {user ? (
          <div className="navbar-link" onClick={handleLogout}>
            <LockOpenIcon fontSize="small" />
            <span>{user}</span> {/* Hiển thị tên người dùng */}
          </div>
        ) : (
          <Link to="/auth" className="navbar-link" onClick={handleLogin}>
            <LockOpenIcon fontSize="small" />
            <span>Đăng Nhập</span>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
