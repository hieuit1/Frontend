//Frontend\src\pages\admin\ticketSalesManagement\busTicketSales\busTicketSalesPage.tsx
import { useState } from "react";
import { Form, Input, InputNumber, DatePicker, TimePicker, Button, Row, Col, Select } from "antd";
import { createTripCar } from "../../../../api/bus_ticket_salesApi";

// const { Option } = Select;

const BusTicketSalesPage: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{
  type: "success" | "error";
  text: string;
} | null>(null);
  const onFinish = async (values: any) => {
  setLoading(true);
  setSubmitMessage(null); 

  const payload = {
    ...values,
    departureDate: values.departureDate.format("YYYY-MM-DD"),
    departureTime: values.departureTime.format("HH:mm:ss"),
    departureEndTime: values.departureEndTime.format("HH:mm:ss"),
  };

  try {
    await createTripCar(payload);
    setSubmitMessage({ type: "success", text: "✅ Tạo chuyến xe thành công!" });
    form.resetFields();
  } catch (err: any) {
    console.error(err);
    setSubmitMessage({ type: "error", text: "❌ Tạo chuyến xe thất bại!" });
  } finally {
    setLoading(false);
  }
};

  return (
    <div>
      <h2>Tạo chuyến xe</h2>
      <Form layout="vertical" form={form} onFinish={onFinish}>
        <Form.Item name="tripName" label="Tên chuyến" rules={[{ required: true, message: "Vui lòng chọn hoặc nhập tên chuyến" }]}>
  <Select
    showSearch
    placeholder="VD: Chuyến Hà Nội - Nha Trang"
    allowClear
    options={[
      { value: "Đà Nẵng - Hà Nội", label: "Đà Nẵng - Hà Nội" },
      { value: "Đà Nẵng - Hồ Chí Minh", label: "Đà Nẵng - Hồ Chí Minh" },
      { value: "Đà Nẵng - Nha Trang", label: "Đà Nẵng - Nha Trang" },
      { value: "Đà Nẵng - Quảng Nam", label: "Đà Nẵng - Quảng Nam" },
      { value: "Đà Nẵng - Huế", label: "Đà Nẵng - Huế" },
    ]}
    filterOption={(input, option) =>
      (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
    }
  />
</Form.Item>
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item name="departureDate" label="Ngày đi" rules={[{ required: true }]}>
  <DatePicker format="DD-MM-YYYY" style={{ width: "100%" }} />
</Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="departureTime" label="Giờ đi" rules={[{ required: true }]}>
              <TimePicker format="HH:mm:ss" style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="departureEndTime" label="Giờ đến" rules={[{ required: true }]}>
              <TimePicker format="HH:mm:ss" style={{ width: "100%" }} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="pickupPoint" label="Điểm đón" rules={[{ required: true }]}>
              <Input placeholder="VD: Bến xe Miền Trung" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="payPonit" label="Điểm trả" rules={[{ required: true }]}>
              <Input placeholder="VD: Bến xe Nha Trang" />
            </Form.Item>
          </Col>
        </Row>
<Row gutter={16}>
  <Col span={8}>
  <Form.Item
    name="seatNumber"
    label="Số ghế"
    rules={[{ required: true, message: "Vui lòng chọn số ghế" }]}
  >
    <Select
      placeholder="Chọn số ghế"
      options={[
        { value: 40, label: "40" },
        { value: 30, label: "30" },
        { value: 32, label: "32" },
        { value: 20, label: "20" },
      ]}
      allowClear
    />
  </Form.Item>
</Col>
          <Col span={8}>
            <Form.Item    
      name="emptySeatNumber"
      label="Ghế trống"
      dependencies={["seatNumber"]} 
      rules={[
        { required: true, message: "Vui lòng nhập số ghế trống" },
        ({ getFieldValue }) => ({
          validator(_, value) {
            const seatNumber = getFieldValue("seatNumber");
            if (value === undefined || value <= seatNumber) {
              return Promise.resolve();
            }
            return Promise.reject(
              new Error("Số ghế trống không được lớn hơn tổng số ghế")
            );
          },
        }),
      ]}
    >
      <InputNumber min={0} style={{ width: "100%" }} />
    </Form.Item>
  </Col>
          <Col span={8}>
  <Form.Item
    name="priceSeatNumber"
    label="Giá ghế"
    rules={[{ required: true, message: "Vui lòng chọn giá ghế" }]}
  >
    <Select
      placeholder="Chọn giá ghế"
      options={[
        { value: 100000, label: "100k" },
        { value: 150000, label: "150k" },
        { value: 200000, label: "200k" },
        { value: 250000, label: "250k" },
        { value: 300000, label: "300k" },
        { value: 350000, label: "350k" },
        { value: 400000, label: "400k" },
        { value: 450000, label: "450k" },
        { value: 500000, label: "500k" },
        { value: 550000, label: "550k" },
        { value: 600000, label: "600k" },
        { value: 650000, label: "650k" },
        { value: 700000, label: "700k" },
        { value: 750000, label: "750k" },
        { value: 800000, label: "800k" },
      ]}
      allowClear
    />
  </Form.Item>
</Col>
        </Row>
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item name="driverId" label="ID Tài xế" rules={[{ required: true }]}>
              <InputNumber min={1} style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="coachId" label="ID Xe khách" rules={[{ required: true }]}>
              <InputNumber min={1} style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="rickshawId" label="ID tài xế phụ" rules={[{ required: true }]}>
              <InputNumber min={1} style={{ width: "100%" }} />
            </Form.Item>
          </Col>
        </Row>
{submitMessage && (
  <div
    style={{
      marginTop: 16,
      padding: "12px",
      borderRadius: 6,
      fontWeight: 500,
      color: submitMessage.type === "success" ? "green" : "red",
      background: submitMessage.type === "success" ? "#f6ffed" : "#fff1f0",
      border: `1px solid ${submitMessage.type === "success" ? "#b7eb8f" : "#ffa39e"}`,
    }}
  >
    {submitMessage.text}
  </div>
)}
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Tạo chuyến xe
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export { BusTicketSalesPage };
