import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments } from "@fortawesome/free-solid-svg-icons";
import "./ChatBox.css";

interface Message {
  role: "user" | "assistant";
  text: string;
}

const ChatBox: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", text: "Xin chào! Tôi có thể giúp gì cho bạn về vé xe?" }
  ]);

  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

const newMessages: Message[] = [
  ...messages,
  { role: "user" as "user", text: input }, // Xác định kiểu cho "user"
];

setMessages(newMessages);


    try {
      const apiKey = process.env.REACT_APP_GEMINI_API_KEY;
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ contents: [{ parts: [{ text: input }] }] }),
        }
      );

      const jsonResponse = await response.json();

      if (!jsonResponse?.candidates?.[0]?.content?.parts?.[0]?.text) {
        throw new Error("Không có phản hồi từ API.");
      }

      const botReply = jsonResponse.candidates[0].content.parts[0].text;
      setMessages((prev) => [...prev, { role: "assistant", text: botReply }]);
    } catch (error) {
      console.error("Lỗi khi gọi Gemini API:", error);
      setMessages((prev) => [...prev, { role: "assistant", text: "Xin lỗi, đã xảy ra lỗi. Vui lòng thử lại sau." }]);
    }

    setInput("");
  };

  return (
    <div>
      <div className="chatbox-icon" data-testid="chatbox-icon" onClick={() => setIsOpen(!isOpen)}>
        <FontAwesomeIcon icon={faComments} />
      </div>

      {isOpen && (
        <div className="chatbox">
          <div className="chatbox-header">
            Hỗ trợ khách hàng
            <button className="chatbox-close" onClick={() => setIsOpen(false)}>✖</button>
          </div>

          <div className="chatbox-messages">
            {messages.map((msg, idx) => (
              <div key={idx} className={`chatbox-message ${msg.role === "assistant" ? "bot-message" : "user-message"}`}>
                {msg.text}
              </div>
            ))}
          </div>

          <div className="chatbox-input">
            <input
              type="text"
              placeholder="Nhập tin nhắn..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            />
            <button onClick={handleSendMessage}>Gửi</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBox;
