import moment from "moment";
import { User } from "../interfaces/User";

const API_URL = `${process.env.REACT_APP_API_URL}/manager-user`; 
/**
 * Lấy token từ localStorage
 */
const getToken = () => localStorage.getItem("token");
/**
 * Lấy danh sách tất cả người dùng.
 */
export const fetchUsers = async (): Promise<User[]> => {
  const token = getToken();
  const response = await fetch(API_URL, {
    headers: { Authorization: `Bearer ${token}` }
  });

  if (!response.ok) {
    throw new Error("Không thể tải danh sách người dùng");
  }
  return await response.json();
};

/**
 * Xóa 1 người dùng theo ID.
 */
export const deleteUser = async (id: number): Promise<void> => {
  const token = getToken();
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` }
  });

  if (!response.ok) {
    throw new Error(`Xóa người dùng thất bại (ID: ${id})`);
  }
};

/**
 * Xóa hàng loạt người dùng theo danh sách ID.
 */
export const bulkDeleteUsers = async (ids: number[]): Promise<void> => {
  const token = getToken();
  await Promise.all(
    ids.map((id) =>
      fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
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
  const token = getToken();
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
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
