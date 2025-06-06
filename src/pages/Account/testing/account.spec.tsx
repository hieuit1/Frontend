import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import Account from "../Account";
import axios from "axios";
import "@testing-library/jest-dom";

jest.mock("axios");

describe("Account Page", () => {
  beforeEach(() => {
    localStorage.setItem("id", "123");
    localStorage.setItem("token", "testToken");
  });
  afterEach(() => {
    localStorage.clear();
  });
  
  test("Hiển thị tiêu đề 'Lịch sử đặt vé của bạn'", () => {
    render(<Account />);
    expect(screen.getByText(/Lịch sử đặt vé của bạn/i)).toBeInTheDocument();
  });

  test("Tải danh sách vé từ API và hiển thị", async () => {
    const mockResponse = [
      {
        tickerId: 1,
        seatNumber: "A1",
        status: "CONFIRMED",
        tripCarId: 100,
        tripName: "Hà Nội → Đà Nẵng",
        departureDate: "2025-06-10",
        departureTime: "08:00",
        departureEndTime: "12:00",
        pickupPoint: "Hà Nội",
        payPonit: "Đà Nẵng",
        id: 123,
        email: "user@example.com",
        numberphone: "0123456789",
        username: "Nguyễn Văn A",
      },
    ];
    (axios.get as jest.Mock).mockResolvedValueOnce({ data: mockResponse });
    render(<Account />);
    await waitFor(() => expect(screen.getByText(/Hà Nội → Đà Nẵng/i)).toBeInTheDocument());
  });

  test("Gửi yêu cầu hủy vé thành công", async () => {
    const mockResponse = { message: "Yêu cầu hủy vé đã được gửi." };
    (axios.put as jest.Mock).mockResolvedValueOnce({ data: mockResponse });
    render(<Account />);
    await waitFor(() => expect(screen.getByText(/Hà Nội → Đà Nẵng/i)).toBeInTheDocument());
    const cancelButton = screen.getByText(/Yêu cầu hủy/i);
    fireEvent.click(cancelButton);
    await waitFor(() => expect(screen.getByText(/Yêu cầu hủy vé đã được gửi/i)).toBeInTheDocument());
  });

  test("Xử lý lỗi khi tải vé thất bại", async () => {
    (axios.get as jest.Mock).mockRejectedValueOnce(new Error("Lỗi khi tải lịch sử đặt vé."));
    render(<Account />);
    await waitFor(() => expect(screen.getByText(/Lỗi khi tải lịch sử đặt vé/i)).toBeInTheDocument());
  });
});
