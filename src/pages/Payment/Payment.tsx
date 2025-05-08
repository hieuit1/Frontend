import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./payment.css";

const Payment: React.FC = () => {
  const location = useLocation();
  const { selectedSeats } = location.state || {};
  const [contactInfo, setContactInfo] = useState({
    name: "",
    phone: "",
    email: "",
  });
  const [paymentMethod, setPaymentMethod] = useState<string>("");

  const handleConfirmPayment = () => {
    if (!contactInfo.name || !contactInfo.phone || !contactInfo.email) {
      alert("Vui lòng nhập đầy đủ thông tin liên hệ!");
      return;
    }
    if (!paymentMethod) {
      alert("Vui lòng chọn phương thức thanh toán!");
      return;
    }

    const paymentData = {
      seats: selectedSeats,
      contactInfo,
      paymentMethod,
    };

    console.log("Thanh toán thành công với dữ liệu:", paymentData);
    alert("Thanh toán thành công! Thông tin vé đã được gửi qua email.");
  };

  return (
    <div className="payment-page">
      <h2>Thông tin liên hệ và thanh toán</h2>

      {/* Thông tin liên hệ */}
      <section className="section">
        <h3>Thông tin liên hệ</h3>
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
        </label>
        <p className="note">
          <small>
            Thông tin liên hệ sẽ được sử dụng để gửi vé và hỗ trợ nếu cần thiết.
          </small>
        </p>
      </section>

      {/* Phương thức thanh toán */}
      <section className="section">
        <h3>Phương thức thanh toán</h3>
        <div className="payment-options">
          {["credit_card", "momo", "zalopay"].map((method) => (
            <label key={method} className="payment-option">
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
      </section>

      <button
        onClick={handleConfirmPayment}
        className="payment-btn"
        disabled={!contactInfo.name || !contactInfo.phone || !paymentMethod}
      >
        Xác nhận thanh toán
      </button>
    </div>
  );
};

export default Payment;
