/** Quản Lý Người Dùng Hủy Vé*/
const API_URL = "https://your-api-url.com/cancels";

export const fetchCancels = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Lỗi khi lấy dữ liệu");
    return await response.json();
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const deleteCancel = async (id: number) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Lỗi khi xóa dữ liệu");
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const confirmCancel = async (id: number) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cancelStatus: "Đã hủy vé" }),
    });
    if (!response.ok) throw new Error("Lỗi khi xác nhận hủy vé");
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
