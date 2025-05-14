import React, { useState } from "react";
import { Sidebar, Header, Footer } from "./components/indexExport";
import Widgets from "./components/widgets";
import { UserSignUps, UserReviews } from "../userManagement/userManagementExport";
import UserPurchasesTickets from "../userManagement/userPurchasesTickets";
import UserCancelsTicket from "../userManagement/userCancelsTicket";
import TouristBusTicketSalesList from "../ticketSalesManagement/touristBusTicketSales/touristBusTicketSalesListPage";
import TouristBusTicketSalesPage from "../ticketSalesManagement/touristBusTicketSales/touristBusTicketSalesPage";
import { IntercityBusTicketSalesPage, IntercityBusTicketSalesListPage, TrainTicketSalesListPage, TrainTicketSalesPage, MotorcycleTicketSalesListPage, MotorcycleTicketSalesPage } from "../ticketSalesManagement/indexExport";
import AirlineTicketSalesListPage from "../ticketSalesManagement/airlineTicketSales/airlineTicketSalesListPage";
import { AirlineTicketSalesPage } from "../ticketSalesManagement/airlineTicketSales/airlineTicketSalesPage";
import "./dashboard.css";
import { Button } from "antd";

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
  const [showTouristBusForm, setShowTouristBusForm] = useState(false);
  const [showIntercityBusForm, setShowIntercityBusForm] = useState(false);
  const [showTrainTicketForm, setShowTrainTicketForm] = useState(false);
  const [showAirlineTicketForm, setShowAirlineTicketForm] = useState(false);
  const [showMotorcycleTicketForm, setShowMotorcycleTicketForm] = useState(false);

  // Khi click menu/submenu, cập nhật state phù hợp
  const handleMenuSelect = (menu: string) => {
    setSelectedMenu(menu);
    // Nếu là submenu của Quản Lý Người Dùng thì cập nhật selectedUserSubMenu
    if (userSubMenus.some((sub) => sub.label === menu)) {
      setSelectedMenu("Quản Lý Người Dùng");
      setSelectedUserSubMenu(menu);
    }
    // Reset form hiển thị khi chuyển menu
    if (menu !== "Bán Vé Xe Du Lịch") setShowTouristBusForm(false);
    if (menu !== "Bán Vé Xe Khách") setShowIntercityBusForm(false);
    if (menu !== "Bán Vé Tàu") setShowTrainTicketForm(false);
    if (menu !== "Bán Vé Máy Bay") setShowAirlineTicketForm(false);
    if (menu !== "Bán Vé Xe Ôm") setShowMotorcycleTicketForm(false);
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
    if (selectedMenu === "Bán Vé Xe Du Lịch") {
      if (showTouristBusForm) {
        return (
          <div>
            <Button onClick={() => setShowTouristBusForm(false)} style={{ marginBottom: 16 }}>
              Quay lại danh sách vé
            </Button>
            <TouristBusTicketSalesPage />
          </div>
        );
      }
      return (
        <div>
          <Button
            type="primary"
            style={{ marginBottom: 16 }}
            onClick={() => setShowTouristBusForm(true)}
          >
            Đăng bán vé xe du lịch
          </Button>
          <TouristBusTicketSalesList />
        </div>
      );
    }
    if (selectedMenu === "Bán Vé Xe Khách") {
      if (showIntercityBusForm) {
        return (
          <div>
            <Button onClick={() => setShowIntercityBusForm(false)} style={{ marginBottom: 16 }}>
              Quay lại danh sách vé
            </Button>
            <IntercityBusTicketSalesPage />
          </div>
        );
      }
      return (
        <div>
          <IntercityBusTicketSalesListPage onAddTicket={() => setShowIntercityBusForm(true)} />
        </div>
      );
    }
    if (selectedMenu === "Bán Vé Tàu") {
      if (showTrainTicketForm) {
        return (
          <div>
            <Button onClick={() => setShowTrainTicketForm(false)} style={{ marginBottom: 16 }}>
              Quay lại danh sách vé
            </Button>
            <TrainTicketSalesPage />
          </div>
        );
      }
      return (
        <div>
          <TrainTicketSalesListPage onAddTicket={() => setShowTrainTicketForm(true)} />
        </div>
      );
    }
    if (selectedMenu === "Bán Vé Máy Bay") {
      if (showAirlineTicketForm) {
        return (
          <div>
            <Button onClick={() => setShowAirlineTicketForm(false)} style={{ marginBottom: 16 }}>
              Quay lại danh sách vé
            </Button>
            <AirlineTicketSalesPage />
          </div>
        );
      }
      return (
        <div>
          <AirlineTicketSalesListPage onAddTicket={() => setShowAirlineTicketForm(true)} />
        </div>
      );
    }
    if (selectedMenu === "Bán Vé Xe Ôm") {
      if (showMotorcycleTicketForm) {
        return (
          <div>
            <Button onClick={() => setShowMotorcycleTicketForm(false)} style={{ marginBottom: 16 }}>
              Quay lại danh sách vé
            </Button>
            <MotorcycleTicketSalesPage />
          </div>
        );
      }
      return (
        <div>
          <MotorcycleTicketSalesListPage onAddTicket={() => setShowMotorcycleTicketForm(true)} />
        </div>
      );
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