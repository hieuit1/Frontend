import React, { useState } from "react";
import { Sidebar, Header, Footer } from "./components/indexExport";
import Widgets from "./components/widgets";
import UserSignUps from "../userManagement/userSignUps";
import UserPurchasesTickets from "../userManagement/userPurchasesTickets";
import UserCancelsTicket from "../userManagement/userCancelsTicket";
import UserReviews from "../userManagement/userReviews";
import "./dashboard.css";

// Định nghĩa các submenu cho Quản Lý Người Dùng
const userSubMenus = [
  { label: "Người Dùng Đăng Ký", component: <UserSignUps /> },
  { label: "Người Dùng Mua Vé", component: <UserPurchasesTickets /> },
  { label: "Người Dùng Hủy Vé", component: <UserCancelsTicket /> },
  { label: "Người Dùng Đánh Giá", component: <UserReviews /> },
];

const Dashboard: React.FC = () => {
  const [selectedMenu, setSelectedMenu] = useState<string>("Trang chủ");
  const [openSubMenu, setOpenSubMenu] = useState<boolean>(false);
  const [selectedUserSubMenu, setSelectedUserSubMenu] = useState<string>(userSubMenus[0].label);

  // Khi click menu/submenu, cập nhật state phù hợp
  const handleMenuSelect = (menu: string) => {
    setSelectedMenu(menu);
    // Nếu là submenu của Quản Lý Người Dùng thì cập nhật selectedUserSubMenu
    if (userSubMenus.some((sub) => sub.label === menu)) {
      setSelectedMenu("Quản Lý Người Dùng");
      setSelectedUserSubMenu(menu);
    }
  };

  const renderContent = () => {
    if (selectedMenu === "Quản Lý Người Dùng") {
      return (
        <div>
          <div style={{ marginBottom: 16, display: "flex", gap: 8 }}>
            {userSubMenus.map((sub) => (
              <button
                key={sub.label}
                style={{
                  padding: "6px 16px",
                  borderRadius: 4,
                  border: selectedUserSubMenu === sub.label ? "2px solid #1890ff" : "1px solid #ccc",
                  background: selectedUserSubMenu === sub.label ? "#e6f7ff" : "#fff",
                  fontWeight: selectedUserSubMenu === sub.label ? 600 : 400,
                  cursor: "pointer",
                }}
                onClick={() => setSelectedUserSubMenu(sub.label)}
              >
                {sub.label}
              </button>
            ))}
          </div>
          <div>
            {userSubMenus.find((sub) => sub.label === selectedUserSubMenu)?.component}
          </div>
        </div>
      );
    }
    if (selectedMenu === "Danh Thu") {
      return <Widgets />;
    }
    // Thêm các menu khác nếu cần
    return <Widgets />;
  };

  return (
    <div className="dashboard-root">
      <Sidebar
        selectedMenu={selectedMenu}
        setSelectedMenu={handleMenuSelect}
        openSubMenu={openSubMenu}
        setOpenSubMenu={setOpenSubMenu}
      />
      <main className="dashboard-main">
        <Header />
        <section className="dashboard-content">{renderContent()}</section>
        <Footer />
      </main>
    </div>
  );
};

export default Dashboard;