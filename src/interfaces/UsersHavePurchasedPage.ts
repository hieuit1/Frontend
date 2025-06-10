export interface Ticket {
  email: string;
  numberphone: number;
  username: string;
  status: string;
}

export interface UserDetail {
  email: string;
  numberphone: number;
  purchasedCount: number;
  cancelledCount: number;
}