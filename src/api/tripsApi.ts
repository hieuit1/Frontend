export const getTripsData = async () => {
<<<<<<< HEAD
=======
  /* Dòng `const token = localStorage.getItem("token");` đang truy xuất giá trị được lưu trữ trong khóa
"token" từ localStorage của trình duyệt. Giá trị này thường được sử dụng cho mục đích xác thực
, chẳng hạn như bao gồm nó trong tiêu đề của các yêu cầu API để xác thực người dùng. Nếu tìm thấy một mã thông báo
trong localStorage, nó sẽ được gán cho hằng số `token` để sử dụng sau này trong tiêu đề yêu cầu API
làm mã thông báo Ủy quyền. */
  const token = localStorage.getItem("token");
/* Đoạn mã này đang thực hiện yêu cầu GET đến điểm cuối API được chỉ định bởi URL
`${process.env.REACT_APP_API_URL}/useradmin-all-tripcar`. Yêu cầu bao gồm các tiêu đề chỉ định
loại nội dung là JSON và nếu có mã thông báo trong localStorage, nó sẽ thêm tiêu đề Authorization
với mã thông báo Bearer.*/
>>>>>>> 4be2fbdc34cfbfb0784643c1bc393042c1816659
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
