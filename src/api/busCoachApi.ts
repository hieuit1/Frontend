//Frontend\src\api\busCoachApi.ts
/**
 * Lấy danh sách tất cả xe khách.
 */
export const fetchCoaches = async () => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${process.env.REACT_APP_API_URL}/useradmin-all-coach`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!response.ok) { throw new Error("Không thể tải danh sách xe khách ❌"); }
  return await response.json();
};

/**
 * Lấy chi tiết xe khách theo ID.
 */
export const fetchCoachById = async (id: number) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${process.env.REACT_APP_API_URL}/useradmin-all-coach/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!response.ok) { throw new Error("Không thể tải thông tin xe khách ❌"); }
  return await response.json();
};

/**
 * Tạo xe khách mới.
 */
export const createCoach = async (formData: FormData) => {
  const token = localStorage.getItem("token");
  console.log("📡 Đang gửi request API createCoach...", formData);
  console.log("🔒 Token gửi đi:", token);
  const response = await fetch(`${process.env.REACT_APP_API_URL}/api-coach/create-coach`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });
  console.log("✅ Phản hồi từ API:", response);
  if (!response.ok) { throw new Error("Không thể tạo xe khách ❌"); }
  return await response.json(); // ✅ 
};


/**
 * Cập nhật thông tin xe khách.
 */
export const updateCoach = async (id: number, values: any, file?: File) => {
  const token = localStorage.getItem("token");
  const formData = new FormData();
  formData.append("coachName", values.coachName);
  formData.append("licensePlateNumberCoach", values.licensePlateNumberCoach);
  if (file) {
    formData.append("image", file);
  }
  console.log("📡 Dữ liệu gửi API cập nhật xe khách:", formData);
  const response = await fetch(`${process.env.REACT_APP_API_URL}/api-coach/update-coach/${id}`, {
    method: "PUT",
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });
  /* The line `if (!response.ok) { throw new Error("Không thể cập nhật xe khách "); }` is checking if
  the response from the API call to update a coach is not successful (i.e., the response status is
  not in the range 200-299 which indicates success). If the response is not ok, it throws an error
  with the message "Không thể cập nhật xe khách", indicating that the update coach operation failed.
  This is a way to handle errors and notify the calling code that the update operation was not
  successful. */
  if (!response.ok) { throw new Error("Không thể cập nhật xe khách ❌"); }
  return await response.json();
};

/**
 * Xóa xe khách theo ID.
 */
export const deleteCoach = async (id: number) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${process.env.REACT_APP_API_URL}/api-coach/delete-coach/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!response.ok) {  throw new Error("Xóa xe khách thất bại ❌"); }
};


