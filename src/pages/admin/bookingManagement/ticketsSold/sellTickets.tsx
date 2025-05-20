import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface TicketData {
  type: string;
  count: number;
}

const TicketAnalytics: React.FC = () => {
  const [data, setData] = useState<TicketData[]>([]);

  useEffect(() => {
    // Dữ liệu giả lập, có thể thay bằng API thật
    const fetchedData: TicketData[] = [
      { type: "VIP", count: 30 },
      { type: "Business", count: 80 },
      { type: "Economy", count: 200 },
    ];
    setData(fetchedData);
  }, []);

  const chartData = {
    labels: data.map(d => d.type),
    datasets: [
      {
        label: "Số vé đã bán",
        data: data.map(d => d.count),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2>📊 Thống kê vé đã bán (Chart.js)</h2>
      <Bar data={chartData} />
    </div>
  );
};

export default TicketAnalytics;
