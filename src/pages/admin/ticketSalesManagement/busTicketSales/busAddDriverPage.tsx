import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  Upload,
  InputNumber,
  Select,
  message,
  Row,
  Col,
} from "antd";
import { createDriver } from "../../../../api/bus_add_driverApi"; // điều chỉnh path nếu cần

const { Option } = Select;

const BusAddDriver = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState<any[]>([]);
  const [resultMessage, setResultMessage] = useState<string | null>(null);

  const onFinish = async (values: any) => {
    setLoading(true);
    setResultMessage(null); 

    const formData = new FormData();
    formData.append("fullName", values.fullName);
    formData.append("phoneNumber", values.phoneNumber);
    formData.append("yearOfBirth", values.yearOfBirth);
    formData.append("descriptions", values.descriptions);
    formData.append("gender", values.gender);

    if (fileList.length > 0) {
      formData.append("image", fileList[0].originFileObj);
    }

    try {
      await createDriver(formData);
      message.success("Tạo tài xế thành công!");
      setResultMessage("✅ Tạo tài xế thành công!");
      form.resetFields();
      setFileList([]);
    } catch (err: any) {
      console.error(err);
      const msg = err.message || "Tạo tài xế thất bại!";
      message.error(msg);
      setResultMessage(`❌ ${msg}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto bg-white shadow rounded">
      <h2 className="text-2xl font-semibold mb-6">Thêm tài xế mới</h2>

      <Form layout="vertical" form={form} onFinish={onFinish}>
        <Form.Item
          label="Ảnh đại diện"
          name="image"
          rules={[{ required: true, message: "Vui lòng tải ảnh" }]}
        >
          <Upload
            beforeUpload={() => false}
            fileList={fileList}
            onChange={({ fileList }) => setFileList(fileList)}
            maxCount={1}
          >
            <Button>Chọn ảnh</Button>
          </Upload>
        </Form.Item>

        <Form.Item
          label="Họ tên"
          name="fullName"
          rules={[{ required: true, message: "Vui lòng nhập họ tên" }]}
        >
          <Input />
        </Form.Item>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Số điện thoại"
              name="phoneNumber"
              rules={[{ required: true, message: "Vui lòng nhập số điện thoại" }]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item
              label="Năm sinh"
              name="yearOfBirth"
              rules={[{ required: true, message: "Vui lòng nhập năm sinh" }]}
            >
              <InputNumber
                min={1900}
                max={new Date().getFullYear()}
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item
              label="Giới tính"
              name="gender"
              rules={[{ required: true, message: "Vui lòng chọn giới tính" }]}
            >
              <Select placeholder="Giới tính">
                <Option value="Nam">Nam</Option>
                <Option value="Nữ">Nữ</Option>
                <Option value="Khác">Khác</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          label="Mô tả"
          name="descriptions"
          rules={[{ required: true, message: "Vui lòng nhập mô tả" }]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Tạo tài xế
          </Button>
        </Form.Item>
      </Form>

      {resultMessage && (
        <div
          className={`mt-4 text-lg font-semibold text-center ${
            resultMessage.startsWith("✅") ? "text-green-600" : "text-red-500"
          }`}
        >
          {resultMessage}
        </div>
      )}
    </div>
  );
};

export { BusAddDriver };
