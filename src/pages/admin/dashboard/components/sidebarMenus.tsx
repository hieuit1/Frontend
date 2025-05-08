export interface SidebarMenuItem {
    icon: string;
    label: string;
    children?: { label: string }[];
  }
  
  export const userManagementMenu: SidebarMenuItem = {
    icon: "👩‍💻",
    label: "Quản Lý Người Dùng",
    children: [
      { label: "Người Dùng Đăng Ký" },
      { label: "Người Dùng Đánh Giá" },
      { label: "Người Dùng Hủy Vé" },
      { label: "Người Dùng Mua Vé" },
    ],
  };