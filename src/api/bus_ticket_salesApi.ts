// src/api/bus_ticket_salesApi.ts

export const createTripCar = async (payload: any) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${process.env.REACT_APP_API_URL}/api-tripcar/create-tripcar`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, 
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Gửi dữ liệu thất bại: ${errorText}`);
  }
  return response.json();
};
