import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ContactAdmin from "../contact";
import "@testing-library/jest-dom";

describe("ContactAdmin Component", () => {
  test("Hiển thị tiêu đề chính xác", () => {
    render(<ContactAdmin />);
    expect(screen.getByText(/Liên hệ quản trị viên/i)).toBeInTheDocument();
  });

  test("Có các input cần thiết", () => {
    render(<ContactAdmin />);
    expect(screen.getByLabelText(/Họ và tên/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Nội dung liên hệ/i)).toBeInTheDocument();
  });

  test("Nhập dữ liệu vào form", () => {
    render(<ContactAdmin />);
    const nameInput = screen.getByLabelText(/Họ và tên/i);
    const emailInput = screen.getByLabelText(/Email/i);
    const messageInput = screen.getByLabelText(/Nội dung liên hệ/i);

    fireEvent.change(nameInput, { target: { value: "Nguyễn Văn A" } });
    fireEvent.change(emailInput, { target: { value: "email@example.com" } });
    fireEvent.change(messageInput, { target: { value: "Tôi cần hỗ trợ về vé xe" } });

    expect(nameInput).toHaveValue("Nguyễn Văn A");
    expect(emailInput).toHaveValue("email@example.com");
    expect(messageInput).toHaveValue("Tôi cần hỗ trợ về vé xe");
  });

  test("Gửi form thành công", () => {
    render(<ContactAdmin />);
    const submitButton = screen.getByRole("button", { name: /Gửi liên hệ/i });

    fireEvent.click(submitButton);
    expect(screen.getByText(/Cảm ơn bạn đã liên hệ/i)).toBeInTheDocument();
  });
});
