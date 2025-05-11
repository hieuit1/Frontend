import { useState } from "react";
import "./auth_css/SignIn_SignUp.css";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google"; // Import GoogleLogin component
import { signIn } from "../../api/indexApi";
import { googleSignIn } from "../../api/signinApi"; // Import API mới

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

  const handleGoogleLoginSuccess = async (response: any) => {
    try {
      const googleToken = response.credential; // Lấy token từ Google
      console.log("Google Token:", googleToken);

      // Gửi token đến backend để xác thực
      const data = await googleSignIn(googleToken);

      if (data.token && data.user) {
        localStorage.setItem("token", data.token); // Lưu token vào localStorage
        localStorage.setItem("user", data.user.name || data.user.email); // Lưu tên hoặc email người dùng
        alert("Đăng nhập bằng Google thành công!");
        onAuthSuccess();
        navigate("/");
      } else {
        throw new Error("Xác thực Google thất bại.");
      }
    } catch (error) {
      console.error("Google Login Failed:", error);
      alert("Đăng nhập bằng Google thất bại!");
    }
  };

  const handleGoogleLoginFailure = () => {
    console.error("Google Login Failed");
    alert("Đăng nhập bằng Google thất bại!");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Sign In</h1>
      <div className="social-icons">
        <GoogleLogin
          onSuccess={handleGoogleLoginSuccess}
          onError={handleGoogleLoginFailure}
        />
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
