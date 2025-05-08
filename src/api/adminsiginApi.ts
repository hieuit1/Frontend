export const adminSignIn = async (email: string, password: string) => {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/auth/admin`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    }
  );
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Đăng nhập thất bại.");
  }
  return data;
}

