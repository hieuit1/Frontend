export interface User {
  id: number;
  name: string;
  email: string;
  numberphone: string;  // 🆕 Thêm số điện thoại
  role: string;         // 🆕 Thêm vai trò
  registeredAt: string;
  method?: "Google" | "Tài khoản";
  password?: string;
  updatedAt?: string;
}