export const resetPassword = async (token: string, password: string) => {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/auth/reset-password?token=${token}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    }
  );
  let data;
  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    data = await response.json(); } else { data = { message: await response.text() }; }
  if (!response.ok) { throw new Error(data.message || "Đặt lại mật khẩu thất bại.");}
  return data;
};
