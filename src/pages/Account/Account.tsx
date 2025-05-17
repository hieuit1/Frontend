import React from "react";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/common/footer/Footer";
import styles from "./AccountPage.module.css";

function safeParse(json: string | null) {
  try {
    return json ? JSON.parse(json) : {};
  } catch {
    return {};
  }
}

const Account: React.FC = () => {
  const bookingHistory = safeParse(localStorage.getItem("bookingHistory")) || [];
  const user = safeParse(localStorage.getItem("user")) || {};

  return (
    <div className={styles["account-page"]}>
      <Navbar />
      <div className={styles["account-container"]}>
        <h2>Lịch sử đặt vé của bạn</h2>
        {bookingHistory.length === 0 ? (
          <p>Bạn chưa đặt vé nào.</p>
        ) : (
          <table className={styles["booking-history-table"]}>
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