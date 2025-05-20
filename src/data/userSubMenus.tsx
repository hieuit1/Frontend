import { UserSignUps, UserReviews, UserCancelsTicket, UserPurchasesTickets } from "../pages/admin/userManagement/userManagementExport";

export const userSubMenus = [
  { label: "Người Dùng Đăng Ký", component: <UserSignUps /> },
  { label: "Người Dùng Mua Vé", component: <UserPurchasesTickets /> },
  { label: "Người Dùng Hủy Vé", component: <UserCancelsTicket /> },
  { label: "Người Dùng Đánh Giá", component: <UserReviews /> },
];