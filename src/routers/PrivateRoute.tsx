import React, { JSX } from "react";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  children: JSX.Element;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const token = localStorage.getItem("token"); // Kiểm tra token trong localStorage

  if (!token) {
    // Nếu không có token, chuyển hướng đến trang đăng nhập
    return <Navigate to="/admin/signin" />;
  }

  return children; // Nếu có token, hiển thị nội dung của route
};

export default PrivateRoute;