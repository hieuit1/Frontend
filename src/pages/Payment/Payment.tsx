import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import ContactInfoForm from "../ContactInfo/ContactInfoForm";
import "./payment.css";
import Footer from "../../components/common/footer/Footer";

const Payment: React.FC = () => {
  const location = useLocation();
  const { selectedSeats } = location.state || {};
  const [contactInfo, setContactInfo] = useState({
    name: "",
    phone: "",
    email: "",
  });
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [step, setStep] = useState<"contact" | "payment">("contact");

  const handleConfirmPayment = () => {
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
      {step === "contact" && (
        <ContactInfoForm
          onSubmit={(info) => {
            setContactInfo(info);
            setStep("payment");
          }}
        />
      )}

      {step === "payment" && (
        <>
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
            disabled={!paymentMethod}
          >
            Xác nhận thanh toán
          </button>
        </>
      )}
    </div>
  );
};

export default Payment;
