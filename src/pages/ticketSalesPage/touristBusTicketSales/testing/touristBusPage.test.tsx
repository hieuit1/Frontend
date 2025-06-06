import { render, screen, fireEvent } from "@testing-library/react";
import { TouristBusTicketSalesPage } from "../touristBusPage";
import "@testing-library/jest-dom";

describe("TouristBusTicketSalesPage Component", () => {
  test("Hiển thị tiêu đề chính xác", () => {
    render(<TouristBusTicketSalesPage />);
    expect(screen.getByText(/🚌 Vé Xe Du Lịch/i)).toBeInTheDocument();
  });

  test("Có dropdown chọn tỉnh/thành phố", () => {
    render(<TouristBusTicketSalesPage />);
    expect(screen.getByText(/Chọn tỉnh\/thành/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Tất cả/i })).toBeInTheDocument();
  });

  test("Chọn tỉnh/thành phố và kiểm tra danh sách vé", () => {
    render(<TouristBusTicketSalesPage />);
    const provinceDropdown = screen.getByRole("button", { name: /Tất cả/i });

    fireEvent.mouseDown(provinceDropdown);
    fireEvent.click(screen.getByText("Hà Nội"));

    expect(screen.getByRole("button", { name: "Hà Nội" })).toBeInTheDocument();
  });

  test("Hiển thị danh sách vé du lịch đúng cách", () => {
    render(<TouristBusTicketSalesPage />);

    expect(screen.getAllByText(/Giờ đi:/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/💰 Giá:/i).length).toBeGreaterThan(0);
  });

  test("Mở chi tiết vé du lịch", () => {
    render(<TouristBusTicketSalesPage />);
    const firstTicket = screen.getAllByRole("button")[0];

    fireEvent.click(firstTicket);
    expect(screen.getByText(/Mua ngay/i)).toBeInTheDocument();
  });
});
