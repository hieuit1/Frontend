import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { ticketRenderHandlers } from "../ticketConditions";


describe("Ticket Render Handlers", () =>{
    test("Kiem tra hien thi trang danh sach ve xe khach", () => {
    const TextComponet = () =>{
        const [showForm, setShowForm] = React.useState(false);
        return <>{ticketRenderHandlers["Bán Vé Xe Khách"](showForm, setShowForm)}</>;
    };
    render(<TextComponet />);
    expect(screen.getByText(/Bán Vé Xe Khách/i)).toBeInTheDocument();
    const addTichketButton = screen.getByRole("button", { name: /Thêm Vé/i });
    fireEvent.click(addTichketButton);
    expect(screen.getByText(/Quay lại danh sách vé/i)).toBeInTheDocument();
    });
    test("kiem tra chuyen doi trang danh sach va form ve xe bus", () =>{
        const TextComponent = () =>{
            const [showForm, setShowForm] = React.useState(false);
            const [showDriverForm, setShowDriverForm] = React.useState(false);
            const [showCoachForm, setShowCoachForm] = React.useState(false);
            return (
                <>
                    {ticketRenderHandlers["Bán Vé Xe Bus"](
                        showForm,
                        setShowForm,
                        showDriverForm,
                        setShowDriverForm,
                        showCoachForm,
                        setShowCoachForm
                    )}
                </>
            );
        };
        render(<TextComponent/>);
        expect(screen.getByText(/Bán Vé Xe Bus/i)).toBeInTheDocument();
        const addTicketButton = screen.getByRole("button", { name: /Thêm Vé/i });
        fireEvent.click(addTicketButton);
        expect(screen.getByRole("button", { name: /Quay lại danh sách vé/i })).toBeInTheDocument();
        expect(screen.getByText(/Bán Vé Xe Bus/i)).toBeInTheDocument();
    });

    test("Kiem tra chuc nang hien thi trang danh sach ve may bay", () => {
        const TextComponet = () =>{
            const [showForm, setShowForm] = React.useState(false);
            return <>{ticketRenderHandlers["Bán Vé Máy Bay"](showForm, setShowForm)}</>
        };
        render(<TextComponet/>);
        expect(screen.getByText(/Bán Vé Máy Bay/i)).toBeInTheDocument();
        const addTicketButton = screen.getByRole("button", { name: /Thêm Vé/i });
        fireEvent.click(addTicketButton);
        expect(screen.getByRole("button", { name: /Quay lại danh sách vé/i })).toBeInTheDocument();
        });
});
