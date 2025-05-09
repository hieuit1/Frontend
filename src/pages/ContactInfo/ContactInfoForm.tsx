import React, { useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/common/footer/Footer";
import "./ContactInfoForm.css";

interface ContactInfo {
  name: string;
  phone: string;
  email: string;
}

interface ContactInfoFormProps {
  onSubmit: (contactInfo: ContactInfo) => void;
}

const ContactInfoForm: React.FC<ContactInfoFormProps> = ({ onSubmit }) => {
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    name: "",
    phone: "",
    email: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    phone: "",
    email: "",
  });

  const validatePhone = (phone: string) => /^[0-9]{10,11}$/.test(phone); // Số điện thoại 10-11 chữ số
  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); // Định dạng email

  const handleSubmit = () => {
    const newErrors = {
      name: contactInfo.name ? "" : "Tên không được để trống.",
      phone: validatePhone(contactInfo.phone)
        ? ""
        : "Số điện thoại không hợp lệ.",
      email: validateEmail(contactInfo.email) ? "" : "Email không hợp lệ.",
    };

    setErrors(newErrors);

    // Kiểm tra nếu không có lỗi thì gửi dữ liệu
    if (!newErrors.name && !newErrors.phone && !newErrors.email) {
      onSubmit(contactInfo);
    }
  };

  return (
    <div className="contact-info-page">
      <Navbar />
      <div className="contact-info-form">
        <h3>Nhập thông tin liên hệ</h3>
        <label>
          Tên người đi *
          <input
            type="text"
            value={contactInfo.name}
            onChange={(e) =>
              setContactInfo({ ...contactInfo, name: e.target.value })
            }
            required
          />
          {errors.name && <p className="error">{errors.name}</p>}
        </label>
        <label>
          Số điện thoại *
          <input
            type="tel"
            value={contactInfo.phone}
            onChange={(e) =>
              setContactInfo({ ...contactInfo, phone: e.target.value })
            }
            required
          />
          {errors.phone && <p className="error">{errors.phone}</p>}
        </label>
        <label>
          Email *
          <input
            type="email"
            value={contactInfo.email}
            onChange={(e) =>
              setContactInfo({ ...contactInfo, email: e.target.value })
            }
            required
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </label>
        <p className="note">
          <small>
            Thông tin liên hệ sẽ được sử dụng để gửi vé và hỗ trợ nếu cần thiết.
          </small>
        </p>
        <button onClick={handleSubmit} className="next-btn">
          Tiếp tục
        </button>
      </div>
      <Footer year={2025} companyName="Ticket Car" />
    </div>
  );
};

export default ContactInfoForm;
