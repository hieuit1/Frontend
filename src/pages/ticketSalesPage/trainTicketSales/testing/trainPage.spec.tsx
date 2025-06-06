import { render, screen, fireEvent } from '@testing-library/react';
import {TrainTicketSalesPage} from '../trainPage';
import "@testing-library/jest-dom";

describe('TrainTicketSalesPage Component', () => {
    it('renders without crashing', () => {
        render(<TrainTicketSalesPage/>);
        expect(screen.getByText('🚆 Đặt Vé Tàu Hỏa')).toBeInTheDocument();
    });
    it("co o nhap vao tim kiem", () => {
        render(<TrainTicketSalesPage/>);
        expect(screen.getByLabelText(/Tìm tuyến/i)).toBeInTheDocument();
    });

    it("Nhap tim kiem va kiem tra ket qua", () => {
        render(<TrainTicketSalesPage/>);
        const searchInput = screen.getByLabelText(/Tìm tuyến/i);
        fireEvent.change(searchInput, { target: { value: "Ha Nội" } });
        expect(screen.getByText("Hà Nội → Hải Phòng")).toBeInTheDocument();
        expect(screen.queryByText("Đà Nẵng → Huế")).not.toBeInTheDocument();
    });
    test("Hiển thị danh sách tuyến tàu đúng cách", () => {
    render(<TrainTicketSalesPage />);

    expect(screen.getByText("Hà Nội → Hải Phòng")).toBeInTheDocument();
    expect(screen.getByText("Hồ Chí Minh → Nha Trang")).toBeInTheDocument();
    expect(screen.getByText("Đà Nẵng → Huế")).toBeInTheDocument();
  });
});