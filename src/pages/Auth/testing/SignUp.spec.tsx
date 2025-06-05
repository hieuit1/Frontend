import {render, screen, fireEvent } from "@testing-library/react";
import { SignUp } from "../SignUp";
import "@testing-library/jest-dom";

describe("SignUp Component", () => {	
    test("hien thi tieu de dang ky", () => {	
        render(<SignUp onAuthSuccess={jest.fn()}/>);
        expect(screen.getByText(/Sign Up/i)).toBeInTheDocument();
    });

    test("Co cac o nhap lieu name, email, password, phone", () => {
        render(<SignUp onAuthSuccess={jest.fn()}/>);
        expect(screen.getByPlaceholderText(/Name/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Phone Number/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
    });

    test("Nhap du lieu vao from", () =>{
        render(<SignUp onAuthSuccess={jest.fn()}/>);
        const nameInput = screen.getByPlaceholderText(/Name/i);
        const phoneInput = screen.getByPlaceholderText(/Phone Number/i);
        const emailInput = screen.getByPlaceholderText(/Email/i);
        const passwordInput = screen.getByPlaceholderText(/Password/i);
        fireEvent.change(nameInput, { target: { value : "Nguyen van A" }});
        fireEvent.change(phoneInput, { target: { value : "0123456789" }});
        fireEvent.change(emailInput, { target: { value: "hung@gmail.com"}});
        fireEvent.change(passwordInput, { target: { value: "12345678" }});
        expect(nameInput).toHaveValue("Nguyen van A");
        expect(phoneInput).toHaveValue("0123456789");
        expect(emailInput).toHaveValue("hung@gmail.com");
        expect(passwordInput).toHaveValue("12345678");
    });

    test("Submit form", () => {
        const mockAuthSuccess = jest.fn();
        render(<SignUp onAuthSuccess={mockAuthSuccess} />);
        fireEvent.click(screen.getByText(/Sign Up/i));
        expect(mockAuthSuccess).toHaveBeenCalledTimes(1);
    });

    test("Xử lý đăng ký bằng Google", () => {
        render(<SignUp onAuthSuccess={jest.fn()} />);
        expect(screen.getByText(/or sign up with Google/i)).toBeInTheDocument();
    });

});