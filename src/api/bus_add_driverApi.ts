//Frontend\src\api\bus_add_driverApi.ts
export const createDriver = async (formData: FormData) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${process.env.REACT_APP_API_URL}/api-driver/create-driver`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

/* Đoạn mã này xử lý tình huống lỗi khi phản hồi từ API không thành công
(tức là mã trạng thái HTTP không nằm trong phạm vi 200-299). Sau đây là phân tích về những gì nó thực hiện: */
  if (!response.ok) {
    const errorText = await response.text(); 
    console.error("API Error:", errorText);
    throw new Error("Gửi dữ liệu thất bại: " + errorText);
  }
  /* Mã `const res = await response.json(); return res;` đang phân tích cú pháp phản hồi từ API dưới dạng
JSON. */
  const res = await response.json();
  return res;
};
