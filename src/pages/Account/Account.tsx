import React, { useState } from "react";
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
  const [bookingHistory, setBookingHistory] = useState<any[]>(
    safeParse(localStorage.getItem("bookingHistory")) || []
  );
  const user = safeParse(localStorage.getItem("user")) || {};

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [selectedTicket, setSelectedTicket] = useState<any | null>(null);

  const [cancelRequests, setCancelRequests] = useState<{
    [key: number]: boolean;
  }>(() => safeParse(localStorage.getItem("cancelRequests")) || {});

  const handleDelete = (idx: number) => {
    const newHistory = bookingHistory.filter((_, i) => i !== idx);
    setBookingHistory(newHistory);
    localStorage.setItem("bookingHistory", JSON.stringify(newHistory));
  };

  const handleCancelRequest = (idx: number) => {
    const updated = { ...cancelRequests, [idx]: true };
    setCancelRequests(updated);
    localStorage.setItem("cancelRequests", JSON.stringify(updated));
  };

  const sortedHistory = [...bookingHistory].sort(
    (a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()
  );

  const filteredHistory = sortedHistory.filter((item) => {
    const matchSearch =
      item.name?.toLowerCase().includes(search.toLowerCase()) ||
      item.email?.toLowerCase().includes(search.toLowerCase()) ||
      item.phone?.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "all" || item.paymentMethod === filter;
    return matchSearch && matchFilter;
  });

  return (
    <div className={styles["account-page"]}>
      <Navbar />
      <div className={styles["account-container"]}>
        <h2>Lịch sử đặt vé của bạn</h2>
        <div style={{ marginBottom: 16, display: "flex", gap: 12 }}>
          <input
            type="text"
            placeholder="Tìm kiếm theo tên, email, SĐT..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ padding: 6, borderRadius: 4, border: "1px solid #ccc" }}
          />
        </div>

        {filteredHistory.length === 0 ? (
          <p>Bạn chưa đặt vé nào.</p>
        ) : (
          <table className={styles["booking-history-table"]}>
            <thead>
              <tr>
                <th>Họ tên</th>
                <th>Ghế</th>
                <th>Thời gian đặt</th>
                <th>Trạng thái</th>
                <th>Tổng tiền</th>
                <th>Chi tiết</th>
                <th>Yêu cầu hủy</th>
                <th>Xóa</th>
              </tr>
            </thead>
            <tbody>
              {filteredHistory.map((item: any, idx: number) => {
                const realIdx = bookingHistory.findIndex(
                  (b: any) =>
                    b.time === item.time &&
                    b.name === item.name &&
                    b.seats === item.seats
                );
                return (
                  <tr key={idx}>
                    <td>{item.name}</td>
                    <td>{item.seats}</td>
                    <td>{new Date(item.time).toLocaleString()}</td>
                    <td>
                      {item.status === "success" ? (
                        <span className={styles["status-success"]}>
                          Thành công
                        </span>
                      ) : item.status === "completed" ? (
                        <span className={styles["status-completed"]}>
                          Đã hoàn thành
                        </span>
                      ) : (
                        <span className={styles["status-pending"]}>
                          Chờ xác nhận
                        </span>
                      )}
                    </td>
                    <td>
                      {item.totalPrice
                        ? item.totalPrice.toLocaleString() + "đ"
                        : "0đ"}
                    </td>
                    <td>
                      <button
                        className={styles["action-btn"]}
                        onClick={() => setSelectedTicket(item)}
                      >
                        Xem
                      </button>
                    </td>
                    <td>
                      {cancelRequests[realIdx] ? (
                        <span className={styles["status-cancel"]}>
                          Đã yêu cầu hủy
                        </span>
                      ) : (
                        <button
                          className={styles["warning-btn"]}
                          onClick={() => handleCancelRequest(realIdx)}
                          disabled={item.status === "completed"}
                          title={
                            item.status === "completed"
                              ? "Vé đã hoàn thành, không thể hủy"
                              : ""
                          }
                        >
                          Yêu cầu hủy
                        </button>
                      )}
                    </td>
                    <td>
                      <button
                        className={styles["danger-btn"]}
                        onClick={() => handleDelete(realIdx)}
                        title="Xóa"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          padding: 0,
                          width: 36,
                          height: 36,
                        }}
                      >
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M3 6h18M9 6v12m6-12v12M5 6v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6"
                            stroke="#fff"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <rect
                            x="9"
                            y="2"
                            width="6"
                            height="2"
                            rx="1"
                            fill="#fff"
                          />
                        </svg>
                      </button>
                    </td>
                  </tr>
                );
              })}
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
                <b>Họ tên:</b> {selectedTicket.name}
              </p>
              <p>
                <b>Email:</b> {selectedTicket.email}
              </p>
              <p>
                <b>Số điện thoại:</b> {selectedTicket.phone}
              </p>
              <p>
                <b>Nhà xe:</b> {selectedTicket.coachName}
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
                <b>Biển số xe:</b> {selectedTicket.licensePlateNumberCoach}
              </p>
              <p>
                <b>Ghế:</b> {selectedTicket.seats}
              </p>
              <p>
                <b>Tổng tiền:</b>{" "}
                {selectedTicket.totalPrice?.toLocaleString() || "0"}đ
              </p>
              <p>
                <b>Phương thức thanh toán:</b> {selectedTicket.paymentMethod}
              </p>
              <p>
                <b>Thời gian đặt:</b>{" "}
                {new Date(selectedTicket.time).toLocaleString()}
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
