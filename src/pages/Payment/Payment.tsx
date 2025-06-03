import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "../home/components/footer/footer";
import Navbar from "../../components/navbar/Navbar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./payment.css";

// Danh sách phương thức thanh toán nâng cấp
const paymentMethods = [
  {
    id: "credit_card",
    label: "Thẻ ngân hàng",
    description: "Thanh toán bằng thẻ ATM, Visa, hoặc MasterCard.",
    icon: require("../../images/payment/credit-card.jpg"),
  },
  {
    id: "momo",
    label: "MoMo",
    description: "Quét mã QR bằng ứng dụng MoMo.",
    icon: require("../../images/payment/momo.png"),
    qrImage: require("../../images/payment/momo-qr.png"),
  },
  {
    id: "zalopay",
    label: "ZaloPay",
    description: "Sử dụng ví ZaloPay để thanh toán.",
    icon: require("../../images/payment/zalopay.png"),
    qrImage: require("../../images/payment/zalopay-qr.png"),
  },
];

const Payment: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedSeats, trip } = location.state || {};
  const locationState = location.state || {};

  useEffect(() => {
    console.log("Location state:", locationState);
    console.log("Selected seats:", selectedSeats);
    console.log("Trip data:", trip);
  }, [locationState, selectedSeats, trip]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Vui lòng đăng nhập để đặt vé!");
      setTimeout(() => {
        navigate("/auth", {
          state: { from: location.pathname, tripData: { selectedSeats, trip } },
        });
      }, 2000);
    }
  }, [navigate, location.pathname, selectedSeats, trip]);

  useEffect(() => {
    if (!selectedSeats.length || !trip?.tripCarId) {
      toast.error("Không tìm thấy thông tin chuyến đi hoặc ghế đã chọn!");
      setTimeout(() => navigate("/bus-ticket"), 3000);
    }
  }, [selectedSeats, trip, navigate]);

  const totalPrice =
    Array.isArray(selectedSeats) && trip?.priceSeatNumber
      ? selectedSeats.length * trip.priceSeatNumber
      : 0;

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
  const [showPayment, setShowPayment] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [cardInfo, setCardInfo] = useState({
    cardNumber: "",
    cardHolder: "",
    expiryDate: "",
    cvv: "",
  });

  const validatePhone = (phone: string) => /^[0-9]{10,11}$/.test(phone);
  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleContactSubmit = () => {
    const newErrors = {
      name: contactInfo.name ? "" : "Tên không được để trống.",
      phone: validatePhone(contactInfo.phone)
        ? ""
        : "Số điện thoại không hợp lệ.",
      email: validateEmail(contactInfo.email) ? "" : "Email không hợp lệ.",
    };

    setErrors(newErrors);

    if (!newErrors.name && !newErrors.phone && !newErrors.email) {
      setShowPayment(true);
    }
  };

  const handleConfirmPayment = () => {
    if (!paymentMethod) {
      toast.error("Vui lòng chọn phương thức thanh toán!");
      return;
    }

    if (paymentMethod === "credit_card") {
      const { cardNumber, cardHolder, expiryDate, cvv } = cardInfo;
      if (!cardNumber || !cardHolder || !expiryDate || !cvv) {
        toast.error("Vui lòng điền đầy đủ thông tin thẻ ngân hàng!");
        return;
      }
    }

    if (!trip || !trip.tripCarId) {
      toast.error("Không tìm thấy thông tin chuyến đi!");
      return;
    }

    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("id");

    console.log("Token:", token);
    console.log("User ID:", userId);
    console.log("Trip:", trip);
    const seatNumbers = selectedSeats.map((seat: any) => seat.id).join(", ");
    const bookTicketData = {
      seatNumber: seatNumbers,
      tripCarId: Number(trip.tripCarId),
      id: Number(userId),
    };

    console.log("Booking data:", bookTicketData);

    const bookTicketPromise = fetch(
      `${process.env.REACT_APP_API_URL}/user-ticket/book-ticket`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify(bookTicketData),
      }
    ).then(async (res) => {
      const responseText = await res.text();
      if (!res.ok) {
        throw new Error(
          `Lỗi đặt vé: ${
            responseText || "Không có phản hồi chi tiết từ server"
          }`
        );
      }

      let ticketData;
      try {
        ticketData = JSON.parse(responseText);
      } catch (e) {
        console.log("Không thể parse JSON:", e);
        ticketData = { tickerId: null, status: "UNKNOWN" };
      }
      return ticketData;
    });

    const paymentData = {
      name: contactInfo.name,
      phone: contactInfo.phone,
      email: contactInfo.email,
      seats: Array.isArray(selectedSeats)
        ? selectedSeats.map((seat: any) => seat.id).join(", ")
        : "Không có",
      paymentMethod,
      tripName: trip?.tripName,
      departureDate: trip?.departureDate,
      departureTime: trip?.departureTime,
      departureEndTime: trip?.departureEndTime,
      pickupPoint: trip?.pickupPoint,
      payPonit: trip?.payPonit,
      priceSeatNumber: trip?.priceSeatNumber,
      coachName: trip?.coachName,
      licensePlateNumberCoach: trip?.licensePlateNumberCoach,
      totalPrice: totalPrice.toLocaleString(),
      url: trip?.url,
    };

    bookTicketPromise
      .then(() => {
        return fetch(`${process.env.REACT_APP_API_URL}/send-email/payment`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : "",
          },
          body: JSON.stringify(paymentData),
        }).then(async (res) => {
          if (!res.ok) throw new Error(await res.text());
          return res.text();
        });
      })
      .then((msg) => {
        const history = JSON.parse(
          localStorage.getItem("bookingHistory") || "[]"
        );
        history.push({
          ...paymentData,
          time: new Date().toISOString(),
        });
        localStorage.setItem("bookingHistory", JSON.stringify(history));

        toast.success(
          "Thanh toán thành công! Thông tin vé đã được gửi qua email."
        );
        setTimeout(() => {
          navigate("/account");
        }, 1500);
      })
      .catch((err) => {
        toast.error("Đã xảy ra lỗi: " + err.message);
      });
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
            {paymentMethods.map((method) => (
              <label key={method.id} className="payment-method-option">
                <input
                  type="radio"
                  name="payment"
                  value={method.id}
                  checked={paymentMethod === method.id}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <img
                  src={method.icon}
                  alt={method.label}
                  style={{
                    width: "40px",
                    height: "40px",
                    marginRight: "10px",
                  }}
                />
                <div>
                  <strong>{method.label}</strong>
                  <p style={{ margin: 0, fontSize: "0.875rem", color: "#666" }}>
                    {method.description}
                  </p>
                </div>
              </label>
            ))}
          </div>

          {paymentMethod === "credit_card" && (
            <div className="payment-card-form">
              <label>
                Số thẻ *
                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  value={cardInfo.cardNumber}
                  onChange={(e) =>
                    setCardInfo({ ...cardInfo, cardNumber: e.target.value })
                  }
                />
              </label>
              <label>
                Tên chủ thẻ *
                <input
                  type="text"
                  placeholder="Nguyen Van A"
                  value={cardInfo.cardHolder}
                  onChange={(e) =>
                    setCardInfo({ ...cardInfo, cardHolder: e.target.value })
                  }
                />
              </label>
              <div className="flex-row">
                <label>
                  Ngày hết hạn *
                  <input
                    type="text"
                    placeholder="MM/YY"
                    value={cardInfo.expiryDate}
                    onChange={(e) =>
                      setCardInfo({ ...cardInfo, expiryDate: e.target.value })
                    }
                  />
                </label>
                <label>
                  CVV *
                  <input
                    type="text"
                    placeholder="123"
                    value={cardInfo.cvv}
                    onChange={(e) =>
                      setCardInfo({ ...cardInfo, cvv: e.target.value })
                    }
                  />
                </label>
              </div>
            </div>
          )}

          {["momo", "zalopay"].includes(paymentMethod) && (
            <div
              className="payment-qr-section"
              style={{ marginTop: "20px", textAlign: "center" }}
            >
              <p>Vui lòng quét mã QR để hoàn tất thanh toán:</p>
              <img
                src={
                  paymentMethods.find((m) => m.id === paymentMethod)?.qrImage ||
                  ""
                }
                alt="QR Code"
                style={{ width: "200px", height: "auto", marginTop: "10px" }}
              />
            </div>
          )}

          <button
            onClick={handleConfirmPayment}
            className="payment-confirm-btn"
            disabled={!paymentMethod}
            style={{ marginTop: "20px" }}
          >
            Xác nhận thanh toán
          </button>
        </div>
      )}

      <Footer year={2025} companyName="Ticket Car" />
      <ToastContainer />
    </div>
  );
};

export default Payment;
