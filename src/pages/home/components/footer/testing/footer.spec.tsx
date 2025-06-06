import {act, version} from "react";
import { render, screen } from "@testing-library/react";
import Footer from "../footer";

describe("Footer Component", () => {
        /** */
    test("Hiện thị đúng thông tin công ty", async () => {
        await act(async () => {
            render(<Footer year={2025} companyName="Xe Khách Experess" />);
        });
        expect(screen.getByText("Xe Khách Express")).toBeInTheDocument();
        expect(screen.getByText("© 2025 - Đặt vé xe khách nhanh chóng & tiện lợi.")).toBeInTheDocument();
    });
        /** */
    test("Hiển thị các liên kết điều hướng", async () => {
        await act(async () => {
            render(<Footer year={2025} companyName="Xe Khách Experess" />);
        });
        expect(screen.getByText("Chính sách bảo mật")).toBeInTheDocument();
        expect(screen.getByText("Điều khoản sử dụng")).toBeInTheDocument();
        expect(screen.getByText("Câu hỏi thường gặp")).toBeInTheDocument();
    });
    /** */
    test("Hiển thị đúng phiên bản React", async () => {
    await act(async () => {
      render(<Footer year={2025} companyName="Xe Khách Express" />);
    });
    expect(screen.getByText(`React Version: ${version}`)).toBeInTheDocument();
  });

});