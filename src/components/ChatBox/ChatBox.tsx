import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments } from "@fortawesome/free-solid-svg-icons";
import {sendMessageToGemini} from "../../api/indexApi";
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
    if (!input./* Phương thức `trim()` trong JavaScript được sử dụng để xóa các ký tự khoảng trắng khỏi cả
hai đầu của một chuỗi. Các ký tự khoảng trắng bao gồm khoảng trắng, tab và dòng mới. Phương thức này
không sửa đổi chuỗi gốc, nhưng trả về một chuỗi mới với khoảng trắng đầu và
cuối đã được xóa. Phương thức này thường được sử dụng để khử trùng đầu vào của người dùng bằng cách xóa
bất kỳ khoảng trắng không cần thiết nào trước hoặc sau nội dung thực tế của chuỗi.*/
    trim()) return;

    const newMessages: Message[] = [...messages, { role: "user", text: input }];
    setMessages(newMessages);

    const botReply = await sendMessageToGemini(input);
    setMessages((prev) => [...prev, { role: "assistant", text: botReply }]);

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
