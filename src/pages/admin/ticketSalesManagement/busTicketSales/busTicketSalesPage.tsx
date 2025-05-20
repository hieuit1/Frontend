import React, { useState } from "react";
import {
  Form,
  Input,
  InputNumber,
  DatePicker,
  TimePicker,
  Select,
  Button,
  message,
  Row,
  Col,
} from "antd";
import dayjs from "dayjs";

const { Option } = Select;

const BusTicketSalesPage = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: any) => {
    setLoading(true);

    const payload = {
      ...values,
      departureDate: values.departureDate.format("YYYY-MM-DD"),
      departureTime: values.departureTime.format("HH:mm:ss"),
      departureEndTime: values.departureEndTime.format("HH:mm:ss"),
    };

    try {
      const res = await fetch("http://localhost:8080/api-tripcar/create-tripcar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Gửi dữ liệu thất bại");

      message.success("Tạo chuyến xe thành công!");
      form.resetFields();
    } catch (err) {
      console.error(err);
      message.error("Tạo chuyến xe thất bại!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-3xl mx-auto bg-white shadow rounded">
      <h2 className="text-2xl font-semibold mb-6">Tạo chuyến xe</h2>
      <Form layout="vertical" form={form} onFinish={onFinish}>
        <Form.Item name="tripName" label="Tên chuyến" rules={[{ required: true }]}>
          <Input placeholder="VD: Chuyến Hà Nội - Nha Trang" />
        </Form.Item>

        <Row gutter={16}>
          <Col span={8}>
            <Form.Item name="departureDate" label="Ngày đi" rules={[{ required: true }]}>
              <DatePicker style={{ width: "100%" }} />
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
            <Form.Item name="seatNumber" label="Số ghế" rules={[{ required: true }]}>
              <InputNumber min={1} style={{ width: "100%" }} />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item name="emptySeatNumber" label="Ghế trống" rules={[{ required: true }]}>
              <InputNumber min={0} style={{ width: "100%" }} />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item name="priceSeatNumber" label="Giá ghế" rules={[{ required: true }]}>
              <InputNumber min={1000} style={{ width: "100%" }} />
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
            <Form.Item name="rickshawId" label="ID Xe trung chuyển" rules={[{ required: true }]}>
              <InputNumber min={1} style={{ width: "100%" }} />
            </Form.Item>
          </Col>
        </Row>

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
