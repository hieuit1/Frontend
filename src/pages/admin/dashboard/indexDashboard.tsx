import React, { useState } from "react";
import { Sidebar, Header, Footer } from "./components/indexExport";
import Widgets from "./components/widgets";
import SettingPage from "../setting/settingPage"; 
import { userSubMenus } from "../../../data/userSubMenus";
import { ticketRenderHandlers } from "../dashboard/components/renderConditions/ticketConditions";
import { renderUserManagement } from "../dashboard/components/renderConditions/userManagementCondition";
import "./dashboard.css";

const Dashboard: React.FC = () => {
  const [selectedMenu, setSelectedMenu] = useState<string>("Trang chủ");
  const [openSubMenu, setOpenSubMenu] = useState<boolean>(false);
  const [selectedUserSubMenu, setSelectedUserSubMenu] = useState<string>(userSubMenus[0].label);

  const [showTouristBusForm, setShowTouristBusForm] = useState(false);
  const [showIntercityBusForm, setShowIntercityBusForm] = useState(false);
  const [showTrainTicketForm, setShowTrainTicketForm] = useState(false);
  const [showAirlineTicketForm, setShowAirlineTicketForm] = useState(false);
  const [showMotorcycleTicketForm, setShowMotorcycleTicketForm] = useState(false);
  const [showTaxiTicketForm, setShowTaxiTicketForm] = useState(false);
  const [showBusTicketForm, setShowBusTicketForm] = useState(false);
  const [showDriverForm, setShowDriverForm] = useState(false);
  const [showCoachForm, setShowCoachForm] = useState(false); // ✅ Thêm trạng thái

  const handleMenuSelect = (menu: string) => {
    setSelectedMenu(menu);
    if (userSubMenus.some((sub) => sub.label === menu)) {
      setSelectedMenu("Quản Lý Người Dùng");
      setSelectedUserSubMenu(menu);
    }

    if (menu !== "Bán Vé Xe Du Lịch") setShowTouristBusForm(false);
    if (menu !== "Bán Vé Xe Khách") setShowIntercityBusForm(false);
    if (menu !== "Bán Vé Tàu") setShowTrainTicketForm(false);
    if (menu !== "Bán Vé Máy Bay") setShowAirlineTicketForm(false);
    if (menu !== "Bán Vé Xe Ôm") setShowMotorcycleTicketForm(false);
    if (menu !== "Bán Vé Taxi") setShowTaxiTicketForm(false);
    if (menu !== "Bán Vé Xe Bus") {
      setShowBusTicketForm(false);
      setShowDriverForm(false);
      setShowCoachForm(false); // ✅ Đóng form tạo xe khách khi đổi menu
    }
  };

  const renderContent = () => {
    if (selectedMenu === "Quản Lý Người Dùng") {
      return renderUserManagement(selectedUserSubMenu, setSelectedUserSubMenu);
    }

    if (selectedMenu === "Cài Đặt") {
      return <SettingPage />;
    }

if (selectedMenu in ticketRenderHandlers) {
  return ticketRenderHandlers[selectedMenu as keyof typeof ticketRenderHandlers](
    showBusTicketForm,
    setShowBusTicketForm,
    showDriverForm,
    setShowDriverForm,
    showCoachForm, // ✅ Đã thêm tham số thiếu
    setShowCoachForm // ✅ Đã thêm tham số thiếu
  );
}



    if (selectedMenu === "Danh Thu") return <Widgets />;

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
