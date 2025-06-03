import { render, screen, fireEvent } from "@testing-library/react";
import AdminAbout from "../about";

describe("AdminAbout Component", () => {
    test("renders admin information correctly", () =>{
        render(<AdminAbout />);
        
        expect(screen.getByText("Giới thiệu về Quản trị viên")).toBeInTheDocument();7    
        expect(screen.getByText(/Lương Quang Hùng/i)).toBeInTheDocument();
        expect(screen.getByText(/Hệ thống bán vé xe khách trực tuyến/i)).toBeInTheDocument(); 
    });
});

test("handle back button click", () =>{
    render(<AdminAbout />);
    const backButton = screen.getByText("/← Quay lại/i");
    expect(backButton).toBeInTheDocument();
    fireEvent.click(backButton);
})