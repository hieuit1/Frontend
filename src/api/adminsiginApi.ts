// Dang Nhap Admin
export const adminSignIn = async (email: string, password: string) => {
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
  try { data = text ? JSON.parse(text) : {};} catch { data = {};}
  console.log("API response:", data);
  if (!response.ok || !data.token) { throw new Error(data.message || "Đăng nhập thất bại."); }
  return data;
}