import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/home/home";
import BusTicket from "../pages/BusTicket/BusTicket";
import PromotionDetail from "../pages/PromotionDetail/PromotionDetail";
import FAQ from "../pages/FAQ/FAQ";
import PrivacyPolicy from "../pages/PrivacyPolicy/PrivacyPolicy";
import TermsOfService from "../pages/TermsOfService/TermsOfService";
import Dashboard from "../pages/admin/dashboard/indexDashboard";
import { ForgotPassword } from "../pages/Auth/ForgotPassword";
import { AuthContainer } from "../pages/Auth/AuthContainer";
import { AdminSignInPage } from "../pages/Auth/adminSignIn";
import { ResetPassword } from "../pages/Auth/ResetPassword";
import SeatSelection from "../pages/SeatSelection/SeatSelection";
import Payment from "../pages/Payment/Payment";
import AdminAbout from "../pages/admin/aboutAdmin/about";
import ContactAdmin from "../pages/admin/contactAdmin/contact";
import UserManagement from "../pages/admin/userManagement/indexUser";


const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Trang chủ */}
        <Route path="/" element={<Home setCurrentPage={() => {}} />} />

        {/* Trang vé xe bus */}
        <Route path="/busTicket" element={<BusTicket />} />

        <Route path="/seat-selection" element={<SeatSelection />} />
        <Route path="/payment" element={<Payment />} />

        {/* Trang đăng nhập */}
        <Route
          path="/auth"
          element={<AuthContainer onAuthSuccess={() => {}} />}
        />

        <Route path="/promotion/:id" element={<PromotionDetail />} />

        <Route path="/faq" element={<FAQ />} />

        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />

        <Route path="/forgot-password" element={<ForgotPassword />} />
        {/* Trang trả về mật khẩu */}
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Trang giới thiệu về quản trị viên */}
        <Route path="/admin/about" element={<AdminAbout />} />

        {/* Trang liên hệ */}
        <Route path="/admin/contact" element={<ContactAdmin/>} />
                {/* Trang admin */}
        <Route path="/admin/signin" element={<AdminSignInPage />} />

        {/* Trang quản trị viên */}
        <Route path="/admin/dashboard" element={<Dashboard />} />
        {/* Trang quản lý người dùng */}
        <Route path="/admin/user-management" element={<UserManagement />} />

        {/* Các trang khác */}
      </Routes>
    </Router>
  );
};

export default AppRouter;
