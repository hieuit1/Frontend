import React, { useEffect, useState } from "react";
import { Table, Tag, message, Modal } from "antd";
import { Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from "chart.js";
import { Ticket } from "../../../../interfaces/Ticket";
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);


const TicketCancelledPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Ticket[]>([]);
  const [viewingTicket, setViewingTicket] = useState<Ticket | null>(null);
  const [selectedRowKey, setSelectedRowKey] = useState<number | null>(null);
  const [showChartModal, setShowChartModal] = useState(false);

  const fetchCancelledTickets = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${process.env.REACT_APP_API_URL}/admin-ticket/get-all-tickets`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Không thể lấy dữ liệu từ API");
      }

      const tickets = await response.json();
      const cancelledTickets = tickets.filter((ticket: Ticket) => ticket.status === "CANCELLED");
      setData(cancelledTickets);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error);
      message.error("Không thể lấy danh sách vé đã hủy!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCancelledTickets();
  }, []);

const calculateCancelledTicketsByDay = () => {
  const counts: Record<string, number> = {};
  data.forEach((ticket) => {
    if (ticket.status === "CANCELLED") {
      const day = ticket.departureDate.split("-")[2]; // Lấy ngày từ định dạng YYYY-MM-DD
      counts[day] = (counts[day] || 0) + 1;
    }
  });
  return counts;
};

const cancelledTicketsByDay = calculateCancelledTicketsByDay();

const calculateMostCancelledEmail = () => {
  const emailCounts: Record<string, number> = {};
  data.forEach((ticket) => {
    if (ticket.status === "CANCELLED") {
      emailCounts[ticket.email] = (emailCounts[ticket.email] || 0) + 1;
    }
  });

  const mostCancelledEmail = Object.keys(emailCounts).reduce((maxEmail, email) => {
    return emailCounts[email] > (emailCounts[maxEmail] || 0) ? email : maxEmail;
  }, "");

  return { email: mostCancelledEmail, count: emailCounts[mostCancelledEmail] || 0 };
};

const { email: mostCancelledEmail, count: mostCancelledCount } = calculateMostCancelledEmail();


const pieChartData = {
  labels: ["Tổng vé đã hủy trong tháng", `Vé đã hủy của ${mostCancelledEmail}`],
  datasets: [
    {
      data: [Object.values(cancelledTicketsByDay).reduce((sum, value) => sum + value, 0), mostCancelledCount],
      backgroundColor: ["rgba(75, 192, 192, 0.5)", "rgba(255, 165, 0, 0.8)"], // Màu xanh và màu cam
      borderColor: ["rgba(75, 192, 192, 1)", "rgba(255, 165, 0, 1)"],
      borderWidth: 1,
    },
  ],
};

const pieChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Biểu đồ tổng vé hủy trong tháng và vé hủy của người dùng nhiều nhất",
    },
  },
};

  const columns = [
    { title: "ID Vé", dataIndex: "tickerId", key: "tickerId" },
    { title: "Tên chuyến", dataIndex: "tripName", key: "tripName" },
    { title: "Ngày đi", dataIndex: "departureDate", key: "departureDate" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Số điện thoại", dataIndex: "numberphone", key: "numberphone" },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status: string) => <Tag color="red">Đã hủy</Tag>,
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px", color: "#00000" }}>
        Danh sách vé đã hủy
      </h2>
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <button
          style={{
            padding: "10px 20px",
            backgroundColor: "#1890ff",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
          onClick={() => setShowChartModal(true)}
        >
          Xem biểu đồ
        </button>
      </div>
      <Table
        rowKey="tickerId"
        loading={loading}
        dataSource={data}
        columns={columns}
        pagination={{ pageSize: 10 }}
        style={{
          border: "1px solid #ddd",
          borderRadius: "8px",
          overflow: "hidden",
        }}
        scroll={{ x: "max-content" }}
        onRow={(record) => ({
          onClick: () => {
            setViewingTicket(record);
            setSelectedRowKey(record.tickerId);
          },
          style: {
            cursor: "pointer",
            backgroundColor: selectedRowKey === record.tickerId ? "#32CD32" : "transparent",
          },
        })}
      />
      <Modal
        title={
          <div style={{ textAlign: "center", fontWeight: "bold", fontSize: "24px", color: "#ff4d4f" }}>
            🚀 Chi Tiết Vé 🚀
          </div>
        }
        visible={!!viewingTicket}
        onCancel={() => setViewingTicket(null)}
        footer={null}
        centered
        width={700}
        bodyStyle={{
          padding: "20px",
          background: "linear-gradient(135deg, #2c3e50,rgb(140, 218, 220))",
          borderRadius: "16px",
          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.3)",
          color: "#fff",
        }}
      >
        {viewingTicket && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              padding: "16px",
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              borderRadius: "12px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            }}
          >
            {[
              { label: "ID Vé", value: viewingTicket.tickerId },
              { label: "Tên chuyến", value: viewingTicket.tripName },
              { label: "Ngày đi", value: viewingTicket.departureDate },
              { label: "Giờ đi", value: viewingTicket.departureTime },
              { label: "Giờ đến", value: viewingTicket.departureEndTime },
              { label: "Ghế", value: viewingTicket.seatNumber },
              { label: "Điểm đón", value: viewingTicket.pickupPoint },
              { label: "Điểm đến", value: viewingTicket.payPonit },
              { label: "Người dùng", value: viewingTicket.username },
              { label: "Email", value: viewingTicket.email },
              { label: "Số điện thoại", value: viewingTicket.numberphone },
            ].map((item, index) => (
              <div
                key={index}
                style={{
                  padding: "12px",
                  borderRadius: "8px",
                  background: "rgba(255, 255, 255, 0.2)",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                  color: "#fff",
                }}
              >
                <p style={{ margin: 0, fontWeight: "bold", color: "#ff4d4f" }}>{item.label}:</p>
                <p style={{ margin: 0, fontSize: "16px", color: "#fff" }}>{item.value}</p>
              </div>
            ))}
          </div>
        )}
      </Modal>
      <Modal
  title={
    <div style={{ textAlign: "center", fontWeight: "bold", fontSize: "24px", color: "#1890ff" }}>
      📊 Biểu Đồ 📊
    </div>
  }
  visible={showChartModal}
  onCancel={() => setShowChartModal(false)}
  footer={null}
  centered
  width={400}
  bodyStyle={{
    padding: "20px",
    background: "linear-gradient(135deg, #f0f2f5, #e6f7ff)",
    borderRadius: "16px",
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.3)",
  }}
>
  <Pie data={pieChartData} options={pieChartOptions} />
</Modal>
    </div>
  );
};

export default TicketCancelledPage;