import { useState } from "react";
import "./auth_css/SignIn_SignUp.css";
import { GoogleLogin } from "@react-oauth/google";
import { signUp } from "../../api/indexApi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { googleSignUp } from "../../api/signupApi";

interface SignUpProps {
  onAuthSuccess: () => void;
}

export function SignUp({ onAuthSuccess }: SignUpProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const data = await signUp(name, phone, email, password);

      toast.success("Đăng ký thành công!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        closeButton: false,
      });

      onAuthSuccess();
      console.log("Signup successful:", data);
    } catch (error: any) {
      toast.error(
        `Đăng ký thất bại: ${
          error.message || "Đã xảy ra lỗi trong quá trình đăng ký."
        }`,
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

  const handleGoogleSignupSuccess = async (response: any) => {
    try {
      const credential = response.credential;
      if (!credential) throw new Error("Google credential not found");

      const data = await googleSignUp(credential);

      toast.success("Đăng ký bằng Google thành công!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        closeButton: false,
      });

      onAuthSuccess();
      console.log("Signup with Google successful:", data);
    } catch (error: any) {
      console.error("Google Signup Error:", error);

      // Kiểm tra lỗi từ backend, giả sử backend trả message này khi tài khoản đã tồn tại
      const errorMessage =
        error.message === "Google account already registered"
          ? "Tài khoản Google này đã được đăng ký, vui lòng đăng nhập."
          : error.message || "Lỗi không xác định.";

      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        closeButton: false,
      });
    }
  };

  const handleGoogleSignupFailure = () => {
    console.error("Google Signup Failed");

    toast.error("Đăng ký bằng Google thất bại!", {
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
        <h1>Sign Up</h1>

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
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
        <button type="submit">Sign Up</button>

        <div className="social-icons-google">
          <span className="google-signup-label">or sign up with Google</span>
          <GoogleLogin
            onSuccess={handleGoogleSignupSuccess}
            onError={handleGoogleSignupFailure}
          />
        </div>
      </form>
    </>
  );
}
