import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../home/components/footer/Footer";
import styles from "./AccountPage.module.css";

interface Ticket {
  tickerId: number;
  seatNumber: string;
  status: string;
  tripCarId: number;
  tripName: string;
  departureDate: string;
  departureTime: string;
  departureEndTime: string;
  pickupPoint: string;
  payPonit: string;
  id: number;
  email: string;
  numberphone: number;
  username: string;
}

const Account: React.FC = () => {
  const [bookingHistory, setBookingHistory] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [selectedTicketId, setSelectedTicketId] = useState<number | null>(null);
  const [ticketDetails, setTicketDetails] = useState<Ticket | null>(null);

  useEffect(() => {
    const fetchBookingHistory = async () => {
      try {
        const userId = localStorage.getItem("id");
        const token = localStorage.getItem("token");

        if (!userId || !token) {
          setError("Không tìm thấy thông tin người dùng hoặc token.");
          setLoading(false);
          return;
        }

        const response = await axios.get<Ticket[]>(
          `${process.env.REACT_APP_API_URL}/user-ticket/get-ticket-userid/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setBookingHistory(response.data);
      } catch (err) {
        setError("Lỗi khi tải lịch sử đặt vé.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookingHistory();
  }, []);

  useEffect(() => {
    const fetchTicketDetails = async () => {
      if (selectedTicketId === null) return;

      try {
        const token = localStorage.getItem("token");
        const response = await axios.get<Ticket>(
          `${process.env.REACT_APP_API_URL}/user-ticket/get-details/${selectedTicketId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setTicketDetails(response.data);
      } catch (err) {
        console.error("Lỗi khi lấy chi tiết vé:", err);
      }
    };

    fetchTicketDetails();
  }, [selectedTicketId]);

  return (
    <div className={styles["account-page"]}>
      <Navbar />
      <div className={styles["account-container"]}>
        <h2>Lịch sử đặt vé của bạn</h2>

        {loading ? (
          <p>Đang tải dữ liệu...</p>
        ) : error ? (
          <p style={{ color: "red" }}>{error}</p>
        ) : bookingHistory.length === 0 ? (
          <p>Bạn chưa đặt vé nào.</p>
        ) : (
          <table className={styles["booking-history-table"]}>
            <thead>
              <tr>
                <th>Họ tên</th>
                <th>Email</th>
                <th>Số điện thoại</th>
                <th>Tuyến đường</th>
                <th>Ngày đi</th>
                <th>Giờ khởi hành</th>
                <th>Ghế</th>
                <th>Trạng thái</th>
                <th>Chi tiết</th>
              </tr>
            </thead>
            <tbody>
              {bookingHistory.map((ticket, idx) => (
                <tr key={idx}>
                  <td>{ticket.username}</td>
                  <td>{ticket.email}</td>
                  <td>{ticket.numberphone}</td>
                  <td>
                    {ticket.pickupPoint} → {ticket.payPonit}
                  </td>
                  <td>{ticket.departureDate}</td>
                  <td>
                    {ticket.departureTime} - {ticket.departureEndTime}
                  </td>
                  <td>{ticket.seatNumber}</td>
                  <td>
                    {ticket.status === "PENDING" && (
                      <span className={styles["status-pending"]}>
                        Chờ xác nhận
                      </span>
                    )}
                    {ticket.status === "CONFIRMED" && (
                      <span className={styles["status-success"]}>
                        Đã xác nhận
                      </span>
                    )}
                    {ticket.status === "CHECKED_IN" && (
                      <span className={styles["status-completed"]}>
                        Đã lên xe
                      </span>
                    )}
                    {ticket.status === "CANCELLED" && (
                      <span className={styles["status-cancel"]}>Đã hủy</span>
                    )}
                  </td>
                  <td>
                    <button
                      className={styles["action-btn"]}
                      onClick={() => setSelectedTicket(ticket)}
                    >
                      Xem
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {selectedTicket && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              background: "rgba(0,0,0,0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 1000,
            }}
            onClick={() => setSelectedTicket(null)}
          >
            <div
              className={styles["ticket-modal"]}
              onClick={(e) => e.stopPropagation()}
            >
              <h3>Chi tiết vé</h3>
              <p>
                <b>Họ tên:</b> {selectedTicket.username}
              </p>
              <p>
                <b>Email:</b> {selectedTicket.email}
              </p>
              <p>
                <b>Số điện thoại:</b> {selectedTicket.numberphone}
              </p>
              <p>
                <b>Tuyến đường:</b> {selectedTicket.pickupPoint} →{" "}
                {selectedTicket.payPonit}
              </p>
              <p>
                <b>Thời gian:</b> {selectedTicket.departureTime} -{" "}
                {selectedTicket.pickupPoint} → {selectedTicket.departureEndTime}{" "}
                - {selectedTicket.payPonit}
              </p>
              <p>
                <b>Ngày đi:</b> {selectedTicket.departureDate}
              </p>
              <p>
                <b>Ghế:</b> {selectedTicket.seatNumber}
              </p>
              <p>
                <b>Trạng thái:</b>{" "}
                {selectedTicket.status === "PENDING"
                  ? "Chờ xác nhận"
                  : selectedTicket.status === "CONFIRMED"
                  ? "Đã xác nhận"
                  : selectedTicket.status === "CHECKED_IN"
                  ? "Đã lên xe"
                  : selectedTicket.status === "CANCELLED"
                  ? "Đã hủy"
                  : selectedTicket.status}
              </p>
              <button
                className={styles["action-btn"]}
                style={{ marginTop: 16 }}
                onClick={() => setSelectedTicket(null)}
              >
                Đóng
              </button>
            </div>
          </div>
        )}
      </div>
      <Footer year={2025} companyName="Ticket Car" />
    </div>
  );
};

export default Account;
