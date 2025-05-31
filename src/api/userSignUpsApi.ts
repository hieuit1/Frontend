import moment from "moment";

/**
 * Interface định nghĩa dữ liệu người dùng.
 */
export interface User {
  id: number;
  name: string;
  email: string;
  registeredAt: string;
  method?: "Google" | "Tài khoản";
  password?: string;
  updatedAt?: string;
}

const API_URL = "https://api.example.com/users"; // Thay bằng URL thực tế nếu cần

/**
 * Lấy danh sách tất cả người dùng.
 */
export const fetchUsers = async (): Promise<User[]> => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error("Không thể tải danh sách người dùng");
  }
  return await response.json();
};

/**
 * Xóa 1 người dùng theo ID.
 */
export const deleteUser = async (id: number): Promise<void> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error(`Xóa người dùng thất bại (ID: ${id})`);
  }
};

/**
 * Xóa hàng loạt người dùng theo danh sách ID.
 */
export const bulkDeleteUsers = async (ids: number[]): Promise<void> => {
  await Promise.all(
    ids.map((id) =>
      fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      }).then((res) => {
        if (!res.ok) throw new Error(`Xóa người dùng thất bại (ID: ${id})`);
      })
    )
  );
};

/**
 * Cập nhật thông tin người dùng.
 */
export const updateUser = async (
  id: number,
  values: Partial<User>
): Promise<User> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...values,
      updatedAt: moment().format("YYYY-MM-DD HH:mm:ss"),
    }),
  });

  if (!response.ok) {
    throw new Error("Cập nhật người dùng thất bại");
  }

  return await response.json();
};
