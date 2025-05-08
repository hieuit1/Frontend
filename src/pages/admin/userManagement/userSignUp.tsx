import React from "react";
import { Modal, Form, Input, Button } from "antd";

interface UserSignUpProps {
  visible: boolean;
  onCancel: () => void;
  onRegister: (values: { name: string; email: string }) => void;
}

const UserSignUp: React.FC<UserSignUpProps> = ({ visible, onCancel, onRegister }) => (
  <Modal
    title="Register User"
    visible={visible}
    onCancel={onCancel}
    footer={null}
  >
    <Form onFinish={onRegister}>
      <Form.Item name="name" label="Name" rules={[{ required: true, message: "Please input the name!" }]}>
        <Input />
      </Form.Item>
      <Form.Item name="email" label="Email" rules={[{ required: true, message: "Please input the email!" }]}>
        <Input />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>
    </Form>
  </Modal>
);

export default UserSignUp;