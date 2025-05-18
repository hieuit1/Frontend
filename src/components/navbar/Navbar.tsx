import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import "./navbar_css/Navbar.css";

const logo = require("../../images/payment/Logo.jpg");

const Navbar: React.FC = () => {
  const [user, setUser] = useState<string | null>(null);
  const [showMenu, setShowMenu] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const handleLogout = () => {
    setShowMenu(false);
    setShowModal(true);
  };

  const confirmLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setShowModal(false);
  };

  const cancelLogout = () => {
    setShowModal(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="/">
            <img src={logo} alt="Logo" className="navbar-logo-image" />
          </Link>
        </div>
        <div className="navbar-right">
          <div className="navbar-links">
            <Link to="/#" className="navbar-link">
              Hỗ trợ
            </Link>
            <Link to="/#" className="navbar-link">
              Hợp tác với chúng tôi
            </Link>
            <Link to="/privacy-policy" className="navbar-link">
              Chính sách bảo mật
            </Link>
          </div>
          <div className="navbar-auth">
            {user ? (
              <div className="navbar-user" style={{ position: "relative" }}>
                <div onClick={() => setShowMenu((v) => !v)}>
                  <PersonIcon fontSize="small" />
                  <span>{user}</span>
                </div>
                {showMenu && (
                  <div className="navbar-user-menu">
                    <Link to="/account" className="navbar-user-link">
                      Vé của tôi
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="navbar-logout-btn"
                    >
                    <p style={{ color: "#d32f2f", fontWeight: "600" }}>Đăng xuất</p>
                    </button>
                  </div>
                )}
                {showModal && (
                  <div className="navbar-modal">
                    <div>
                      <p>Bạn có chắc chắn muốn đăng xuất không?</p>
                      <button
                        onClick={confirmLogout}
                        style={{ marginRight: 16 }}
                        className="navbar-confirm-btn"
                      >
                       <h3 style={{ color: "#4caf50", fontWeight: "600" }}>Đồng ý</h3>
                      </button>
                      <button onClick={cancelLogout}>Hủy</button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/auth" className="navbar-login">
                <PersonIcon fontSize="small" />
                <span>Đăng Nhập</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
