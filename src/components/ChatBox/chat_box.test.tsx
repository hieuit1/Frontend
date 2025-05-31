import { render, screen, fireEvent, waitFor, cleanup } from "@testing-library/react";
import ChatBox from "./ChatBox";



describe("ChatBox Component", () => {
  test("Hiển thị tin nhắn mặc định của trợ lý", async () => {
    render(<ChatBox />);
    fireEvent.click(screen.getByTestId("chatbox-icon")); // Mở chatbox
    const assistantMessage = await screen.findByText((content) =>
      content.includes("Xin chào! Tôi có thể giúp gì cho bạn về vé xe?")
    );
    expect(assistantMessage).toBeInTheDocument();
  });

  test("Người dùng có thể nhập và gửi tin nhắn", async () => {
    render(<ChatBox />);
    fireEvent.click(screen.getByTestId("chatbox-icon")); // Mở chatbox

    const inputElement = await screen.findByPlaceholderText("Nhập tin nhắn...");
    const sendButton = screen.getByText("Gửi");

    fireEvent.change(inputElement, { target: { value: "Xin chào!" } });
    fireEvent.click(sendButton);

    await waitFor(() => expect(screen.getByText("Xin chào!")).toBeInTheDocument());
  });

  test("Kiểm tra phản hồi của trợ lý sau khi gửi tin nhắn", async () => {
    render(<ChatBox />);
    fireEvent.click(screen.getByTestId("chatbox-icon")); // Mở chatbox

    const inputElement = await screen.findByPlaceholderText("Nhập tin nhắn...");
    const sendButton = screen.getByText("Gửi");

    fireEvent.change(inputElement, { target: { value: "Thông tin vé xe?" } });
    fireEvent.click(sendButton);

    await waitFor(() => {
      const assistantMessage = screen.getByText((content) =>
        content.includes("Xin lỗi, tôi không hiểu câu hỏi của bạn") ||
        content.includes("Xin lỗi, đã xảy ra lỗi")
      );
      expect(assistantMessage).toBeInTheDocument();
    });
  });

  test("Kiểm tra toggle mở/đóng cửa sổ chat", async () => {
    render(<ChatBox />);
    fireEvent.click(screen.getByTestId("chatbox-icon")); // Mở chatbox
    expect(await screen.findByText("Hỗ trợ khách hàng")).toBeInTheDocument();

    const closeButton = screen.getByText("✖");
    fireEvent.click(closeButton);
    expect(screen.queryByText("Hỗ trợ khách hàng")).not.toBeInTheDocument();
  });
});
