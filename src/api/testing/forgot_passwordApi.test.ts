import { forgotPassword } from '../indexApi';

global.fetch = jest.fn();

describe('forgotPassword API', function API() {

    beforeEach(() =>{
        jest.clearAllMocks();
    });

    test('Goi API forgotPassword', async () => {
        const mockResponse = { message: "Password reset link sent to email" };
        (global.fetch as jest.Mock).mockReturnValue({
            ok: true,
            headers: { get: jest.fn().mockReturnValue('application/json')},
            json: jest.fn().mockReturnValue(mockResponse),
        });
        const data = await forgotPassword('hung@gmail.com');
        expect(data).toEqual(mockResponse);
        expect(global.fetch).toHaveBeenCalledWith(`${process.env.REACT_APP_API_URL}/auth/forgot-password`, expect.objectContaining({
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: 'hung@gmail.com'
            }),

        }));
    });

    test('Goi API forgotPassword that bai', async () => {
        const mockErrorResponse = { message: "Failed to send password reset link" };
        (global.fetch as jest.Mock).mockReturnValue({
            ok: false,
            headers: { get: jest.fn().mockReturnValue('application/json')},
            json: jest.fn().mockReturnValue(mockErrorResponse),
        });
        await expect(forgotPassword('hung@gmail.com')).rejects.toThrow("Failed to send password reset link");
        expect(global.fetch).toHaveBeenCalledTimes(1);
    });

    test('Xu ly loi khi response khong phai JSON', async () => {
        (global.fetch as jest.Mock).mockReturnValue({
            ok: true,
            headers: { get: jest.fn().mockReturnValue('text/plain')},
            text: jest.fn().mockResolvedValue("This is not JSON"),
        });
        await expect(forgotPassword('hung@gmail.com')).rejects.toThrow("Failed to send password reset link");
    });

    test('xu ly loi khi phan hoi API that bai', async () => {
        (global.fetch as jest.Mock).mockReturnValue({
            ok: false,
            headers: { get: jest.fn().mockReturnValue('application/json')},
            json: jest.fn().mockRejectedValue(new Error("Network error")),
        });
        await expect(forgotPassword('hung@gmail.com')).rejects.toThrow("Network error");
    });

});
    

   