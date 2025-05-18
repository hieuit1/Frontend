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
import { AdminSignInPage } from "../pages/Auth/adminSignInPage";
import { ResetPassword } from "../pages/Auth/ResetPassword";
import SeatSelection from "../pages/SeatSelection/SeatSelection";
import Payment from "../pages/Payment/Payment";
import AdminAbout from "../pages/admin/aboutAdmin/about";
import ContactAdmin from "../pages/admin/contactAdmin/contact";
import { UserManagement } from "../pages/admin/userManagement/userManagementExport";
import TaxiTicketSalesPage from "../pages/ticketSalesPage/taxiTicketSales/taxiPage";
import TouristBusTicketSalesPage from "../pages/ticketSalesPage/touristBusTicketSalesPage/touristBusPage";
import MotorcycleTicketSalesPage from "../pages/ticketSalesPage/motorcycleTicketSales/motorcyclePage";
import TrainTicketSalesPage from "../pages/ticketSalesPage/trainTicketSales/trainPage";
import IntercityBusTicketSalesPage from "../pages/ticketSalesPage/IntercityBusTicketSales/intercityBusPage";
import AirlineTicketSalesPage from "../pages/ticketSalesPage/airlineTicketSales/airlinePage";
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

        <Route path="/account" element={<Account />} />

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
        <Route path="/admin/contact" element={<ContactAdmin />} />

        {/* Trang admin */}
        <Route path="/admin/signin" element={<AdminSignInPage />} />
        {/* Trang quản trị viên */}
        <Route path="/admin/dashboard" element={<Dashboard />} />
        {/* Trang quản lý người dùng */}
        <Route path="/admin/user-management" element={<UserManagement />} />

        {/* Trang Ban vé taxi */}
        <Route path="/taxiTicket" element={<TaxiTicketSalesPage />} />
        {/* */}
        <Route path="/touristBusTicket" element={<TouristBusTicketSalesPage />} />
        {/* Trang Ban vé xe máy */}
        <Route
          path="/motorcycleTicket"
          element={<MotorcycleTicketSalesPage />}
        />
        {/* Trang Ban vé tàu */}
        <Route path="/trainTicket" element={<TrainTicketSalesPage />} />
        {/* Trang Ban vé xe khách liên tỉnh */}
        <Route
          path="/intercityTicket"
          element={<IntercityBusTicketSalesPage />}
        />
        {/* Trang Ban vé máy bay */}
        <Route path="/airlineTicket" element={<AirlineTicketSalesPage />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
