import { createDriver } from "../indexApi";

global.fetch = jest.fn();

describe("createDriver API", function API() {
    beforeEach(() =>{
        jest.clearAllMocks();
        localStorage.setItem("token", "testToken");
    });
    test("Goi API createDriver", async () => {
        const mockResponse = { message: "tai xe da duoc tao thanh cong"};
        const mockFormData = new FormData();
        mockFormData.append("name", "nguyen van a");
        (global.fetch as jest.Mock).mockResolvedValue({
            ok: true,
            json: jest.fn().mockResolvedValue(mockResponse),
        });
        const data = await createDriver(mockFormData);
        expect(data).toEqual(mockResponse);
        expect(global.fetch).toHaveBeenCalledWith(`${process.env.REACT_APP_API_URL}/api-driver/create-driver`, expect.objectContaining({
            method: "POST",
            headers: { Authorization: `Bearer testToken` },
            body: mockFormData,
        }));

    });
    test("Goi API createDriver that bai", async () => {
        const mockErrorResponse = "Ten tai xe da khong hop le";
        (global.fetch as jest.Mock).mockResolvedValue({
            ok: false,
            text: jest.fn().mockResolvedValue({
                ok: false,
                text: jest.fn().mockResolvedValue(mockErrorResponse),
            }),
        });
        const mockFormData = new FormData();
        mockFormData.append("name", "");
        await expect(createDriver(mockFormData)).rejects.toThrow("Gửi dữ liệu thất bại: " + mockErrorResponse);
        expect(global.fetch).toHaveBeenCalledTimes(1);
    });
    test("Xử lý lỗi khi phản hồi API không hợp lệ", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: jest.fn().mockRejectedValue(new Error("Invalid JSON")),
    });
    const mockFormData = new FormData();
    mockFormData.append("name", "Nguyễn Văn A");
    await expect(createDriver(mockFormData)).rejects.toThrow("Gửi dữ liệu thất bại: Invalid JSON");
  });

});