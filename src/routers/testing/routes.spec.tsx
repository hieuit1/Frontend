import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "../AppRouter";

describe("AppRouter", () => {
  test("Hiển thị trang Home khi vào '/'", () => {
    render(
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    );
    expect(screen.getByText(/Đặt Vé Xe Uy Tín & Nhanh Chóng/i)).toBeInTheDocument();
  });

  test("Hiển thị trang vé máy bay khi vào '/airlineTicket'", () => {
    render(
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    );
    expect(screen.getByText(/Vé máy bay/i)).toBeInTheDocument();
  });
  test("Hiển thị trang FAQ khi vào '/faq'", () => {
    render(
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    );
    expect(screen.getByText(/Câu hỏi thường gặp/i)).toBeInTheDocument();
  });

  test("Hiển thị trang quản trị viên khi vào '/admin/dashboard'", () => {
    render(
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    );
    expect(screen.getByText(/Trang quản trị viên/i)).toBeInTheDocument();
  });

  test("Hiển thị trang liên hệ quản trị viên khi vào '/admin/contact'", () => {
    render(
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    );
    expect(screen.getByText(/Liên hệ quản trị viên/i)).toBeInTheDocument();
  });

  test("Hiển thị trang 404 khi vào đường dẫn không tồn tại", () => {
    render(
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    );
    expect(screen.queryByText(/Trang không tồn tại/i)).not.toBeInTheDocument();
  });
});
