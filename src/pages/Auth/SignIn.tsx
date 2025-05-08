import { useState } from "react";
import "./auth_css/SignIn_SignUp.css";
import { useNavigate } from "react-router-dom";

import { signIn } from "../../api/indexApi";


interface SignInProps {
  onAuthSuccess: () => void;
}

export function SignIn({ onAuthSuccess }: SignInProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  
  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    const data = await signIn(email, password);

    if (!data) {
      alert("Đăng nhập thất bại: Không nhận được dữ liệu.");
      return;
    }

    // Ví dụ: lưu token nếu có
    if (data.token) {
      localStorage.setItem("token", data.token);
    }

    alert("Đăng nhập thành công!");
    onAuthSuccess();
    navigate("/");
  } catch (error: any) {
    alert(`Đăng nhập thất bại: ${error.message || "Lỗi không xác định"}`);
  }
};

  return (
    <form onSubmit={handleSubmit}>
      <h1>Sign In</h1>
      <div className="social-icons">
        <a href="#" className="icon">
          <i className="fa-brands fa-google-plus-g"></i>
        </a>
        <a href="#" className="icon">
          <i className="fa-brands fa-facebook-f"></i>
        </a>
        <a href="#" className="icon">
          <i className="fa-brands fa-github"></i>
        </a>
        <a href="#" className="icon">
          <i className="fa-brands fa-linkedin-in"></i>
        </a>
      </div>
      <span>or use your email password</span>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <a href="#" onClick={() => navigate("/forgot-password")}>
        Forget Your Password?
      </a>
      <button type="submit">Sign In</button>
    </form>
  );
}
