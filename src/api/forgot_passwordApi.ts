export const forgotPassword = async (email: string) => {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/auth/forgot-password`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    }
  );
  let data;
  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    data = await response.json();
  } else {
    data = { message: await response.text() };
  }
  if (!response.ok) {
    throw new Error(data.message || "Gửi yêu cầu quên mật khẩu thất bại.");
  }
  return data;
};
