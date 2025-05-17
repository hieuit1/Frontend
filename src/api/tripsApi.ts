export const getTripsData = async () => {
  const token = localStorage.getItem("token");
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/useradmin-all-tripcar`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
    }
  );
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Không thể lấy dữ liệu chuyến đi.");
  }
  return data;
};

export const getTripById = async (tripId: string) => {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/useradmin-tripcar/${tripId}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  );
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Không thể lấy dữ liệu chuyến đi.");
  }
  return data;
};
