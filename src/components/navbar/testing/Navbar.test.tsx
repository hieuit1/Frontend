import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Navbar from "../Navbar";

describe("Navbar Component", () => {
    
    test("renders Navbar correctly", () => {
        render(
            <BrowserRouter>
            <Navbar/>
            </BrowserRouter>
        );
        expect(screen.getByAltText("Logo")).toBeInTheDocument();
        expect(screen.getByText("Hổ trợ")).toBeInTheDocument();
        expect(screen.getByText("Hợp tác với chúng tôi")).toBeInTheDocument();
        expect(screen.getByText("Chính sách bảo mật")).toBeInTheDocument();
    });

    test("shows user menu when user is logged in", () => {
       render(
        <BrowserRouter>
            <Navbar />
        </BrowserRouter>
       );
       expect(screen.getByText("Đăng Nhập")).toBeInTheDocument();
    });

    test("handles logout correctly", () => {
        localStorage.setItem("user", "Hung");
        render(
            <BrowserRouter>
                <Navbar />
            </BrowserRouter>
        );
        fireEvent.click(screen.getByText("Hung")); 
        fireEvent.click(screen.getByText("Đăng xuất")); 
        expect(screen.getByText("Bạn có chắc chắn muốn đăng xuất không?")).toBeInTheDocument();
        fireEvent.click(screen.getByText("Đồng ý")); 
        expect(localStorage.getItem("user")).toBeNull();
        expect(screen.getByText("Đăng Nhập")).toBeInTheDocument();
  });

});