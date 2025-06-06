import { useState } from "react";
import "./auth_css/SignIn_SignUp.css";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google"; // Import GoogleLogin component
import { signIn } from "../../api/indexApi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { googleSignIn } from "../../api/signinApi";

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
      console.log("API response:", data);
      if (data.token && data.email) {
        console.log("API response:", data);
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", data.name);
        localStorage.setItem("name", data.name);
        localStorage.setItem("id", data.id);
        toast.success("Đăng nhập thành công!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          closeButton: false,
        });
        onAuthSuccess();
        navigate("/");
        window.location.reload();
      } else {
        throw new Error("Email hoặc mật khẩu không đúng.");
      }
    } catch (error: any) {
      toast.error(
        `Đăng nhập thất bại: ${error.message || "Lỗi không xác định"}`,
        {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          closeButton: false,
        }
      );
    }
  };

  const handleGoogleLoginSuccess = async (response: any) => {
    try {
      const googleToken = response.credential;
      console.log("Google Token:", googleToken);
      const data = await googleSignIn(googleToken);
      if (data.token && data.user) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", data.user.name); 
        localStorage.setItem("id", data.user.id);
        toast.success("Đăng nhập bằng Google thành công!", {
          position: "top-center",
          autoClose: 3000,
        });
        onAuthSuccess();
        navigate("/");
        window.location.reload(); 
      } else {
        if (
          data.message?.toLowerCase().includes("user not found") ||
          data.error?.toLowerCase().includes("user not found") ||
          data.error?.toLowerCase().includes("please sign up")
        ) {
          toast.error(
            "Chưa có tài khoản, vui lòng đăng ký trước khi đăng nhập.",
            {
              position: "top-right",
              autoClose: 4000,
            }
          );
        } else {
          throw new Error("Xác thực Google thất bại.");
        }
      }
    } catch (error: any) {
      console.error("Google Login Failed:", error);
      toast.error(`Đăng nhập bằng Google thất bại! ${error.message || ""}`, {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const handleGoogleLoginFailure = () => {
    console.error("Google Login Failed");
    toast.error("Đăng nhập bằng Google thất bại!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      closeButton: false,
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h1>Sign In</h1>

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
        <div className="social-icons-google">
          <span className="google-signin-label">or sign in with Google</span>
          <GoogleLogin
            onSuccess={handleGoogleLoginSuccess}
            onError={handleGoogleLoginFailure}
          />
        </div>
      </form>
    </>
  );
}
