// src/pages/admin/dashboard/renderConditions/userManagementCondition.tsx
import React from "react";
import { userSubMenus } from "../../../../../data/userSubMenus"; // Import danh sách submenu từ file riêng

export const renderUserManagement = (
  selectedUserSubMenu: string,
  setSelectedUserSubMenu: (label: string) => void
) => {
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
};
