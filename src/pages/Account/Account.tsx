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

function safeParseArray(json: string | null) {
  try {
    const parsed = json ? JSON.parse(json) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

const Account: React.FC = () => {
  const [bookingHistory, setBookingHistory] = useState<any[]>(
    safeParseArray(localStorage.getItem("bookingHistory"))
  );
  const user = safeParse(localStorage.getItem("user")) || {};

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [selectedTicket, setSelectedTicket] = useState<any | null>(null);

  const [cancelRequests, setCancelRequests] = useState<{
    [key: number]: boolean;
  }>(() => safeParse(localStorage.getItem("cancelRequests")) || {});

  const [confirmCancelIdx, setConfirmCancelIdx] = useState<number | null>(null);

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

  const handleConfirmCancel = () => {
    if (confirmCancelIdx !== null) {
      handleCancelRequest(confirmCancelIdx);
      setConfirmCancelIdx(null);
    }
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
                <th>Giá vé</th>
                <th>Ghế</th>
                <th>Thời gian đặt</th>
                <th>Trạng thái</th>
                <th>Chi tiết</th>
                <th>Yêu cầu hủy</th>
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
                // Xét trạng thái vé
                const isRemovable = false; // Không cho phép xóa nữa

                return (
                  <tr key={idx}>
                    <td>{item.name}</td>
                    <td>
                      {item.priceSeatNumber
                        ? item.priceSeatNumber.toLocaleString() + "đ"
                        : "0đ"}
                    </td>
                    <td>{item.seats}</td>
                    <td>{new Date(item.time).toLocaleString()}</td>
                    <td>
                      {item.status === "success" || item.status === "CONFIRMED" ? (
                        <span className={styles["status-success"]}>Thành công</span>
                      ) : item.status === "completed" || item.status === "CHECKED_IN" ? (
                        <span className={styles["status-completed"]}>Đã hoàn thành</span>
                      ) : item.status === "CANCELLED" ? (
                        <span className={styles["status-cancel"]}>Đã hủy</span>
                      ) : (
                        <span className={styles["status-pending"]}>Chờ xác nhận</span>
                      )}
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
                        <span className={styles["status-cancel"]}>Đã yêu cầu hủy</span>
                      ) : (
                        <button
                          className={styles["warning-btn"]}
                          onClick={() => setConfirmCancelIdx(realIdx)}
                          disabled={
                            item.status === "completed" ||
                            item.status === "CHECKED_IN" ||
                            item.status === "CANCELLED"
                          }
                          title={
                            item.status === "completed" ||
                            item.status === "CHECKED_IN" ||
                            item.status === "CANCELLED"
                              ? "Không thể hủy vé này"
                              : ""
                          }
                        >
                          Yêu cầu hủy
                        </button>
                      )}
                    </td>
                    <td>
                      {/* Không cho xóa nữa */}
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
                <b>Giá vé:</b>{" "}
                {selectedTicket.priceSeatNumber
                  ? selectedTicket.priceSeatNumber.toLocaleString() + "đ"
                  : "0đ"}
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

        {confirmCancelIdx !== null && (
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
              zIndex: 2000,
            }}
            onClick={() => setConfirmCancelIdx(null)}
          >
            <div
              className={styles["ticket-modal"]}
              onClick={(e) => e.stopPropagation()}
              style={{ maxWidth: 340, textAlign: "center" }}
            >
              <h3>Xác nhận hủy vé</h3>
              <p>Bạn có chắc chắn muốn yêu cầu hủy vé này không?</p>
              <div
                style={{
                  display: "flex",
                  gap: 16,
                  justifyContent: "center",
                  marginTop: 18,
                }}
              >
                <button
                  className={styles["danger-btn"]}
                  onClick={handleConfirmCancel}
                >
                  Hủy vé
                </button>
                <button
                  className={styles["action-btn"]}
                  onClick={() => setConfirmCancelIdx(null)}
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer year={2025} companyName="Ticket Car" />
    </div>
  );
};

export default Account;
