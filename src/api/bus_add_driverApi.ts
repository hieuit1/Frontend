export const createDriver = async (formData: FormData) => {
  const token = localStorage.getItem("token");

  const response = await fetch("http://localhost:8080/api-driver/create-driver", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    const errorText = await response.text(); // lấy lỗi chi tiết
    console.error("API Error:", errorText);
    throw new Error("Gửi dữ liệu thất bại: " + errorText);
  }

  const res = await response.json();
  return res;
};
