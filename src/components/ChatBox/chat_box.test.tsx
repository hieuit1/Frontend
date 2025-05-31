// Frontend/src/components/ChatBox/chat_box.test.ts
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ChatBox from "./ChatBox";

describe("ChatBox Component", () => {
  test("Hiển thị tin nhắn mặc định của trợ lý", () => {
    render(<ChatBox />);
    const assistantMessage = screen.getByText("Xin chào! Tôi có thể giúp gì cho bạn về vé xe?");
    expect(assistantMessage).toBeInTheDocument();
  });

  test("Người dùng có thể nhập và gửi tin nhắn", async () => {
    render(<ChatBox />);
    
    const inputElement = screen.getByPlaceholderText("Nhập tin nhắn...");
    const sendButton = screen.getByText("Gửi");
    
    fireEvent.change(inputElement, { target: { value: "Xin chào!" } });
    fireEvent.click(sendButton);

    await waitFor(() => {
      expect(screen.getByText("Xin chào!")).toBeInTheDocument();
    });
  });

  test("Kiểm tra phản hồi của trợ lý sau khi gửi tin nhắn", async () => {
    render(<ChatBox />);
    
    const inputElement = screen.getByPlaceholderText("Nhập tin nhắn...");
    const sendButton = screen.getByText("Gửi");
    
    fireEvent.change(inputElement, { target: { value: "Thông tin vé xe?" } });
    fireEvent.click(sendButton);

    await waitFor(() => {
      const assistantResponse = screen.getByText(/Xin lỗi, tôi không hiểu câu hỏi của bạn|Xin lỗi, đã xảy ra lỗi/i);
      expect(assistantResponse).toBeInTheDocument();
    });
  });

  test("Kiểm tra toggle mở/đóng cửa sổ chat", () => {
    render(<ChatBox />);
    
    const chatIcon = screen.getByRole("button");
    fireEvent.click(chatIcon);
    
    expect(screen.getByText("Hỗ trợ khách hàng")).toBeInTheDocument();

    const closeButton = screen.getByText("✖");
    fireEvent.click(closeButton);

    expect(screen.queryByText("Hỗ trợ khách hàng")).not.toBeInTheDocument();
  });
});
