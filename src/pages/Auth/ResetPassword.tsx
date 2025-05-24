import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { resetPassword } from "../../api/indexApi";

import "./auth_css/ResetPassword.css";

export function ResetPassword() {
  /* These lines of code are setting up the state variables and hooks used in a React functional
  component called `ResetPassword`. Here's a breakdown of each line: */
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      await resetPassword(token as string, password);
      toast.success("Password has been successfully reset.", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        closeButton: false,
      });
      setTimeout(() => {
        navigate("/auth");
      }, 2000); // Đợi 2 giây rồi mới chuyển trang
    } catch (error: any) {
      console.error("Error:", error.message);
      toast.error(
        `Failed to reset password: ${error.message || "Unknown error"}`,
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

  return (
    <div className="reset-password-page">
      <div className="reset-password-container">
        <form onSubmit={handleResetPassword}>
          <h1>Reset Password</h1>
          {error && <p className="error-message">{error}</p>}
          <input
            type="password"
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button type="submit">Reset Password</button>
          <a href="#" onClick={() => navigate("/auth")}>
            Back to Sign In
          </a>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
}
