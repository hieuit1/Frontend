export const signIn = async (email: string, password: string) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Đăng nhập thất bại.");
  }
  // Không lưu localStorage ở đây!
  return data;
};

export const googleSignIn = async (credential: string) => {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/auth/google-signin`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ credential }),
    }
  );
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Đăng nhập bằng Google thất bại.");
  }
  return data;
};
