export interface User {
  id: number;
  name: string;
  email: string;
  numberphone: string;  // 🆕 
  role: string;         // 🆕 
  registeredAt: string;
  method?: "Google" | "Tài khoản";
  password?: string;
  updatedAt?: string;
}