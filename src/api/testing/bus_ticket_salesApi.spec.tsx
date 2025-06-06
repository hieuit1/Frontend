import { createTripCar } from "../indexApi";

global.fetch = jest.fn();

describe("createTripCar API", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        localStorage.setItem("token", "testToken");
    });
    test("gui yeu cau hop le", async () => {
        const mockResponse = { message: "Tạo chuyến xe thành công" };
        const mockPlayload = { from: "Hanoi", to: "Ho Chi Minh", price: 100000 };
        (global.fetch as jest.Mock).mockResolvedValue({
            ok: true,
            json: jest.fn().mockResolvedValue(mockResponse),
        });
        const data = await createTripCar(mockPlayload);
        expect(data).toEqual(mockPlayload);
        expect(global.fetch).toHaveBeenCalledWith(`${process.env.REACT_APP_API_URL}/api-tripcar/create-tripcar`,
            expect.objectContaining({
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer testToken`,
                },
                body: JSON.stringify(mockPlayload),
            })
        );
    });

test("Gửi yêu cầu tạo chuyến xe thất bại và xử lý lỗi", async () => {
    const mockErrorResponse = "Giá vé không hợp lệ.";
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
      text: jest.fn().mockResolvedValue(mockErrorResponse),
    });
    const mockPayload = { from: "Hà Nội", to: "Đà Nẵng", price: -50000 };
    await expect(createTripCar(mockPayload)).rejects.toThrow("Gửi dữ liệu thất bại: Giá vé không hợp lệ.");
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });
   test("Xử lý lỗi khi phản hồi API không hợp lệ", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: jest.fn().mockRejectedValue(new Error("Invalid JSON")),
    });
    const mockPayload = { from: "Hà Nội", to: "Đà Nẵng", price: 300000 };
    await expect(createTripCar(mockPayload)).rejects.toThrow("Gửi dữ liệu thất bại: Invalid JSON");
  });
});