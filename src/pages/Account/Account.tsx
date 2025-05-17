import React from "react";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/common/footer/Footer";

const Account: React.FC = () => {
  const bookingHistory = JSON.parse(localStorage.getItem("bookingHistory") || "[]");

  return (
    <div className="account-page">
      <Navbar />
      <div className="account-container">
        <h2>Lịch sử đặt vé của bạn</h2>
        {bookingHistory.length === 0 ? (
          <p>Bạn chưa đặt vé nào.</p>
        ) : (
          <table className="booking-history-table">
            <thead>
              <tr>
                <th>Họ tên</th>
                <th>Số điện thoại</th>
                <th>Email</th>
                <th>Ghế</th>
                <th>Phương thức thanh toán</th>
                <th>Thời gian đặt</th>
              </tr>
            </thead>
            <tbody>
              {bookingHistory.map((item: any, idx: number) => (
                <tr key={idx}>
                  <td>{item.name}</td>
                  <td>{item.phone}</td>
                  <td>{item.email}</td>
                  <td>{item.seats}</td>
                  <td>{item.paymentMethod}</td>
                  <td>{new Date(item.time).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <Footer year={2025} companyName="Ticket Car" />
    </div>
  );
};

export default Account;