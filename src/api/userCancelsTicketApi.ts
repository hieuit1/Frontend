/** Quản Lý Người Dùng Hủy Vé*/
const API_URL_GET_ALL_TICKETS = `${process.env.REACT_APP_API_URL}/admin-ticket/get-all-tickets`;

const API_URL_DELETE = `${process.env.REACT_APP_API_URL}/admin-ticket/cancel-ticket`;

const API_URL_PUT = `${process.env.REACT_APP_API_URL}/admin-ticket`;

export const fetchCancels = async () => {
  try {
    const response = await fetch(API_URL_GET_ALL_TICKETS);
    if (!response.ok) throw new Error("Lỗi khi lấy dữ liệu");
    return await response.json();
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const deleteCancel = async (id: number) => {
  try {
    const response = await fetch(`${API_URL_DELETE}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Lỗi khi xóa dữ liệu");
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const confirmCancel = async (id: number) => {
  try {
    const response = await fetch(`${API_URL_PUT}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cancelStatus: "Đã hủy vé" }),
    });
    if (!response.ok) throw new Error("Lỗi khi xác nhận hủy vé");
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
