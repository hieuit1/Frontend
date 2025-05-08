import React from "react";

interface Props {
  selectedMenu: string;
  setSelectedMenu: (menu: string) => void;
  openTicketSalesMenu: boolean;
  setOpenTicketSalesMenu: (open: boolean) => void;
}

const TicketSalesManagementSidebarMenuList: React.FC<Props> = ({
  selectedMenu,
  setSelectedMenu,
  openTicketSalesMenu,
  setOpenTicketSalesMenu,
}) => (
  <>
    <li
      className={selectedMenu === "Quản Lý Bán Vé" ? "active" : ""}
      onClick={() => setOpenTicketSalesMenu(!openTicketSalesMenu)}
      style={{
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        userSelect: "none",
        padding: "8px 12px",
      }}
    >
      <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span className="sidebar-icon">💰</span>
        <span>Quản Lý Bán Vé</span>
      </span>
      <span
        className={`chevron ${openTicketSalesMenu ? "open" : ""}`}
        style={{
          transition: "transform 0.2s",
          display: "inline-block",
          marginLeft: 8,
          fontSize: 16,
        }}
      >
        ▶
      </span>
    </li>
    {openTicketSalesMenu && (
      <ul style={{ paddingLeft: 32 }}>
        <li
          className={selectedMenu === "Bán Vé Máy Bay" ? "active" : ""}
          onClick={() => setSelectedMenu("Bán Vé Máy Bay")}
          style={{
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 8,
            userSelect: "none",
            padding: "6px 0",
          }}
        >
          <span
            style={{
              display: "inline-block",
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "#00bcd4",
              marginRight: 8,
            }}
          ></span>
          Bán Vé Máy Bay
        </li>
        <li
          className={selectedMenu === "Bán Xe Ôm" ? "active" : ""}
          onClick={() => setSelectedMenu("Bán Xe Ôm")}
          style={{
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 8,
            userSelect: "none",
            padding: "6px 0",
          }}
        >
          <span
            style={{
              display: "inline-block",
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "#00bcd4",
              marginRight: 8,
            }}
          ></span>
          Bán Xe Ôm
        </li>
        <li
          className={selectedMenu === "Bán Vé Taxi" ? "active" : ""}
          onClick={() => setSelectedMenu("Bán Vé Taxi")}
          style={{
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 8,
            userSelect: "none",
            padding: "6px 0",
          }}
        >
          <span
            style={{
              display: "inline-block",
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "#00bcd4",
              marginRight: 8,
            }}
          ></span>
          Bán Vé Taxi
        </li>
        <li
          className={selectedMenu === "Bán Vé Tàu" ? "active" : ""}
          onClick={() => setSelectedMenu("Bán Vé Tàu")}
          style={{
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 8,
            userSelect: "none",
            padding: "6px 0",
          }}
        >
          <span
            style={{
              display: "inline-block",
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "#00bcd4",
              marginRight: 8,
            }}
          ></span>
          Bán Vé Tàu
        </li>
        <li
          className={selectedMenu === "Bán Vé Xe Du Lịch" ? "active" : ""}
          onClick={() => setSelectedMenu("Bán Vé Xe Du Lịch")}
          style={{
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 8,
            userSelect: "none",
            padding: "6px 0",
          }}
        >
          <span
            style={{
              display: "inline-block",
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "#00bcd4",
              marginRight: 8,
            }}
          ></span>
          Bán Vé Xe Du Lịch
        </li>
      </ul>
    )}
  </>
);

export default TicketSalesManagementSidebarMenuList;