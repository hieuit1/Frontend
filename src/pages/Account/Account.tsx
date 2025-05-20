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

  // Thêm state cho tìm kiếm, lọc và chi tiết vé
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

  // Sắp xếp lịch sử đặt vé mới nhất lên đầu
  const sortedHistory = [...bookingHistory].sort(
    (a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()
  );

  // Lọc và tìm kiếm vé
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
        <h2>Thông tin cá nhân</h2>
        <div className={styles["user-info"]}>
          <p>
            <b>Họ tên:</b> {user.name || "Chưa cập nhật"}
          </p>
          <p>
            <b>Email:</b> {user.email || "Chưa cập nhật"}
          </p>
          <p>
            <b>Số điện thoại:</b> {user.phone || "Chưa cập nhật"}
          </p>
        </div>

        <h2>Lịch sử đặt vé của bạn</h2>
        {/* Tìm kiếm và lọc */}
        <div style={{ marginBottom: 16, display: "flex", gap: 12 }}>
          <input
            type="text"
            placeholder="Tìm kiếm theo tên, email, SĐT..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ padding: 6, borderRadius: 4, border: "1px solid #ccc" }}
          />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            style={{ padding: 6, borderRadius: 4, border: "1px solid #ccc" }}
          >
            <option value="all">Tất cả phương thức thanh toán</option>
            <option value="Tiền mặt">Tiền mặt</option>
            <option value="Chuyển khoản">Chuyển khoản</option>
            {/* Thêm các phương thức khác nếu có */}
          </select>
        </div>

        {filteredHistory.length === 0 ? (
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
                <th>Trạng thái</th>
                <th>Chi tiết</th>
                <th>Yêu cầu hủy</th>
                <th>Xóa</th>
              </tr>
            </thead>
            <tbody>
              {filteredHistory.map((item: any, idx: number) => (
                <tr key={idx}>
                  <td>{item.name}</td>
                  <td>{item.phone}</td>
                  <td>{item.email}</td>
                  <td>{item.seats}</td>
                  <td>{item.paymentMethod}</td>
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
                    <button
                      className={styles["action-btn"]}
                      onClick={() => setSelectedTicket(item)}
                    >
                      Xem
                    </button>
                  </td>
                  <td>
                    {cancelRequests[idx] ? (
                      <span className={styles["status-cancel"]}>
                        Đã yêu cầu hủy
                      </span>
                    ) : (
                      <button
                        className={styles["warning-btn"]}
                        onClick={() => handleCancelRequest(idx)}
                        disabled={item.status !== "pending"}
                        title={
                          item.status === "completed"
                            ? "Vé đã hoàn thành, không thể hủy"
                            : item.status !== "pending"
                            ? "Chỉ hủy khi đang chờ xác nhận"
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
                      onClick={() => handleDelete(idx)}
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Modal chi tiết vé */}
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
                <b>Ghế:</b> {selectedTicket.seats}
              </p>
              <p>
                <b>Phương thức thanh toán:</b> {selectedTicket.paymentMethod}
              </p>
              <p>
                <b>Thời gian đặt:</b>{" "}
                {new Date(selectedTicket.time).toLocaleString()}
              </p>
              {/* Thêm các thông tin khác nếu có */}
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
