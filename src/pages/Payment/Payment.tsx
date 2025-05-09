import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import emailjs from "@emailjs/browser";
import "./payment.css";
import Footer from "../../components/common/footer/Footer";
import Navbar from "../../components/navbar/Navbar";

const Payment: React.FC = () => {
  const location = useLocation();
  const { selectedSeats } = location.state || {};
  const [contactInfo, setContactInfo] = useState({
    name: "",
    phone: "",
    email: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    phone: "",
    email: "",
  });
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [showPayment, setShowPayment] = useState(false); // Trạng thái để hiển thị phần thanh toán

  const validatePhone = (phone: string) => /^[0-9]{10,11}$/.test(phone); // Số điện thoại 10-11 chữ số
  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); // Định dạng email

  const handleContactSubmit = () => {
    const newErrors = {
      name: contactInfo.name ? "" : "Tên không được để trống.",
      phone: validatePhone(contactInfo.phone)
        ? ""
        : "Số điện thoại không hợp lệ.",
      email: validateEmail(contactInfo.email) ? "" : "Email không hợp lệ.",
    };

    setErrors(newErrors);

    // Nếu không có lỗi, hiển thị phần thanh toán
    if (!newErrors.name && !newErrors.phone && !newErrors.email) {
      setShowPayment(true);
    }
  };

  const handleConfirmPayment = () => {
    if (!paymentMethod) {
      alert("Vui lòng chọn phương thức thanh toán!");
      return;
    }

    const paymentData = {
      name: contactInfo.name,
      phone: contactInfo.phone,
      email: contactInfo.email,
      seats: selectedSeats?.join(", ") || "Không có",
      paymentMethod,
    };

    // Gửi email qua EmailJS
    emailjs
      .send(
        "your_service_id", // Thay bằng Service ID từ EmailJS
        "your_template_id", // Thay bằng Template ID từ EmailJS
        paymentData,
        "your_public_key" // Thay bằng Public Key từ EmailJS
      )
      .then(
        (response) => {
          console.log("Email gửi thành công!", response.status, response.text);
          alert("Thanh toán thành công! Thông tin vé đã được gửi qua email.");
        },
        (error) => {
          console.error("Lỗi khi gửi email:", error);
          alert("Đã xảy ra lỗi khi gửi email!");
        }
      );
  };

  return (
    <div className="payment-page">
      <Navbar />
      <div className="payment-contact-info">
        <h3>Nhập thông tin liên hệ</h3>
        <label>
          Tên người đi *
          <input
            type="text"
            value={contactInfo.name}
            onChange={(e) =>
              setContactInfo({ ...contactInfo, name: e.target.value })
            }
            required
          />
          {errors.name && <p className="payment-error">{errors.name}</p>}
        </label>
        <label>
          Số điện thoại *
          <input
            type="tel"
            value={contactInfo.phone}
            onChange={(e) =>
              setContactInfo({ ...contactInfo, phone: e.target.value })
            }
            required
          />
          {errors.phone && <p className="payment-error">{errors.phone}</p>}
        </label>
        <label>
          Email *
          <input
            type="email"
            value={contactInfo.email}
            onChange={(e) =>
              setContactInfo({ ...contactInfo, email: e.target.value })
            }
            required
          />
          {errors.email && <p className="payment-error">{errors.email}</p>}
        </label>
        <p className="payment-note">
          <small>
            Thông tin liên hệ sẽ được sử dụng để gửi vé và hỗ trợ nếu cần thiết.
          </small>
        </p>
        <button onClick={handleContactSubmit} className="payment-next-btn">
          Tiếp tục
        </button>
      </div>

      {showPayment && (
        <div className="payment-method-section">
          <h3>Phương thức thanh toán</h3>
          <div className="payment-method-options">
            {["credit_card", "momo", "zalopay"].map((method) => (
              <label key={method} className="payment-method-option">
                <input
                  type="radio"
                  name="payment"
                  value={method}
                  checked={paymentMethod === method}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                {method === "credit_card" && "Thẻ ngân hàng"}
                {method === "momo" && "MoMo"}
                {method === "zalopay" && "ZaloPay"}
              </label>
            ))}
          </div>
          <button
            onClick={handleConfirmPayment}
            className="payment-confirm-btn"
            disabled={!paymentMethod}
          >
            Xác nhận thanh toán
          </button>

          {/* Hiển thị thông tin vé */}
          <div className="ticket-info">
            <h1>Thông tin vé</h1>
            <p>
              <strong>Tên:</strong> {contactInfo.name}
            </p>
            <p>
              <strong>Số điện thoại:</strong> {contactInfo.phone}
            </p>
            <p>
              <strong>Email:</strong> {contactInfo.email}
            </p>
            <p>
              <strong>Ghế đã chọn:</strong>{" "}
              {selectedSeats?.join(", ") || "Không có"}
            </p>
            <p>
              <strong>Phương thức thanh toán:</strong> {paymentMethod}
            </p>
            <p>Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi!</p>
          </div>
        </div>
      )}
      <Footer year={2025} companyName="Ticket Car" />
    </div>
  );
};

export default Payment;
