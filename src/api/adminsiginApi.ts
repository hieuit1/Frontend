// Dang Nhap Admin
export const adminSignIn = async (email: string, password: string) => {
/* Đoạn mã này đang thực hiện yêu cầu POST tới một URL cụ thể để xác thực người dùng. Sau đây là
phân tích về những gì từng phần đang thực hiện: */
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/auth/signin`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    }
  );

  let data;
  const text = await response.text();
  /* The code `try { data = text ? JSON.parse(text) : {};} catch { data = {};}` is a try-catch block in
  JavaScript. Here's what it does: */
  try { data = text ? JSON.parse(text) : {};} catch { data = {};}
  console.log("API response:", data);
  /* Dòng mã này đang kiểm tra phản hồi từ yêu cầu API để xem phản hồi có thành công không
(`response.ok`) và dữ liệu phản hồi có chứa mã thông báo không (`data.token`). Nếu bất kỳ điều kiện nào trong số
điều kiện này không được đáp ứng, nó sẽ đưa ra lỗi với thông báo cho biết rằng quá trình đăng nhập không thành công (`"Đăng
nhập thất bại."`). Đây là cách xử lý lỗi trong quá trình đăng nhập và cung cấp phản hồi cho
người dùng nếu có sự cố xảy ra. */
  if (!response.ok || !data.token) { throw new Error(data.message || "Đăng nhập thất bại."); }
  return data;
}