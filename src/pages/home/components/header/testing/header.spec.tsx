import React from "react";
import { render, screen,  fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import HomeHeader from "../header";
import "@testing-library/jest-dom";

const renderWithRouter = (ui: React.ReactElement) => {
    return render(<BrowserRouter></BrowserRouter>);
};

describe("HomeHeader Component", () => {

    test("Hiển thị tiêu đề chính xác", () =>{
        renderWithRouter(<HomeHeader/>);
        expect(screen.getByText(/Tìm & Đặt Vé Xe Khách Uy Tín/i)).toBeInTheDocument();
    });

    test("Có các input tìm kiếm", () =>{
        renderWithRouter(<HomeHeader/>);
        expect(screen.getByPlaceholderText("🚏 Nơi xuất phát")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("🎯 Nơi Đến")).toBeInTheDocument();
        expect(screen.getByLabelText("Ngày khởi hành")).toBeInTheDocument();
    });

    test("Nhập dữ liệu vào ô xuất phát và điểm đến", () =>{
        renderWithRouter(<HomeHeader/>);
        const fromInput = screen.getByPlaceholderText("🚏 Nơi xuất phát");
        const toInput = screen.getByPlaceholderText("🎯 Nơi Đến");
        fireEvent.change(fromInput, { target: { value: "Hà Nội" } });
        fireEvent.change(toInput, { target : { value: "Đà Nẵng" } });
        expect(fromInput).toHaveValue("Hà Nội");
        expect(toInput).toHaveValue("Đà Nẵng");
    });
    test("Dropdown gợi ý xuất hiện khi focus vào input", () => {
        renderWithRouter(<HomeHeader/>);
        const fromInput = screen.getByPlaceholderText("🚏 Nơi xuất phát");
        fireEvent.focus(fromInput);
        expect(screen.getByText(/Địa điểm phổ biến/i)).toBeInTheDocument();
    });

    test("Có nút tìm kiếm và hoạt động khi click", () => {
        renderWithRouter(<HomeHeader/>);
        const searchButton = screen.getByRole("button", { name: /Tìm kiếm/i });
        fireEvent.click(searchButton);
        expect(window.location.href).toContain("/busTicket");
    });

    test("Kiểm tra hiệu ứng hover của nút tìm kiếm", () => {
        renderWithRouter(<HomeHeader/>);
        const searchButton = screen.getByRole("button", { name: /Tìm kiếm/i });
        fireEvent.mouseOver(searchButton);
        expect(searchButton).toHaveStyle("background-color: #0056b3"); 
    })
});
