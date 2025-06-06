import React, { useEffect } from "react";
import { ReportHandler , getFID } from "web-vitals";
import { createScanner, ScriptTarget, LanguageVariant } from "typescript";
import {styles_CSS} from "./styles/about.css";


const AdminAbout: React.FC = () => {
  const styles = styles_CSS;

  useEffect(() => {
    const handleFID: ReportHandler = (metric) => {
      console.log("First Input Delay (FID):", metric.value, "ms");
    };
    getFID(handleFID);
    const sourceCode = "const x = 42;\nconsole.log(x);";
    const scanner = createScanner(ScriptTarget.Latest, false, LanguageVariant.Standard, sourceCode);
    scanner.setText(sourceCode);
    scanner.scan();
    console.log("End Of Line State:", scanner.getToken());
  }, []);

  const handleBack = () => {
    window.history.back();
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <img
          src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
          alt="Admin Avatar"
          style={styles.avatar}
        />
        <div>
          <h1 style={styles.title}>Giới thiệu về Quản trị viên</h1>
          <span style={styles.subtitle}>Hệ thống bán vé xe khách trực tuyến</span>
        </div>
      </div>
      <hr style={styles.divider} />
      <div style={styles.content}>
        <p>
          <strong>Tên:</strong> Lương Quang Hùng<br />
          <strong>Vai trò:</strong> Quản trị viên hệ thống bán vé xe khách trực tuyến
        </p>
        <p>
          Hệ thống bán vé xe giúp khách hàng dễ dàng đặt vé, tra cứu thông tin chuyến đi và thanh toán trực tuyến một cách nhanh chóng, an toàn.<br />
          <span style={styles.highlight}>
            Chúng tôi cam kết mang lại trải nghiệm tốt nhất cho khách hàng với sự hỗ trợ tận tình từ đội ngũ quản trị viên.
          </span>
        </p>
        <h3 style={styles.highlight}>Thông tin liên hệ</h3>
        <ul style={{ lineHeight: 2, listStyle: "circle inside" }}>
          <li><strong>Email:</strong> admin@vexekhach.vn</li>
          <li><strong>Điện thoại:</strong> 0123 456 789</li>
          <li><strong>Địa chỉ:</strong> 123 Đường Lớn, Quận 1, TP. Hồ Chí Minh</li>
        </ul>
        <p>
          Nếu bạn có bất kỳ thắc mắc hoặc cần hỗ trợ, vui lòng liên hệ với chúng tôi qua các thông tin trên.
        </p>
      </div>
      <button
        onClick={handleBack}
        style={styles.button}
        onMouseOver={e => (e.currentTarget.style.background = "#125ea2")}
        onMouseOut={e => (e.currentTarget.style.background = "#1976d2")}
      >
        ← Quay lại
      </button>
    </div>
  );
};




export default AdminAbout;


