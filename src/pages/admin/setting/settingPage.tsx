import React, { useState, useEffect } from 'react';
import { Form, Button, Switch, Select, Input, message } from 'antd';

interface UserSettings {
  theme: 'light' | 'dark' | 'auto';
  notifications: boolean;
  language: string;
  currency: 'VND' | 'USD';
  defaultView: 'Widgets' | 'Revenue' | 'UserManagement';
  autoRefresh: 'off' | '30s' | '1m' | '5m';
  emailNotifications: boolean;
  notificationEmail: string;
  fontSize: 'small' | 'medium' | 'large';
}

const SettingPage: React.FC = () => {
  const [form] = Form.useForm();
  const [settings, setSettings] = useState<UserSettings>({
    theme: 'light',
    notifications: true,
    language: 'vi',
    currency: 'VND',
    defaultView: 'Widgets',
    autoRefresh: 'off',
    emailNotifications: false,
    notificationEmail: '',
    fontSize: 'medium',
  });

  // Giả lập lấy dữ liệu cài đặt từ API
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response: UserSettings = {
          theme: 'light',
          notifications: true,
          language: 'vi',
          currency: 'VND',
          defaultView: 'Widgets',
          autoRefresh: 'off',
          emailNotifications: false,
          notificationEmail: '',
          fontSize: 'medium',
        };
        setSettings(response);
        form.setFieldsValue(response);
      } catch (error) {
        message.error('Không thể tải cài đặt');
      }
    };
    fetchSettings();
  }, [form]);

  // Xử lý lưu cài đặt
  const handleSave = async (values: UserSettings) => {
    try {
      if (values.emailNotifications && !values.notificationEmail) {
        message.error('Vui lòng nhập địa chỉ email nhận thông báo');
        return;
      }
      if (values.emailNotifications && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.notificationEmail)) {
        message.error('Địa chỉ email không hợp lệ');
        return;
      }
      setSettings(values);
      message.success('Lưu cài đặt thành công');
    } catch (error) {
      message.error('Lưu cài đặt thất bại');
    }
  };

  return (
    <div className="setting-page">
      <style>{`
        .setting-page {
          padding: 40px 20px;
          max-width: auto;
          margin: 0 auto;
          background: linear-gradient(135deg, #e0e7ff 0%, #e9d5ff 100%);
          min-height: 100vh;
          border-radius: 20px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
        }
        .page-title {
          font-size: 24px;
          font-weight: 700;
          color: #1e3a8a;
          margin-bottom: 30px;
          text-align: center;
          position: relative;
          padding-bottom: 10px;
        }
        .page-title::after {
          content: '';
          width: 60px;
          height: 4px;
          background: linear-gradient(to right, #3b82f6, #a855f7);
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          border-radius: 2px;
        }
        .setting-card {
          background: #ffffffcc;
          border-radius: 12px;
          padding: 20px;
          margin-bottom: 20px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1), inset 0 0 8px rgba(255, 255, 255, 0.5);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .setting-card:hover {
          transform: scale(1.02);
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
        }
        .section-title {
          font-size: 18px;
          font-weight: 600;
          color: #1e40af;
          margin-bottom: 15px;
          padding-left: 10px;
          border-left: 4px solid #3b82f6;
        }
        .ant-form-item {
          margin-bottom: 16px;
        }
        .save-button {
          background: linear-gradient(45deg, #3b82f6, #a855f7);
          border: none;
          border-radius: 8px;
          padding: 10px 20px;
          font-size: 16px;
          font-weight: 500;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .save-button:hover {
          transform: scale(1.05);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }
        /* Theme Select Styling */
        .theme-select .ant-select-selector {
          border: none !important;
          background: linear-gradient(45deg, #1e3a8a, #6b7280) !important;
          border-radius: 12px !important;
          padding: 8px 12px !important;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2), inset 0 0 4px rgba(255, 255, 255, 0.3) !important;
          transition: all 0.3s ease !important;
          color: #ffffff !important;
          font-weight: 500 !important;
        }
        .theme-select .ant-select-selector:hover {
          box-shadow: 0 0 12px rgba(59, 130, 246, 0.7), inset 0 0 6px rgba(255, 255, 255, 0.5) !important;
          transform: translateY(-2px) !important;
        }
        .theme-select .ant-select-arrow {
          color: #ffffff !important;
          transition: transform 0.3s ease !important;
        }
        .theme-select.ant-select-open .ant-select-arrow {
          transform: rotate(180deg) !important;
        }
        .theme-select .ant-select-dropdown {
          background: rgba(255, 255, 255, 0.1) !important;
          backdrop-filter: blur(10px) !important;
          border-radius: 10px !important;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3) !important;
          border: 1px solid rgba(255, 255, 255, 0.2) !important;
          animation: slideDown 0.3s ease !important;
        }
        @keyframes slideDown {
          from { transform: translateY(-10px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .theme-select .ant-select-item-option {
          padding: 10px 16px !important;
          transition: all 0.2s ease !important;
          border-radius: 8px !important;
          margin: 4px 8px !important;
          font-weight: 500 !important;
        }
        .theme-select .ant-select-item-option[data-value="light"] {
          background: linear-gradient(45deg, #f3f4f6, #ffffff) !important;
          color: #1e40af !important;
        }
        .theme-select .ant-select-item-option[data-value="dark"] {
          background: linear-gradient(45deg, #1f2937, #374151) !important;
          color: #ffffff !important;
        }
        .theme-select .ant-select-item-option[data-value="auto"] {
          background: linear-gradient(45deg, #3b82f6, #a855f7) !important;
          color: #ffffff !important;
        }
        .theme-select .ant-select-item-option:hover {
          transform: scale(1.05) !important;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2) !important;
        }
        .theme-select .ant-select-item-option-selected {
          font-weight: 700 !important;
          box-shadow: inset 0 0 4px rgba(255, 255, 255, 0.5) !important;
        }
        /* Default View Select Styling */
        .default-view-select .ant-select-selector {
          border: 2px solid transparent !important;
          background: linear-gradient(45deg, #1f2937, #4b5563) !important;
          border-radius: 10px !important;
          padding: 8px 12px !important;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3), inset 0 0 6px rgba(255, 255, 255, 0.2) !important;
          transition: all 0.3s ease !important;
          color: #ffffff !important;
          font-weight: 600 !important;
          position: relative;
          overflow: hidden;
        }
        .default-view-select .ant-select-selector::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: left 0.5s ease;
        }
        .default-view-select .ant-select-selector:hover::before {
          left: 100%;
        }
        .default-view-select .ant-select-selector:hover {
          border-color: #10b981 !important;
          box-shadow: 0 0 16px rgba(16, 185, 129, 0.8), inset 0 0 8px rgba(255, 255, 255, 0.4) !important;
          transform: translateY(-2px) !important;
        }
        .default-view-select .ant-select-arrow {
          color: #10b981 !important;
          transition: transform 0.3s ease !important;
        }
        .default-view-select.ant-select-open .ant-select-arrow {
          transform: rotate(180deg) !important;
        }
        .default-view-select .ant-select-dropdown {
          background: rgba(17, 24, 39, 0.9) !important;
          backdrop-filter: blur(12px) !important;
          border-radius: 12px !important;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4) !important;
          border: 2px solid linear-gradient(45deg, #10b981, #3b82f6) !important;
          animation: fadeIn 0.3s ease !important;
        }
        @keyframes fadeIn {
          from { transform: translateY(-8px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .default-view-select .ant-select-item-option {
          padding: 12px 16px !important;
          margin: 4px 8px !important;
          border-radius: 6px !important;
          transition: all 0.2s ease !important;
          font-weight: 500 !important;
          position: relative;
          overflow: hidden;
        }
        .default-view-select .ant-select-item-option[data-value="Widgets"] {
          background: linear-gradient(45deg, #3b82f6, #60a5fa) !important;
          color: #ffffff !important;
        }
        .default-view-select .ant-select-item-option[data-value="Revenue"] {
          background: linear-gradient(45deg, #10b981, #34d399) !important;
          color: #ffffff !important;
        }
        .default-view-select .ant-select-item-option[data-value="UserManagement"] {
          background: linear-gradient(45deg, #8b5cf6, #a78bfa) !important;
          color: #ffffff !important;
        }
        .default-view-select .ant-select-item-option:hover {
          transform: scale(1.08) !important;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3) !important;
          z-index: 1 !important;
        }
        .default-view-select .ant-select-item-option-selected {
          font-weight: 700 !important;
          box-shadow: inset 0 0 6px rgba(255, 255, 255, 0.6) !important;
        }
        .default-view-select .ant-select-item-option::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          background: rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          transform: translate(-50%, -50%);
          transition: width 0.3s ease, height 0.3s ease;
        }
        .default-view-select .ant-select-item-option:active::after {
          width: 200px;
          height: 200px;
          transition: width 0.3s ease, height 0.3s ease;
        }
        /* Font Size Select Styling */
        .font-size-select .ant-select-selector {
          border: none !important;
          background: linear-gradient(45deg, #111827, #374151) !important;
          border-radius: 14px !important;
          padding: 8px 14px !important;
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.4), inset 0 0 8px rgba(255, 255, 255, 0.2) !important;
          transition: all 0.3s ease !important;
          color: #ffffff !important;
          font-weight: 600 !important;
          position: relative;
          animation: neonPulse 2s infinite ease-in-out;
        }
        @keyframes neonPulse {
          0%, 100% { box-shadow: 0 0 10px rgba(236, 72, 153, 0.5), inset 0 0 8px rgba(255, 255, 255, 0.2); }
          50% { box-shadow: 0 0 20px rgba(236, 72, 153, 0.8), inset 0 0 12px rgba(255, 255, 255, 0.3); }
        }
        .font-size-select .ant-select-selector:hover {
          transform: translateY(-3px) !important;
          box-shadow: 0 0 24px rgba(236, 72, 153, 0.9), inset 0 0 10px rgba(255, 255, 255, 0.4) !important;
        }
        .font-size-select .ant-select-selector:focus {
          outline: 2px solid #22d3ee !important;
          outline-offset: 2px !important;
        }
        .font-size-select .ant-select-arrow {
          color: #22d3ee !important;
          transition: transform 0.3s ease !important;
        }
        .font-size-select.ant-select-open .ant-select-arrow {
          transform: rotate(180deg) !important;
        }
        .font-size-select .ant-select-dropdown {
          background: linear-gradient(135deg, rgba(236, 72, 153, 0.2), rgba(34, 211, 238, 0.2)) !important;
          backdrop-filter: blur(15px) !important;
          border-radius: 14px !important;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5) !important;
          border: 1px solid rgba(255, 255, 255, 0.3) !important;
          animation: waveIn 0.4s ease !important;
        }
        @keyframes waveIn {
          from { transform: translateY(-12px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .font-size-select .ant-select-item-option {
          padding: 10px 18px !important;
          margin: 6px 10px !important;
          border-radius: 8px !important;
          transition: all 0.3s ease !important;
          font-weight: 500 !important;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2) !important;
        }
        .font-size-select .ant-select-item-option[data-value="small"] {
          background: linear-gradient(45deg, #ec4899, #f472b6) !important;
          color: #ffffff !important;
        }
        .font-size-select .ant-select-item-option[data-value="medium"] {
          background: linear-gradient(45deg, #22d3ee, #67e8f9) !important;
          color: #ffffff !important;
        }
        .font-size-select .ant-select-item-option[data-value="large"] {
          background: linear-gradient(45deg, #facc15, #fde047) !important;
          color: #1f2937 !important;
        }
        .font-size-select .ant-select-item-option:hover {
          transform: scale(1.1) rotate(2deg) !important;
          box-shadow: 0 6px 14px rgba(0, 0, 0, 0.3) !important;
          z-index: 1 !important;
        }
        .font-size-select .ant-select-item-option-selected {
          font-weight: 700 !important;
          box-shadow: inset 0 0 8px rgba(255, 255, 255, 0.7) !important;
          transform: scale(1.05) !important;
        }
        .font-size-select .ant-select-item-option:active {
          animation: bounce 0.2s ease !important;
        }
        @keyframes bounce {
          0% { transform: scale(1); }
          50% { transform: scale(0.9); }
          100% { transform: scale(1); }
        }
        /* Notification Switch Styling */
        .notification-switch .ant-switch {
          background: linear-gradient(45deg, #4b5563, #6b7280) !important;
          border-radius: 20px !important;
          width: 60px !important;
          height: 28px !important;
          border: 2px solid #22d3ee !important;
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease !important;
        }
        .notification-switch .ant-switch::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          background: rgba(34, 211, 238, 0.4);
          border-radius: 50%;
          transform: translate(-50%, -50%);
          transition: width 0.3s ease, height 0.3s ease;
        }
        .notification-switch .ant-switch:hover::before {
          width: 100px;
          height: 100px;
        }
        .notification-switch .ant-switch-handle {
          width: 22px !important;
          height: 22px !important;
          top: 3px !important;
          background: #ffffff !important;
          box-shadow: 0 0 8px rgba(34, 211, 238, 0.8), inset 0 0 4px rgba(34, 211, 238, 0.4) !important;
          transition: transform 0.3s ease, box-shadow 0.3s ease !important;
        }
        .notification-switch .ant-switch-checked {
          background: linear-gradient(45deg, #22d3ee, #06b6d4) !important;
        }
        .notification-switch .ant-switch-checked .ant-switch-handle {
          transform: translateX(30px) !important;
          box-shadow: 0 0 12px rgba(236, 72, 153, 0.9), inset 0 0 6px rgba(236, 72, 153, 0.5) !important;
        }
        .notification-switch .ant-switch:active .ant-switch-handle {
          animation: ripple 0.3s ease !important;
        }
        @keyframes ripple {
          0% { box-shadow: 0 0 8px rgba(34, 211, 238, 0.8); }
          50% { box-shadow: 0 0 16px rgba(34, 211, 238, 1), 0 0 24px rgba(34, 211, 238, 0.6); }
          100% { box-shadow: 0 0 8px rgba(34, 211, 238, 0.8); }
        }
        /* Neon Label Styling for Notifications */
        .notification-switch[data-label="notifications"] .ant-form-item-label > label {
          color: #22d3ee !important;
          font-weight: 600 !important;
          text-shadow: 0 0 5px rgba(34, 211, 238, 0.8), 0 0 10px rgba(34, 211, 238, 0.6) !important;
          position: relative;
          padding-left: 10px !important;
          animation: neonFlickerCyan 3s infinite ease-in-out;
        }
        .notification-switch[data-label="notifications"] .ant-form-item-label > label:hover {
          text-shadow: 0 0 10px rgba(34, 211, 238, 1), 0 0 20px rgba(34, 211, 238, 0.8) !important;
        }
        .notification-switch[data-label="notifications"] .ant-form-item-label > label::before {
          content: '';
          position: absolute;
          left: 0;
          top: 50%;
          width: 4px;
          height: 20px;
          background: #22d3ee;
          transform: translateY(-50%);
          border-radius: 2px;
          box-shadow: 0 0 8px rgba(34, 211, 238, 0.8);
        }
        .notification-switch[data-label="emailNotifications"] .ant-form-item-label > label {
          color: #a855f7 !important;
          font-weight: 600 !important;
          text-shadow: 0 0 5px rgba(168, 85, 247, 0.8), 0 0 10px rgba(168, 85, 247, 0.6) !important;
          position: relative;
          padding-left: 10px !important;
          animation: neonFlickerPurple 3.5s infinite ease-in-out;
        }
        .notification-switch[data-label="emailNotifications"] .ant-form-item-label > label:hover {
          text-shadow: 0 0 10px rgba(168, 85, 247, 1), 0 0 20px rgba(168, 85, 247, 0.8) !important;
        }
        .notification-switch[data-label="emailNotifications"] .ant-form-item-label > label::before {
          content: '';
          position: absolute;
          left: 0;
          top: 50%;
          width: 4px;
          height: 20px;
          background: #a855f7;
          transform: translateY(-50%);
          border-radius: 2px;
          box-shadow: 0 0 8px rgba(168, 85, 247, 0.8);
        }
        /* Neon Label Styling for Email Input */
        .email-input .ant-form-item-label > label {
          color: #ec4899 !important;
          font-weight: 600 !important;
          text-shadow: 0 0 5px rgba(236, 72, 153, 0.8), 0 0 10px rgba(236, 72, 153, 0.6) !important;
          position: relative;
          padding-left: 10px !important;
          animation: neonFlickerPink 3.2s infinite ease-in-out;
        }
        .email-input .ant-form-item-label > label:hover {
          text-shadow: 0 0 10px rgba(236, 72, 153, 1), 0 0 20px rgba(236, 72, 153, 0.8) !important;
        }
        .email-input .ant-form-item-label > label::before {
          content: '';
          position: absolute;
          left: 0;
          top: 50%;
          width: 4px;
          height: 20px;
          background: #ec4899;
          transform: translateY(-50%);
          border-radius: 2px;
          box-shadow: 0 0 8px rgba(236, 72, 153, 0.8);
        }
        .email-input.ant-form-item-has-error .ant-form-item-label > label {
          color: #f87171 !important;
          text-shadow: 0 0 5px rgba(248, 113, 113, 0.8), 0 0 10px rgba(248, 113, 113, 0.6) !important;
          animation: neonFlickerRed 2s infinite ease-in-out;
        }
        .email-input.ant-form-item-has-error .ant-form-item-label > label::before {
          background: #f87171;
          box-shadow: 0 0 8px rgba(248, 113, 113, 0.8);
        }
        @keyframes neonFlickerCyan {
          0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% { text-shadow: 0 0 5px rgba(34, 211, 238, 0.8), 0 0 10px rgba(34, 211, 238, 0.6); }
          20%, 24%, 55% { text-shadow: 0 0 3px rgba(34, 211, 238, 0.5), 0 0 6px rgba(34, 211, 238, 0.4); }
        }
        @keyframes neonFlickerPurple {
          0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% { text-shadow: 0 0 5px rgba(168, 85, 247, 0.8), 0 0 10px rgba(168, 85, 247, 0.6); }
          20%, 24%, 55% { text-shadow: 0 0 3px rgba(168, 85, 247, 0.5), 0 0 6px rgba(168, 85, 247, 0.4); }
        }
        @keyframes neonFlickerPink {
          0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% { text-shadow: 0 0 5px rgba(236, 72, 153, 0.8), 0 0 10px rgba(236, 72, 153, 0.6); }
          20%, 24%, 55% { text-shadow: 0 0 3px rgba(236, 72, 153, 0.5), 0 0 6px rgba(236, 72, 153, 0.4); }
        }
        @keyframes neonFlickerRed {
          0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% { text-shadow: 0 0 5px rgba(248, 113, 113, 0.8), 0 0 10px rgba(248, 113, 113, 0.6); }
          20%, 24%, 55% { text-shadow: 0 0 3px rgba(248, 113, 113, 0.5), 0 0 6px rgba(248, 113, 113, 0.4); }
        }
        /* Email Input Styling */
        .email-input .ant-input {
          background: rgba(255, 255, 255, 0.1) !important;
          border: none !important;
          border-radius: 10px !important;
          padding: 10px 16px !important;
          color: #ffffff !important;
          font-weight: 500 !important;
          box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.2) !important;
          transition: all 0.3s ease !important;
          position: relative;
        }
        .email-input .ant-input::placeholder {
          color: rgba(255, 255, 255, 0.5) !important;
        }
        .email-input .ant-input:focus, .email-input .ant-input:hover {
          box-shadow: 0 0 12px rgba(236, 72, 153, 0.8), inset 0 0 8px rgba(255, 255, 255, 0.3) !important;
          transform: translateY(-2px) !important;
        }
        .email-input .ant-input:not(:placeholder-shown) {
          box-shadow: 0 0 10px rgba(34, 211, 238, 0.7), inset 0 0 6px rgba(255, 255, 255, 0.2) !important;
        }
        .email-input .ant-form-item-explain-error {
          color: #f87171 !important;
          font-weight: 500 !important;
          animation: shake 0.3s ease !important;
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-4px); }
          75% { transform: translateX(4px); }
        }
        .email-input .ant-input.ant-input-status-error {
          box-shadow: 0 0 12px rgba(248, 113, 113, 0.8), inset 0 0 6px rgba(248, 113, 113, 0.4) !important;
        }
      `}</style>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSave}
        initialValues={settings}
      >
        <div className="page-title">Cài Đặt</div>

        {/* Giao diện */}
        <div className="setting-card">
          <div className="section-title">Giao diện</div>
          <Form.Item label="Chủ đề" name="theme">
            <Select className="theme-select">
              <Select.Option value="light" data-value="light">Sáng</Select.Option>
              <Select.Option value="dark" data-value="dark">Tối</Select.Option>
              <Select.Option value="auto" data-value="auto">Tự động (theo giờ hệ thống)</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item label="Màn hình mặc định" name="defaultView">
            <Select className="default-view-select">
              <Select.Option value="Widgets" data-value="Widgets">Tổng quan</Select.Option>
              <Select.Option value="Revenue" data-value="Revenue">Doanh thu</Select.Option>
              <Select.Option value="UserManagement" data-value="UserManagement">Quản lý người dùng</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item label="Kích thước phông chữ" name="fontSize">
            <Select className="font-size-select">
              <Select.Option value="small" data-value="small">Nhỏ</Select.Option>
              <Select.Option value="medium" data-value="medium">Trung bình</Select.Option>
              <Select.Option value="large" data-value="large">Lớn</Select.Option>
            </Select>
          </Form.Item>
        </div>

        {/* Thông báo */}
        <div className="setting-card">
          <div className="section-title">Thông báo</div>
          <Form.Item
            label="Bật thông báo"
            name="notifications"
            valuePropName="checked"
            className="notification-switch"
            extra={<div data-label="notifications" />}
          >
            <Switch />
          </Form.Item>

          <Form.Item
            label="Bật thông báo qua email"
            name="emailNotifications"
            valuePropName="checked"
            className="notification-switch"
            extra={<div data-label="emailNotifications" />}
          >
            <Switch />
          </Form.Item>

          <Form.Item
            label="Email nhận thông báo"
            name="notificationEmail"
            rules={[{ type: 'email', message: 'Email không hợp lệ' }]}
            className="email-input"
          >
            <Input placeholder="Nhập email nhận thông báo" />
          </Form.Item>
        </div>

        {/* Cập nhật dữ liệu */}
        <div className="setting-card">
          <div className="section-title">Cập nhật dữ liệu</div>
          <Form.Item label="Tần suất làm mới tự động" name="autoRefresh">
            <Select>
              <Select.Option value="off">Tắt</Select.Option>
              <Select.Option value="30s">30 giây</Select.Option>
              <Select.Option value="1m">1 phút</Select.Option>
              <Select.Option value="5m">5 phút</Select.Option>
            </Select>
          </Form.Item>
        </div>

        {/* Ngôn ngữ và tiền tệ */}
        <div className="setting-card">
          <div className="section-title">Ngôn ngữ và tiền tệ</div>
          <Form.Item label="Ngôn ngữ" name="language">
            <Select>
              <Select.Option value="vi">Tiếng Việt</Select.Option>
              <Select.Option value="en">English</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item label="Tiền tệ" name="currency">
            <Select>
              <Select.Option value="VND">VND</Select.Option>
              <Select.Option value="USD">USD</Select.Option>
            </Select>
          </Form.Item>
        </div>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="save-button">
            Lưu cài đặt
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SettingPage;