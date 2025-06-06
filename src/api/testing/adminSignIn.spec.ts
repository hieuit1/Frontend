import { adminSignIn } from "../indexApi";
global.fetch = jest.fn();

describe("adminSignIn API", function API(){
    beforeEach(() =>{
        jest.clearAllMocks();
    });

    test("Goi API adminSignIn", async () => {
        const mockResponse = { token: "testToken", user: { email: "hung@gmail.com"}};
        (global.fetch as jest.Mock).mockReturnValue({
            ok: true,
            text: jest.fn().mockReturnValue(JSON.stringify(mockResponse)),
        });
        const data = await adminSignIn("hung@gmail.com", "123456");
        expect(data).toEqual(mockResponse);
        expect(global.fetch).toHaveBeenCalledWith(
            `${process.env.REACT_APP_API_URL}/auth/signin`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: "hung@gmail.com", "password":"123456" }),
            });
    });

    test("Goi API adminSignIn that bai", async () => {
        const mockErrorResponse = { message: "Dang nhap that bai" };
        (global.fetch as jest.Mock).mockReturnValue({
            ok: false,
            text: jest.fn().mockReturnValue(JSON.stringify(mockErrorResponse)),
        });
        await expect(adminSignIn("hung@gmail.com", "fghds")).rejects.toThrow("Dang nhap that bai");
        expect(global.fetch).toHaveBeenCalledTimes(1);
    });

    test("Goi API adminSignIn that bai voi response khong co token", async () => {
        const mockErrorResponse = { message: "Dang nhap that bai" };
        (global.fetch as jest.Mock).mockReturnValue({
            ok: true,
            text: jest.fn().mockReturnValue(JSON.stringify(mockErrorResponse)),
        });
        await expect(adminSignIn("hung@gmail.com", "fghds")).rejects.toThrow("Dang nhap that bai");
    });

    test("Xu ly loi khi response khong phai JSON", async () => {
        (global.fetch as jest.Mock).mockReturnValue({
            ok: true,
            text: jest.fn().mockReturnValue("This is not JSON"),
        });
        await expect(adminSignIn("hung@gmail.com", "123456")).rejects.toThrow("Đăng nhập thất bại.");
    });
});