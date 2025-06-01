const API_URL = `${process.env.REACT_APP_API_URL}`;
// const API_COACH = `${process.env.REACT_APP_API_URL}/api-coach`;
/**
 * Lấy danh sách tất cả xe khách.
 */
export const fetchCoaches = async () => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}/useradmin-all-coach`, {
    headers: { Authorization: `Bearer ${token}` }
  });

  if (!response.ok) {
    throw new Error("Không thể tải danh sách xe khách");
  }
  return await response.json();
};

/**
 * Lấy chi tiết xe khách theo ID.
 */
export const fetchCoachById = async (id: number) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}/useradmin-all-coach/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });

  if (!response.ok) {
    throw new Error("Không thể tải thông tin xe khách");
  }
  return await response.json();
};

/**
 * Tạo xe khách mới.
 */
export const createCoach = async (formData: FormData) => {
  const token = localStorage.getItem("token");
  console.log("📡 Đang gửi request API createCoach...", formData);
  console.log("🔒 Token gửi đi:", token);

  const response = await fetch(`http://localhost:8080/api/api-coach/create-coach`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });

  console.log("✅ Phản hồi từ API:", response);

  if (!response.ok) {
    throw new Error("Không thể tạo xe khách");
  }

  return await response.json(); // ✅ Đảm bảo API trả về dữ liệu
};




/**
 * Cập nhật thông tin xe khách.
 */
export const updateCoach = async (id: number, values: any) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}/update-coach/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify(values),
  });

  if (!response.ok) {
    throw new Error("Không thể cập nhật xe khách");
  }
};

/**
 * Xóa xe khách theo ID.
 */
export const deleteCoach = async (id: number) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}/delete-coach/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` }
  });

  if (!response.ok) {
    throw new Error("Xóa xe khách thất bại");
  }
};


