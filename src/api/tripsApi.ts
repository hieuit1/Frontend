export const getTripsData = async () => {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/useradmin-all-tripcar`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.json();
  /* Đoạn mã này đang xử lý các tình huống lỗi khi lấy dữ liệu từ API.*/
  if (!response.ok) { throw new Error(data.message || "Không thể lấy dữ liệu chuyến đi."); }
  return data;
};

export const getTripById = async (tripId: string) => {
/* Đoạn mã này đang thực hiện yêu cầu GET đến một điểm cuối cụ thể để lấy dữ liệu về chuyến đi
được xác định bởi tham số `tripId`. URL cho yêu cầu được xây dựng bằng cách sử dụng biến môi trường
`REACT_APP_API_URL` được xác định trong dự án. `tripId` được thêm vào URL
để chỉ định chuyến đi cụ thể cần lấy. */
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/useradmin-tripcar/${tripId}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  );
  const data = await response.json();
/* Đoạn mã này đang xử lý các tình huống lỗi khi lấy dữ liệu từ API.*/
  if (!response.ok) { throw new Error(data.message || "Không thể lấy dữ liệu chuyến đi."); }
  return data;
};
