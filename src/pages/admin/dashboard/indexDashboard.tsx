import React, { useState } from "react";

import { Sidebar, Header, Footer } from "./components/indexDashboard";

import Widgets from "./components/widgets";

import "./dashboard.css";

const Dashboard: React.FC = () => {
  const [selectedMenu, setSelectedMenu] = useState<string>("Trang chủ");
  const [openSubMenu, setOpenSubMenu] = useState<boolean>(false);

  const renderContent = () => {
    if (selectedMenu === "Danh Thu") {
      return <Widgets />;
    }
    return <Widgets />;
  };

  return (
    <div className="dashboard-root">
      <Sidebar
        selectedMenu={selectedMenu}
        setSelectedMenu={setSelectedMenu}
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