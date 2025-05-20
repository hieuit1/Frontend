import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  DatePicker,
  TimePicker,
  Upload,
  message,
  Row,
  Col,
  Select,
  InputNumber,
  AutoComplete,
} from "antd";


const { Option } = Select;

const AirlineTicketSalesPage: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const onFinish = (values: any) => {
    setLoading(true);
    console.log("Form values:", values);
    // Giả lập gửi dữ liệu lên server
    setTimeout(() => {
      setLoading(false);
      message.success("Đăng bán vé máy bay thành công!");
    }, 1000);
  };

  return (
    <div
      style={{
        width: "100%",
        padding: "24px",
        background: "#fff",
        borderRadius: 8,
        boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
        margin: "0 auto",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: 24 }}>
        Đăng bán vé máy bay
      </h2>
      <Form layout="vertical" onFinish={onFinish}>
        {/* Chuyến bay */}
        <Form.Item
          label="Chuyến bay"
          name="flight"
          rules={[{ required: true, message: "Vui lòng nhập mã chuyến bay" }]}
        >
          <Input placeholder="VD: VN123" />
        </Form.Item>

        {/* Tuyến: Tách thành dropdown "Tỉnh đi" và "Tỉnh đến" nằm cùng hàng */}
        <Row gutter={16}>
          <Col xs={24} sm={12}>
            <Form.Item
              label="Tỉnh đi"
              name="fromProvince"
              rules={[{ required: true, message: "Vui lòng chọn tỉnh đi" }]}
            >
              <Select showSearch placeholder="Chọn tỉnh đi">
                <Option value="ha-noi">Hà Nội</Option>
                <Option value="da-nang">Đà Nẵng</Option>
                <Option value="tp-hcm">TP HCM</Option>
                {/* Thêm các tùy chọn khác nếu cần */}
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              label="Tỉnh đến"
              name="toProvince"
              rules={[{ required: true, message: "Vui lòng chọn tỉnh đến" }]}
            >
              <Select showSearch placeholder="Chọn tỉnh đến">
                <Option value="ha-noi">Hà Nội</Option>
                <Option value="da-nang">Đà Nẵng</Option>
                <Option value="tp-hcm">TP HCM</Option>
                {/* Thêm các tùy chọn khác nếu cần */}
              </Select>
            </Form.Item>
          </Col>
        </Row>

        {/* Hàng: Ngày khởi hành, Sân bay đi, Sân bay đến */}
        <Row gutter={16}>
          <Col xs={24} sm={8}>
            <Form.Item
              label="Ngày khởi hành"
              name="date"
              rules={[
                { required: true, message: "Vui lòng chọn ngày khởi hành" },
              ]}
            >
              <DatePicker style={{ width: "100%" }} format="YYYY-MM-DD" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={8}>
            <Form.Item
              label="Sân bay đi"
              name="departureAirport"
              rules={[
                { required: true, message: "Vui lòng nhập sân bay đi" },
              ]}
            >
              <Input placeholder="VD: Nội Bài" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={8}>
            <Form.Item
              label="Sân bay đến"
              name="arrivalAirport"
              rules={[
                { required: true, message: "Vui lòng nhập sân bay đến" },
              ]}
            >
              <Input placeholder="VD: Tân Sơn Nhất" />
            </Form.Item>
          </Col>
        </Row>

        {/* Hàng: Giờ đi, Giờ đến và Hạng vé */}
        <Row gutter={16}>
          <Col xs={24} sm={8}>
            <Form.Item
              label="Giờ đi"
              name="departureTime"
              rules={[{ required: true, message: "Vui lòng chọn giờ đi" }]}
            >
              <TimePicker style={{ width: "100%" }} format="HH:mm" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={8}>
            <Form.Item
              label="Giờ đến"
              name="arrivalTime"
              rules={[{ required: true, message: "Vui lòng chọn giờ đến" }]}
            >
              <TimePicker style={{ width: "100%" }} format="HH:mm" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={8}>
            <Form.Item
              label="Hạng vé"
              name="ticketClass"
              rules={[{ required: true, message: "Vui lòng chọn hạng vé" }]}
            >
              <Select placeholder="Chọn hạng vé">
                <Option value="normal">Vé thường</Option>
                <Option value="popular">Vé Phổ thông</Option>
                <Option value="vip">Vé VIP</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        {/* Hàng: Số vé, Giá vé (VND) và Link hình ảnh */}
        <Row gutter={16}>
          <Col xs={24} sm={8}>
            <Form.Item
              label="Số vé"
              name="quantity"
              rules={[
                { required: true, message: "Vui lòng nhập số lượng vé" },
                { pattern: /^[0-9]+$/, message: "Số vé phải là số" },
              ]}
            >
              <AutoComplete
                placeholder="Nhập hoặc chọn số lượng vé"
                options={[
                  { value: "20" },
                  { value: "50" },
                  { value: "130" },
                ]}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={8}>
            <Form.Item
              label="Giá vé (VND)"
              name="price"
              rules={[{ required: true, message: "Vui lòng nhập giá vé" }]}
            >
              <InputNumber
                min={0}
                style={{ width: "100%" }}
                placeholder="Giá vé (VND)"
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={8}>
            <Form.Item
              label="Link hình ảnh"
              name="imageUrl"
              // Không bắt buộc nhưng có thể thêm rule nếu cần
            >
              <Input placeholder="Nhập link hình ảnh" />
            </Form.Item>
          </Col>
        </Row>

        {/* Upload hình ảnh */}
        <Form.Item label="Hình ảnh tải lên" name="upload">
          <Upload beforeUpload={() => false} maxCount={1}>
            <Button>Chọn hình ảnh</Button>
          </Upload>
        </Form.Item>

        {/* Ghi chú */}
        <Form.Item label="Ghi chú" name="note">
          <Input placeholder="Ghi chú" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            Đăng bán vé
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export { AirlineTicketSalesPage };
