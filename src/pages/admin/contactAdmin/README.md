import React, { useState, useDeferredValue } from "react";

const ContactAdmin: React.FC = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const deferredForm = useDeferredValue(form); // Trì hoãn giá trị nhập vào

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Gửi thành công!");
  };

  return (
    <div
      style={{
        maxWidth: 600,
        margin: "48px auto",
        padding: "48px 32px",
        background: "linear-gradient(135deg, #f8fafc 0%, #e0e7ef 100%)",
        borderRadius: 16,
        boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
      }}
    >
      <h1 style={{ color: "#1976d2" }}>Liên hệ quản trị viên</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Họ và tên"
          value={form.name}
          onChange={handleChange}
          required
          style={{ width: "100%", padding: "10px", marginBottom: 8 }}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          style={{ width: "100%", padding: "10px", marginBottom: 8 }}
        />
        <textarea
          name="message"
          placeholder="Nội dung"
          value={form.message}
          onChange={handleChange}
          required
          rows={4}
          style={{ width: "100%", padding: "10px", marginBottom: 8 }}
        />
        <button type="submit" style={{ padding: "12px 0", width: "100%", background: "#1976d2", color: "#fff", borderRadius: 8 }}>
          Gửi liên hệ
        </button>
      </form>

      {/* Hiển thị giá trị bị trì hoãn */}
      <h3 style={{ marginTop: 20, color: "#333" }}>Nội dung đang nhập:</h3>
      <p>
        <strong>Họ tên:</strong> {deferredForm.name} <br />
        <strong>Email:</strong> {deferredForm.email} <br />
        <strong>Tin nhắn:</strong> {deferredForm.message}
      </p>
    </div>
  );
};

export default ContactAdmin;

